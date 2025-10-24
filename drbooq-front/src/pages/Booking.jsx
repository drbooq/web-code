  // src/pages/Booking.jsx - COMPLETE FIXED VERSION

  import React, { useState, useEffect } from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import { useAuth } from "../context/AuthContext";
  import { Video, MapPin } from "lucide-react";

  export default function Booking() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [doctor, setDoctor] = useState(null);
    const [isOnlineDoctor, setIsOnlineDoctor] = useState(false);

  useEffect(() => {
    async function fetchDoctor() {
      try {
        const res = await fetch(`http://localhost:5000/api/doctors/all`);
        const doctors = await res.json();

        // Find the doctor by _id (backend field)
        const found = doctors.find((d) => String(d._id) === String(id));

        if (found) {
          setDoctor(found);
          setIsOnlineDoctor(found.onlineConsultation);
        } else {
          setDoctor(null);
        }
      } catch (err) {
        console.error("Failed to load doctor:", err);
        setDoctor(null);
      }
    }

    fetchDoctor();
  }, [id]);


    if (!doctor) {
      return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6 mt-8 text-center">
          <p className="text-gray-500">Doctor not found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 bg-[#0071BC] text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      );
    }

    return isOnlineDoctor ? (
      <OnlineBooking doctor={doctor} user={user} navigate={navigate} id={id} />
    ) : (
      <OfflineBooking doctor={doctor} user={user} navigate={navigate} id={id} />
    );
  }

  /* ============================================
    OFFLINE BOOKING COMPONENT
    ============================================ */
  function OfflineBooking({ doctor, user, navigate, id }) {
    const [form, setForm] = useState({
      name: "",
      whatsapp: "",
      notes: "",
      date: "",
      time: "",
    });

    const [activeDay, setActiveDay] = useState(0);
    const [slots, setSlots] = useState([]);
    const [availabilityNote, setAvailabilityNote] = useState("");

    const timeStringToDate = (time) => {
      if (!time) return null;
      const m = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
      if (!m) return null;

      let hh = parseInt(m[1], 10);
      let mm = parseInt(m[2], 10);
      const period = m[3] ? m[3].toUpperCase() : null;

      if (period === "PM" && hh < 12) hh += 12;
      if (period === "AM" && hh === 12) hh = 0;

      return new Date(2024, 0, 1, hh, mm, 0);
    };

    const generateSlots = (timeSlots) => {
      const allSlots = [];
      
      timeSlots.forEach(({ start, end }) => {
        const startDate = timeStringToDate(start);
        const endDate = timeStringToDate(end);
        if (!startDate || !endDate) return;

        if (endDate <= startDate) {
          endDate.setDate(endDate.getDate() + 1);
        }

        let current = new Date(startDate);
        while (current < endDate) {
          allSlots.push(
            current.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          );
          current = new Date(current.getTime() + 30 * 60000);
        }
      });

      return allSlots;
    };

    useEffect(() => {
      if (!doctor) {
        setSlots([]);
        setAvailabilityNote("");
        return;
      }

      const dateObj = new Date();
      dateObj.setDate(dateObj.getDate() + activeDay);

      const formattedDate = dateObj.toISOString().split("T")[0];
      const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });

      setForm((f) => ({ ...f, date: formattedDate, time: "" }));

      const dayAvailability = (doctor.availability || []).find(
        (d) => d.day === dayName
      );

      if (!dayAvailability || !dayAvailability.available) {
        setSlots([]);
        setAvailabilityNote(`${doctor.fullName} is not available on ${dayName}.`);
        return;
      }

      if (!dayAvailability.timeSlots || dayAvailability.timeSlots.length === 0) {
        setSlots([]);
        setAvailabilityNote(`No time slots available for ${dayName}.`);
        return;
      }

      const generated = generateSlots(dayAvailability.timeSlots);
      if (generated.length === 0) {
        setSlots([]);
        setAvailabilityNote(`No slots could be generated for ${dayName}.`);
      } else {
        setSlots(generated);
        setAvailabilityNote("");
      }
    }, [activeDay, doctor]);

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  const handleSubmit = async () => {
    if (!form.name || !form.whatsapp || !form.date || !form.time) {
      alert("⚠️ Please fill all required fields");
      return;
    }
    if (!user) {
      alert("⚠️ Please log in to continue booking.");
      navigate("/patient-signup");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 9 }), // offline booking fee
      });
      const data = await res.json();
      if (!data.success) throw new Error("Payment failed");

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "DrBooq",
        description: "Offline Appointment Booking Fee",
        order_id: data.orderId,
  handler: async function (response) {
    try {
      const verifyRes = await fetch("http://localhost:5000/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...response,
          patientId: user?._id,
          doctorId: id,
          name: form.name,
          whatsapp: form.whatsapp,
          date: form.date,
          time: form.time,
          notes: form.notes,
          bookingType: "offline",
          amountPaid: 9,
        }),
      });
      const verifyData = await verifyRes.json();

      if (verifyData.success) {
        alert("✅ Payment successful! Your appointment request has been sent.");
        navigate("/");
      } else {
        alert("❌ Payment verification failed.");
      }
    } catch (err) {
      console.error("Verification error:", err);
      alert("❌ Something went wrong during payment verification.");
    }
  },


        prefill: {
          name: form.name,
          contact: form.whatsapp,
        },
        theme: { color: "#0071BC" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function () {
        alert("❌ Payment failed. Please try again.");
      });
      razorpay.open();
    } catch (err) {
      console.error(err);
      alert("Payment initialization failed");
    }
  };



    const getDayLabel = (offset) => {
      const dateObj = new Date();
      dateObj.setDate(dateObj.getDate() + offset);
      if (offset === 0) return "Today";
      if (offset === 1) return "Tomorrow";
      return dateObj.toLocaleDateString("en-US", { weekday: "long" });
    };

    const getDateLabel = (offset) => {
      const dateObj = new Date();
      dateObj.setDate(dateObj.getDate() + offset);
      return dateObj.toLocaleDateString("en-US", { day: "numeric", month: "short" });
    };

    return (
  <div className="max-w-lg mx-3 sm:mx-auto bg-white shadow-md rounded-xl p-4 sm:p-6 mt-4 sm:mt-8">
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="p-2 sm:p-3 bg-blue-50 rounded-lg">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#0071BC]" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-[#003057]">
              <span className="hidden sm:inline">Book Offline Appointment</span>
              <span className="sm:hidden">Clinic Appointment</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              <span className="hidden sm:inline">Visit clinic in person</span>
              <span className="sm:hidden">In-person visit</span>
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 bg-blue-50 p-2 sm:p-3 rounded-lg">
          <span className="hidden sm:inline">
            This is a <b>booking request</b>. The doctor will review and confirm your slot on WhatsApp.
          </span>
          <span className="sm:hidden">
            <b>Request only.</b> Doctor confirms via WhatsApp.
          </span>
        </p>

        {/* Form */}
        <div className="space-y-3 sm:space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Patient Name *"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-[#0071BC] px-3 py-2 rounded text-sm"
          />

   <div className="flex items-center border border-gray-300 rounded text-sm focus-within:ring-2 focus-within:ring-[#0071BC]">
  <span className="px-3 py-2 bg-gray-100 border-r border-gray-300 text-gray-700 font-medium select-none">
    +91
  </span>
  <input
    type="tel"
    name="whatsapp"
    placeholder="Enter 10-digit number"
    value={form.whatsapp.replace("+91", "")}
    onChange={(e) => {
      const val = e.target.value.replace(/\D/g, "").slice(0, 10); // allow only 10 digits
      setForm({ ...form, whatsapp: "+91" + val });
    }}
    className="flex-1 px-3 py-2 rounded-r outline-none"
  />
</div>
<p className="text-xs text-gray-500 mt-1">
  📱 Enter your WhatsApp number — confirmation will be sent there.
</p>


          <textarea
            name="notes"
            placeholder="Any notes (optional)"
            value={form.notes}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-[#0071BC] px-3 py-2 rounded text-sm"
            rows="2"
          />
        </div>

        {/* Day Selector */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 mb-3 sm:mb-4">
          {[0, 1, 2].map((offset) => {
            const label = getDayLabel(offset);
            const dateLabel = getDateLabel(offset);

            return (
              <div
                key={offset}
                onClick={() => setActiveDay(offset)}
                className={`cursor-pointer rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-center border transition w-24 sm:w-28 ${
                  activeDay === offset
                    ? "bg-[#0071BC] text-white border-[#0071BC] shadow-md"
                    : "bg-gray-50 text-gray-700 hover:bg-[#F0F8FF]"
                }`}
              >
                <p className="font-semibold text-sm sm:text-base">{label}</p>
                <p className="text-xs">{dateLabel}</p>
              </div>
            );
          })}
        </div>

        {/* Slots */}
        <div className="mt-3 sm:mt-4">
          {slots.length ? (
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {slots.map((slot, i) => (
                <button
                  key={i}
                  onClick={() => setForm({ ...form, time: slot })}
                  className={`py-2 px-2 rounded-lg border text-xs sm:text-sm font-medium transition ${
                    form.time === slot
                      ? "bg-[#0071BC] text-white border-[#0071BC] shadow-sm"
                      : "bg-gray-50 text-gray-700 hover:bg-[#F0F8FF]"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <>
              <p className="text-gray-500 text-sm text-center mt-4">
                ❌ No slots available for {getDayLabel(activeDay)}.
              </p>
              {availabilityNote && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  {availabilityNote}
                </p>
              )}
            </>
          )}
        </div>

        {/* ✅ FIXED: Important Notes for OFFLINE */}
        <div className="bg-[#F7FBFD] border border-[#0071BC]/20 rounded-lg p-3 sm:p-4 mt-4 sm:mt-6 text-xs sm:text-sm text-gray-700">
          <p className="font-semibold text-[#003057] mb-1.5 sm:mb-1">
            <span className="hidden sm:inline">Important:</span>
            <span className="sm:hidden">📋 Note:</span>
          </p>
          
          {/* Desktop - Full Text */}
          <ul className="hidden sm:block list-disc list-inside space-y-1">
            <li>The time you choose is a <b>requested time</b> — final slot will be confirmed by the doctor.</li>
            <li>A small booking fee (<b>₹9</b>) is paid online to hold your request.</li>
            <li>The full consultation fee is paid <b>offline at the clinic</b>.</li>
            <li>If the doctor cannot accommodate, your booking fee will be <b>refunded</b>.</li>
            <li>You will receive a <b>WhatsApp confirmation</b> once the doctor responds.</li>
            <li>Please <b>arrive 10–15 minutes early</b> at the clinic once your booking is confirmed.</li>
          </ul>

          {/* Mobile - Short Text */}
          <ul className="sm:hidden list-disc list-inside space-y-1">
            <li>Requested time — doctor confirms slot</li>
            <li>Pay <b>₹9</b> booking fee online</li>
            <li>Full fee paid at clinic</li>
            <li>Refund if doctor rejects</li>
            <li>Track status + WhatsApp notify</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
          <button
            onClick={handleSubmit}
            className="w-full bg-[#0071BC] hover:bg-[#005a94] text-white py-2.5 rounded-lg font-semibold shadow text-sm sm:text-base"
          >
            <span className="hidden sm:inline">Request Appointment (Pay ₹9)</span>
            <span className="sm:hidden">Request (₹9)</span>
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full border border-gray-300 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 text-sm sm:text-base"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  /* ============================================
    ONLINE BOOKING COMPONENT
    ============================================ */
  function OnlineBooking({ doctor, user, navigate, id }) {
    const [form, setForm] = useState({
      name: "",
      whatsapp: "",
      notes: "",
      date: "",
      time: "",
    });

    const [activeDay, setActiveDay] = useState(0);
    const [slots, setSlots] = useState([]);
    const [availabilityNote, setAvailabilityNote] = useState("");

    const timeStringToDate = (time) => {
      if (!time) return null;
      const m = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
      if (!m) return null;

      let hh = parseInt(m[1], 10);
      let mm = parseInt(m[2], 10);
      const period = m[3] ? m[3].toUpperCase() : null;

      if (period === "PM" && hh < 12) hh += 12;
      if (period === "AM" && hh === 12) hh = 0;

      return new Date(2024, 0, 1, hh, mm, 0);
    };

    const generateSlots = (timeSlots) => {
      const allSlots = [];
      
      timeSlots.forEach(({ start, end }) => {
        const startDate = timeStringToDate(start);
        const endDate = timeStringToDate(end);
        if (!startDate || !endDate) return;

        if (endDate <= startDate) {
          endDate.setDate(endDate.getDate() + 1);
        }

        let current = new Date(startDate);
        while (current < endDate) {
          allSlots.push(
            current.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          );
          current = new Date(current.getTime() + 30 * 60000);
        }
      });

      return allSlots;
    };

    useEffect(() => {
      if (!doctor) {
        setSlots([]);
        setAvailabilityNote("");
        return;
      }

      const dateObj = new Date();
      dateObj.setDate(dateObj.getDate() + activeDay);

      const formattedDate = dateObj.toISOString().split("T")[0];
      const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });

      setForm((f) => ({ ...f, date: formattedDate, time: "" }));

      const dayAvailability = (doctor.availability || []).find(
        (d) => d.day === dayName
      );

      if (!dayAvailability || !dayAvailability.available) {
        setSlots([]);
        setAvailabilityNote(`${doctor.fullName} is not available on ${dayName}.`);
        return;
      }

      if (!dayAvailability.timeSlots || dayAvailability.timeSlots.length === 0) {
        setSlots([]);
        setAvailabilityNote(`No time slots available for ${dayName}.`);
        return;
      }

      const generated = generateSlots(dayAvailability.timeSlots);
      if (generated.length === 0) {
        setSlots([]);
        setAvailabilityNote(`No slots could be generated for ${dayName}.`);
      } else {
        setSlots(generated);
        setAvailabilityNote("");
      }
    }, [activeDay, doctor]);

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

  const handleSubmit = async () => {
    if (!form.name || !form.whatsapp || !form.date || !form.time) {
      alert("⚠️ Please fill all required fields");
      return;
    }
    if (!user) {
      alert("⚠️ Please sign up or log in to continue booking.");
      navigate("/patient-signup");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: doctor.fee }), // online full fee
      });
      const data = await res.json();
      if (!data.success) throw new Error("Payment failed");

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "DrBooq",
        description: "Online Consultation",
        order_id: data.orderId,
  handler: async function (response) {
    try {
      const verifyRes = await fetch("http://localhost:5000/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...response,
          patientId: user?._id,
          doctorId: id,
          name: form.name,
          whatsapp: form.whatsapp,
          date: form.date,
          time: form.time,
          notes: form.notes,
          bookingType: "online",
          amountPaid: doctor.fee,
        }),
      });
      const verifyData = await verifyRes.json();

      if (verifyData.success) {
        alert("✅ Payment successful! Your online consultation is booked.");
        navigate("/");
      } else {
        alert("❌ Payment verification failed.");
      }
    } catch (err) {
      console.error("Verification error:", err);
      alert("❌ Something went wrong during payment verification.");
    }
  },

        prefill: {
          name: form.name,
          contact: form.whatsapp,
        },
        theme: { color: "#0071BC" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function () {
        alert("❌ Payment failed. Please try again.");
      });
      razorpay.open();
    } catch (err) {
      console.error(err);
      alert("Payment initialization failed");
    }
  };


    const getDayLabel = (offset) => {
      const dateObj = new Date();
      dateObj.setDate(dateObj.getDate() + offset);
      if (offset === 0) return "Today";
      if (offset === 1) return "Tomorrow";
      return dateObj.toLocaleDateString("en-US", { weekday: "long" });
    };

    const getDateLabel = (offset) => {
      const dateObj = new Date();
      dateObj.setDate(dateObj.getDate() + offset);
      return dateObj.toLocaleDateString("en-US", { day: "numeric", month: "short" });
    };

    return (
  <div className="max-w-lg mx-3 sm:mx-auto bg-white shadow-md rounded-xl p-4 sm:p-6 mt-4 sm:mt-8">
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="p-2 sm:p-3 bg-blue-50 rounded-lg">
            <Video className="w-5 h-5 sm:w-6 sm:h-6 text-[#0071BC]" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-[#003057]">
              <span className="hidden sm:inline">Book Online Consultation</span>
              <span className="sm:hidden">Video Consultation</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              <span className="hidden sm:inline">Video call with doctor</span>
              <span className="sm:hidden">Online video call</span>
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 bg-blue-50 p-2 sm:p-3 rounded-lg">
          <span className="hidden sm:inline">
            This is a <b>video consultation request</b>. Join the call on this website or via WhatsApp link.
          </span>
          <span className="sm:hidden">
            <b>Video call.</b> Join on site or WhatsApp.
          </span>
        </p>

        {/* Form */}
        <div className="space-y-3 sm:space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Patient Name *"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-[#0071BC] px-3 py-2 rounded text-sm"
          />

          {/* <div>
            <input
              type="tel"
              name="whatsapp"
              placeholder="WhatsApp Number *"
              value={form.whatsapp}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-[#0071BC] px-3 py-2 rounded text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              <span className="hidden sm:inline">📱 Enter your <b>WhatsApp number</b>. You'll receive notifications via WhatsApp.</span>
              <span className="sm:hidden">📱 Notifications via WhatsApp</span>
            </p>
          </div> */}
<div className="flex items-center border border-gray-300 rounded text-sm focus-within:ring-2 focus-within:ring-[#0071BC]">
  <span className="px-3 py-2 bg-gray-100 border-r border-gray-300 text-gray-700 font-medium select-none">
    +91
  </span>
  <input
    type="tel"
    name="whatsapp"
    placeholder="Enter 10-digit number"
    value={form.whatsapp.replace("+91", "")}
    onChange={(e) => {
      const val = e.target.value.replace(/\D/g, "").slice(0, 10); // allow only 10 digits
      setForm({ ...form, whatsapp: "+91" + val });
    }}
    className="flex-1 px-3 py-2 rounded-r outline-none"
  />
</div>
<p className="text-xs text-gray-500 mt-1">
  📱 Enter your WhatsApp number — confirmation will be sent there.
</p>

          <textarea
            name="notes"
            placeholder="Describe your symptoms (optional)"
            value={form.notes}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-[#0071BC] px-3 py-2 rounded text-sm"
            rows="2"
          />
        </div>

        {/* Day Selector */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 mb-3 sm:mb-4">
          {[0, 1, 2].map((offset) => {
            const label = getDayLabel(offset);
            const dateLabel = getDateLabel(offset);

            return (
              <div
                key={offset}
                onClick={() => setActiveDay(offset)}
                className={`cursor-pointer rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-center border transition w-24 sm:w-28 ${
                  activeDay === offset
                    ? "bg-[#0071BC] text-white border-[#0071BC] shadow-md"
                    : "bg-gray-50 text-gray-700 hover:bg-[#F0F8FF]"
                }`}
              >
                <p className="font-semibold text-sm sm:text-base">{label}</p>
                <p className="text-xs">{dateLabel}</p>
              </div>
            );
          })}
        </div>

        {/* Slots */}
        <div className="mt-3 sm:mt-4">
          {slots.length ? (
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {slots.map((slot, i) => (
                <button
                  key={i}
                  onClick={() => setForm({ ...form, time: slot })}
                  className={`py-2 px-2 rounded-lg border text-xs sm:text-sm font-medium transition ${
                    form.time === slot
                      ? "bg-[#0071BC] text-white border-[#0071BC] shadow-sm"
                      : "bg-gray-50 text-gray-700 hover:bg-[#F0F8FF]"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <>
              <p className="text-gray-500 text-sm text-center mt-4">
                ❌ No slots available for {getDayLabel(activeDay)}.
              </p>
              {availabilityNote && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  {availabilityNote}
                </p>
              )}
            </>
          )}
        </div>

        {/* Important Notes */}
        <div className="bg-[#F7FBFD] border border-[#0071BC]/20 rounded-lg p-3 sm:p-4 mt-4 sm:mt-6 text-xs sm:text-sm text-gray-700">
          <p className="font-semibold text-[#003057] mb-1.5 sm:mb-1">
            <span className="hidden sm:inline">✅ How Online Consultation Works:</span>
            <span className="sm:hidden">✅ How it works:</span>
          </p>
          
          {/* Desktop - Full Text */}
          <ul className="hidden sm:block list-disc list-inside space-y-1">
            <li>Pay only the <b>consultation fee (₹{doctor.fee})</b> — no hidden charges.</li>
            <li>Join video call on <b>this website or via WhatsApp link</b>.</li>
            <li>Make sure you have a <b>stable internet connection</b> during the call.</li>
            <li>If the doctor is unavailable, you'll receive a <b>full refund</b>.</li>
            <li>Please be ready <b>5 minutes before</b> your scheduled time.</li>
          </ul>

          {/* Mobile - Short Text */}
          <ul className="sm:hidden list-disc list-inside space-y-1">
            <li>Pay <b>₹{doctor.fee}</b> — no hidden fees</li>
            <li>Join on site or WhatsApp</li>
            <li>Doctor unavailable = full refund</li>
            <li>Be ready 5 min early</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
          <button
            onClick={handleSubmit}
            className="w-full bg-[#0071BC] hover:bg-[#005a94] text-white py-2.5 rounded-lg font-semibold shadow text-sm sm:text-base"
          >
            <span className="hidden sm:inline">Book Video Consultation (Pay ₹{doctor.fee})</span>
            <span className="sm:hidden">Book (₹{doctor.fee})</span>
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full border border-gray-300 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 text-sm sm:text-base"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  } 