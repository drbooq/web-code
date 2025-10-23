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
// src/pages/Booking.jsx - ENHANCED VERSION WITH CONFIRMATION MODAL
// src/pages/Booking.jsx - COMPLETE WORKING VERSION

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { Video, MapPin, Clock, X, CheckCircle, AlertCircle } from "lucide-react";

// export default function Booking() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [doctor, setDoctor] = useState(null);
//   const [isOnlineDoctor, setIsOnlineDoctor] = useState(false);
//   const [bookedSlots, setBookedSlots] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const docRes = await fetch(`http://localhost:5000/api/doctors/all`);
//         const doctors = await docRes.json();
//         const found = doctors.find((d) => String(d._id) === String(id));

//         if (found) {
//           setDoctor(found);
//           setIsOnlineDoctor(found.onlineConsultation);
//         }

//         const bookingsRes = await fetch(`http://localhost:5000/api/bookings/doctor/${id}`);
//         if (bookingsRes.ok) {
//           const bookings = await bookingsRes.json();
//           const bookedTimes = bookings
//             .filter(b => b.status === "confirmed" || b.status === "pending")
//             .map(b => ({ date: b.date, time: b.time }));
//           setBookedSlots(bookedTimes);
//         }
//       } catch (err) {
//         console.error("Failed to load data:", err);
//       }
//     }

//     fetchData();
//   }, [id]);

//   if (!doctor) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
//         <div className="bg-white shadow-2xl rounded-2xl p-8 text-center max-w-md">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <p className="text-xl text-gray-700 mb-6">Doctor not found</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return isOnlineDoctor ? (
//     <OnlineBooking doctor={doctor} user={user} navigate={navigate} id={id} bookedSlots={bookedSlots} />
//   ) : (
//     <OfflineBooking doctor={doctor} user={user} navigate={navigate} id={id} bookedSlots={bookedSlots} />
//   );
// }

// function ConfirmationModal({ isOpen, onClose, onConfirm, bookingType, amount, details }) {
//   const [agreedToTerms, setAgreedToTerms] = useState(false);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-slideUp">
//         <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-t-2xl relative">
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-white/80 hover:text-white transition"
//           >
//             <X className="w-6 h-6" />
//           </button>
//           <h3 className="text-2xl font-bold text-white flex items-center gap-2">
//             <AlertCircle className="w-7 h-7" />
//             Important Notice
//           </h3>
//         </div>

//         <div className="p-6 space-y-6">
//           <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
//             <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//               <CheckCircle className="w-5 h-5 text-blue-600" />
//               Booking Summary
//             </h4>
//             <div className="space-y-2 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Patient:</span>
//                 <span className="font-semibold text-gray-800">{details.name}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Date:</span>
//                 <span className="font-semibold text-gray-800">{new Date(details.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Time:</span>
//                 <span className="font-semibold text-gray-800">{details.time}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Type:</span>
//                 <span className="font-semibold text-gray-800 capitalize">{bookingType}</span>
//               </div>
//               <div className="flex justify-between border-t pt-2 mt-2">
//                 <span className="text-gray-600">Amount to Pay:</span>
//                 <span className="font-bold text-blue-600 text-lg">₹{amount}</span>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <h4 className="font-bold text-gray-800 text-lg">📋 Key Points to Remember</h4>
            
//             {bookingType === "offline" ? (
//               <div className="space-y-3 text-sm text-gray-700">
//                 <div className="flex gap-3 p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
//                   <div className="font-semibold min-w-[24px]">1.</div>
//                   <div>
//                     <strong className="text-amber-900">Booking Request:</strong> This is a slot request. The doctor will review and confirm via WhatsApp within 20 minutes.
//                   </div>
//                 </div>
                
//                 <div className="flex gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
//                   <div className="font-semibold min-w-[24px]">2.</div>
//                   <div>
//                     <strong className="text-green-900">Payment:</strong> ₹9 booking fee now. Full consultation fee (₹{details.fullFee || '300'}) to be paid at the clinic.
//                   </div>
//                 </div>
                
//                 <div className="flex gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
//                   <div className="font-semibold min-w-[24px]">3.</div>
//                   <div>
//                     <strong className="text-blue-900">Refund Policy:</strong> If the doctor is unavailable, your ₹9 will be refunded within 5-7 business days.
//                   </div>
//                 </div>
                
//                 <div className="flex gap-3 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
//                   <div className="font-semibold min-w-[24px]">4.</div>
//                   <div>
//                     <strong className="text-purple-900">Arrival Time:</strong> Please arrive 10-15 minutes early for registration and paperwork.
//                   </div>
//                 </div>
                
//                 <div className="flex gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
//                   <div className="font-semibold min-w-[24px]">5.</div>
//                   <div>
//                     <strong className="text-red-900">Auto-Cancellation:</strong> If not confirmed within 30 minutes, booking will be auto-cancelled with refund.
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-3 text-sm text-gray-700">
//                 <div className="flex gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
//                   <div className="font-semibold min-w-[24px]">1.</div>
//                   <div>
//                     <strong className="text-green-900">Full Payment:</strong> Pay ₹{amount} consultation fee. No hidden charges.
//                   </div>
//                 </div>
                
//                 <div className="flex gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
//                   <div className="font-semibold min-w-[24px]">2.</div>
//                   <div>
//                     <strong className="text-blue-900">Join Options:</strong> Video call link will be sent via WhatsApp. You can also join from your DrBooq dashboard.
//                   </div>
//                 </div>
                
//                 <div className="flex gap-3 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
//                   <div className="font-semibold min-w-[24px]">3.</div>
//                   <div>
//                     <strong className="text-purple-900">Be Ready:</strong> Join 5 minutes early. Ensure stable internet connection and quiet environment.
//                   </div>
//                 </div>
                
//                 <div className="flex gap-3 p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
//                   <div className="font-semibold min-w-[24px]">4.</div>
//                   <div>
//                     <strong className="text-amber-900">Refund:</strong> Full refund if doctor is unavailable (processed within 5-7 days).
//                   </div>
//                 </div>
                
//                 <div className="flex gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
//                   <div className="font-semibold min-w-[24px]">5.</div>
//                   <div>
//                     <strong className="text-red-900">No-Show:</strong> No refund if you miss the appointment without prior notice.
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
//             <label className="flex items-start gap-3 cursor-pointer group">
//               <input
//                 type="checkbox"
//                 checked={agreedToTerms}
//                 onChange={(e) => setAgreedToTerms(e.target.checked)}
//                 className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
//               />
//               <span className="text-sm text-gray-700 group-hover:text-gray-900 transition">
//                 I have read and agree to the above terms and conditions. I understand the payment structure and cancellation policy.
//               </span>
//             </label>
//           </div>
//         </div>

//         <div className="p-6 bg-gray-50 rounded-b-2xl flex gap-3">
//           <button
//             onClick={onClose}
//             className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-100 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             disabled={!agreedToTerms}
//             className={`flex-1 px-6 py-3 rounded-xl font-semibold transition ${
//               agreedToTerms
//                 ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg"
//                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
//             }`}
//           >
//             Proceed to Pay ₹{amount}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function OfflineBooking({ doctor, user, navigate, id, bookedSlots }) {
//   const [form, setForm] = useState({
//     name: "",
//     whatsapp: "",
//     notes: "",
//     date: "",
//     time: "",
//   });

//   const [activeDay, setActiveDay] = useState(0);
//   const [slots, setSlots] = useState([]);
//   const [availabilityNote, setAvailabilityNote] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const timeStringToDate = (time) => {
//     if (!time) return null;
//     const m = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
//     if (!m) return null;

//     let hh = parseInt(m[1], 10);
//     let mm = parseInt(m[2], 10);
//     const period = m[3] ? m[3].toUpperCase() : null;

//     if (period === "PM" && hh < 12) hh += 12;
//     if (period === "AM" && hh === 12) hh = 0;

//     return new Date(2024, 0, 1, hh, mm, 0);
//   };

//   const generateSlots = (timeSlots, selectedDate) => {
//     const allSlots = [];
//     const now = new Date();
//     const isToday = selectedDate === now.toISOString().split("T")[0];
    
//     timeSlots.forEach(({ start, end }) => {
//       const startDate = timeStringToDate(start);
//       const endDate = timeStringToDate(end);
//       if (!startDate || !endDate) return;

//       if (endDate <= startDate) {
//         endDate.setDate(endDate.getDate() + 1);
//       }

//       let current = new Date(startDate);
//       while (current < endDate) {
//         const slotTime = current.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//         });

//         if (isToday) {
//           const slotHour = current.getHours();
//           const slotMinute = current.getMinutes();
//           const nowHour = now.getHours();
//           const nowMinute = now.getMinutes();
          
//           const slotTotalMinutes = slotHour * 60 + slotMinute;
//           const nowTotalMinutes = nowHour * 60 + nowMinute + 10;
          
//           if (slotTotalMinutes > nowTotalMinutes) {
//             allSlots.push(slotTime);
//           }
//         } else {
//           allSlots.push(slotTime);
//         }

//         current = new Date(current.getTime() + 30 * 60000);
//       }
//     });

//     return allSlots;
//   };

//   const isSlotBooked = (date, time) => {
//     return bookedSlots.some(slot => slot.date === date && slot.time === time);
//   };

//   useEffect(() => {
//     if (!doctor) {
//       setSlots([]);
//       setAvailabilityNote("");
//       return;
//     }

//     const dateObj = new Date();
//     dateObj.setDate(dateObj.getDate() + activeDay);

//     const formattedDate = dateObj.toISOString().split("T")[0];
//     const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });

//     setForm((f) => ({ ...f, date: formattedDate, time: "" }));

//     const dayAvailability = (doctor.availability || []).find(
//       (d) => d.day === dayName
//     );

//     if (!dayAvailability || !dayAvailability.available) {
//       setSlots([]);
//       setAvailabilityNote(`${doctor.fullName} is not available on ${dayName}.`);
//       return;
//     }

//     if (!dayAvailability.timeSlots || dayAvailability.timeSlots.length === 0) {
//       setSlots([]);
//       setAvailabilityNote(`No time slots available for ${dayName}.`);
//       return;
//     }

//     const generated = generateSlots(dayAvailability.timeSlots, formattedDate);
//     if (generated.length === 0) {
//       setSlots([]);
//       setAvailabilityNote(`No available slots for ${dayName}.`);
//     } else {
//       setSlots(generated);
//       setAvailabilityNote("");
//     }
//   }, [activeDay, doctor]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleRequestClick = () => {
//     if (!form.name || !form.whatsapp || !form.date || !form.time) {
//       alert("⚠️ Please fill all required fields");
//       return;
//     }
//     if (!user) {
//       alert("⚠️ Please sign up or log in to continue booking.");
//       navigate("/patient-signup");
//       return;
//     }
//     setShowModal(true);
//   };

//   const handleConfirmPayment = async () => {
//     setShowModal(false);
    
//     try {
//       const res = await fetch("http://localhost:5000/api/payment/create-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: doctor.fee }),
//       });
//       const data = await res.json();
//       if (!data.success) throw new Error("Payment failed");

//       const options = {
//         key: data.key,
//         amount: data.amount,
//         currency: data.currency,
//         name: "DrBooq",
//         description: "Online Consultation",
//         order_id: data.orderId,
//         handler: async function (response) {
//           try {
//             const verifyRes = await fetch("http://localhost:5000/api/payment/verify", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 ...response,
//                 patientId: user?._id,
//                 doctorId: id,
//                 name: form.name,
//                 whatsapp: form.whatsapp,
//                 date: form.date,
//                 time: form.time,
//                 notes: form.notes,
//                 bookingType: "online",
//                 amountPaid: doctor.fee,
//               }),
//             });
//             const verifyData = await verifyRes.json();

//             if (verifyData.success) {
//               alert("✅ Payment successful! Your online consultation is booked.");
//               navigate("/");
//             } else {
//               alert("❌ Payment verification failed.");
//             }
//           } catch (err) {
//             console.error("Verification error:", err);
//             alert("❌ Something went wrong during payment verification.");
//           }
//         },
//         prefill: {
//           name: form.name,
//           contact: form.whatsapp,
//         },
//         theme: { color: "#0071BC" },
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.on("payment.failed", function () {
//         alert("❌ Payment failed. Please try again.");
//       });
//       razorpay.open();
//     } catch (err) {
//       console.error(err);
//       alert("Payment initialization failed");
//     }
//   };

//   const getDayLabel = (offset) => {
//     const dateObj = new Date();
//     dateObj.setDate(dateObj.getDate() + offset);
//     if (offset === 0) return "Today";
//     if (offset === 1) return "Tomorrow";
//     return dateObj.toLocaleDateString("en-US", { weekday: "short" });
//   };

//   const getDateLabel = (offset) => {
//     const dateObj = new Date();
//     dateObj.setDate(dateObj.getDate() + offset);
//     return dateObj.toLocaleDateString("en-US", { day: "numeric", month: "short" });
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-6 px-4">
//         <div className="max-w-2xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
//             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
//                   <Video className="w-8 h-8 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl md:text-3xl font-bold text-white">Video Consultation</h1>
//                   <p className="text-indigo-100 text-sm md:text-base">Online appointment</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-green-50 border-l-4 border-green-400 p-4 m-6 rounded-lg">
//               <div className="flex gap-3">
//                 <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//                 <p className="text-sm text-green-800">
//                   <strong>Instant Booking:</strong> Join video call on this website or via WhatsApp link.
//                 </p>
//               </div>
//             </div>

//             <div className="p-6 space-y-5">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Patient Name *</label>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Enter full name"
//                   value={form.name}
//                   onChange={handleChange}
//                   className="w-full border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 px-4 py-3 rounded-xl transition outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number *</label>
//                 <div className="flex items-center border-2 border-gray-200 rounded-xl focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100 transition">
//                   <span className="px-4 py-3 bg-gray-50 border-r-2 border-gray-200 text-gray-700 font-semibold rounded-l-xl">
//                     +91
//                   </span>
//                   <input
//                     type="tel"
//                     name="whatsapp"
//                     placeholder="Enter 10-digit number"
//                     value={form.whatsapp.replace("+91", "")}
//                     onChange={(e) => {
//                       const val = e.target.value.replace(/\D/g, "").slice(0, 10);
//                       setForm({ ...form, whatsapp: "+91" + val });
//                     }}
//                     className="flex-1 px-4 py-3 rounded-r-xl outline-none"
//                   />
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
//                   <CheckCircle className="w-3 h-3" />
//                   Video call link will be sent to this number
//                 </p>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Symptoms / Notes (Optional)</label>
//                 <textarea
//                   name="notes"
//                   placeholder="Describe your symptoms or concerns..."
//                   value={form.notes}
//                   onChange={handleChange}
//                   className="w-full border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 px-4 py-3 rounded-xl transition outline-none resize-none"
//                   rows="3"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
//             <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//               <Clock className="w-5 h-5 text-indigo-600" />
//               Select Date & Time
//             </h3>
            
//             <div className="grid grid-cols-3 gap-3 mb-6">
//               {[0, 1, 2].map((offset) => (
//                 <button
//                   key={offset}
//                   onClick={() => setActiveDay(offset)}
//                   className={`p-4 rounded-xl border-2 transition-all ${
//                     activeDay === offset
//                       ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-indigo-600 shadow-lg scale-105"
//                       : "bg-white text-gray-700 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
//                   }`}
//                 >
//                   <p className="font-bold text-lg">{getDayLabel(offset)}</p>
//                   <p className="text-sm opacity-90">{getDateLabel(offset)}</p>
//                 </button>
//               ))}
//             </div>

//             {slots.length > 0 ? (
//               <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
//                 {slots.map((slot, i) => {
//                   const isBooked = isSlotBooked(form.date, slot);
//                   const isSelected = form.time === slot;
                  
//                   return (
//                     <button
//                       key={i}
//                       onClick={() => !isBooked && setForm({ ...form, time: slot })}
//                       disabled={isBooked}
//                       className={`py-3 px-2 rounded-xl font-semibold text-sm transition-all ${
//                         isBooked
//                           ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50 blur-[0.5px]"
//                           : isSelected
//                           ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
//                           : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-2 border-transparent hover:border-indigo-300"
//                       }`}
//                     >
//                       {slot}
//                       {isBooked && <span className="block text-[10px] mt-1">Booked</span>}
//                     </button>
//                   );
//                 })}
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
//                 <p className="text-gray-500 font-medium">No available slots</p>
//                 {availabilityNote && (
//                   <p className="text-sm text-gray-400 mt-2">{availabilityNote}</p>
//                 )}
//               </div>
//             )}
//           </div>

//           <div className="space-y-3">
//             <button
//               onClick={handleRequestClick}
//               className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
//             >
//               Book Video Call (₹{doctor.fee})
//             </button>
//             <button
//               onClick={() => navigate(-1)}
//               className="w-full border-2 border-gray-300 py-4 rounded-xl text-gray-600 hover:bg-gray-50 font-semibold transition-all"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>

//       <ConfirmationModal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         onConfirm={handleConfirmPayment}
//         bookingType="online"
//         amount={doctor.fee}
//         details={form}
//       />
//     </>
//   );
// } < endDate) {
//         const slotTime = current.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//         });

//         if (isToday) {
//           const slotHour = current.getHours();
//           const slotMinute = current.getMinutes();
//           const nowHour = now.getHours();
//           const nowMinute = now.getMinutes();
          
//           const slotTotalMinutes = slotHour * 60 + slotMinute;
//           const nowTotalMinutes = nowHour * 60 + nowMinute + 10;
          
//           if (slotTotalMinutes > nowTotalMinutes) {
//             allSlots.push(slotTime);
//           }
//         } else {
//           allSlots.push(slotTime);
//         }

//         current = new Date(current.getTime() + 30 * 60000);
//       }
//     });

//     return allSlots;
//   };

//   const isSlotBooked = (date, time) => {
//     return bookedSlots.some(slot => slot.date === date && slot.time === time);
//   };

//   useEffect(() => {
//     if (!doctor) {
//       setSlots([]);
//       setAvailabilityNote("");
//       return;
//     }

//     const dateObj = new Date();
//     dateObj.setDate(dateObj.getDate() + activeDay);

//     const formattedDate = dateObj.toISOString().split("T")[0];
//     const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });

//     setForm((f) => ({ ...f, date: formattedDate, time: "" }));

//     const dayAvailability = (doctor.availability || []).find(
//       (d) => d.day === dayName
//     );

//     if (!dayAvailability || !dayAvailability.available) {
//       setSlots([]);
//       setAvailabilityNote(`${doctor.fullName} is not available on ${dayName}.`);
//       return;
//     }

//     if (!dayAvailability.timeSlots || dayAvailability.timeSlots.length === 0) {
//       setSlots([]);
//       setAvailabilityNote(`No time slots available for ${dayName}.`);
//       return;
//     }

//     const generated = generateSlots(dayAvailability.timeSlots, formattedDate);
//     if (generated.length === 0) {
//       setSlots([]);
//       setAvailabilityNote(`No available slots for ${dayName}.`);
//     } else {
//       setSlots(generated);
//       setAvailabilityNote("");
//     }
//   }, [activeDay, doctor]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleRequestClick = () => {
//     if (!form.name || !form.whatsapp || !form.date || !form.time) {
//       alert("⚠️ Please fill all required fields");
//       return;
//     }
//     if (!user) {
//       alert("⚠️ Please log in to continue booking.");
//       navigate("/patient-signup");
//       return;
//     }
//     setShowModal(true);
//   };

//   const handleConfirmPayment = async () => {
//     setShowModal(false);
    
//     try {
//       const res = await fetch("http://localhost:5000/api/payment/create-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: 9 }),
//       });
//       const data = await res.json();
//       if (!data.success) throw new Error("Payment failed");

//       const options = {
//         key: data.key,
//         amount: data.amount,
//         currency: data.currency,
//         name: "DrBooq",
//         description: "Offline Appointment Booking Fee",
//         order_id: data.orderId,
//         handler: async function (response) {
//           try {
//             const verifyRes = await fetch("http://localhost:5000/api/payment/verify", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 ...response,
//                 patientId: user?._id,
//                 doctorId: id,
//                 name: form.name,
//                 whatsapp: form.whatsapp,
//                 date: form.date,
//                 time: form.time,
//                 notes: form.notes,
//                 bookingType: "offline",
//                 amountPaid: 9,
//               }),
//             });
//             const verifyData = await verifyRes.json();

//             if (verifyData.success) {
//               alert("✅ Payment successful! Your appointment request has been sent.");
//               navigate("/");
//             } else {
//               alert("❌ Payment verification failed.");
//             }
//           } catch (err) {
//             console.error("Verification error:", err);
//             alert("❌ Something went wrong during payment verification.");
//           }
//         },
//         prefill: {
//           name: form.name,
//           contact: form.whatsapp,
//         },
//         theme: { color: "#0071BC" },
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.on("payment.failed", function () {
//         alert("❌ Payment failed. Please try again.");
//       });
//       razorpay.open();
//     } catch (err) {
//       console.error(err);
//       alert("Payment initialization failed");
//     }
//   };

//   const getDayLabel = (offset) => {
//     const dateObj = new Date();
//     dateObj.setDate(dateObj.getDate() + offset);
//     if (offset === 0) return "Today";
//     if (offset === 1) return "Tomorrow";
//     return dateObj.toLocaleDateString("en-US", { weekday: "short" });
//   };

//   const getDateLabel = (offset) => {
//     const dateObj = new Date();
//     dateObj.setDate(dateObj.getDate() + offset);
//     return dateObj.toLocaleDateString("en-US", { day: "numeric", month: "short" });
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-6 px-4">
//         <div className="max-w-2xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
//                   <MapPin className="w-8 h-8 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl md:text-3xl font-bold text-white">Clinic Visit</h1>
//                   <p className="text-blue-100 text-sm md:text-base">In-person consultation</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-amber-50 border-l-4 border-amber-400 p-4 m-6 rounded-lg">
//               <div className="flex gap-3">
//                 <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
//                 <p className="text-sm text-amber-800">
//                   <strong>Booking Request:</strong> Doctor will confirm your slot via WhatsApp within 20 minutes.
//                 </p>
//               </div>
//             </div>

//             <div className="p-6 space-y-5">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Patient Name *</label>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Enter full name"
//                   value={form.name}
//                   onChange={handleChange}
//                   className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 px-4 py-3 rounded-xl transition outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number *</label>
//                 <div className="flex items-center border-2 border-gray-200 rounded-xl focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition">
//                   <span className="px-4 py-3 bg-gray-50 border-r-2 border-gray-200 text-gray-700 font-semibold rounded-l-xl">
//                     +91
//                   </span>
//                   <input
//                     type="tel"
//                     name="whatsapp"
//                     placeholder="Enter 10-digit number"
//                     value={form.whatsapp.replace("+91", "")}
//                     onChange={(e) => {
//                       const val = e.target.value.replace(/\D/g, "").slice(0, 10);
//                       setForm({ ...form, whatsapp: "+91" + val });
//                     }}
//                     className="flex-1 px-4 py-3 rounded-r-xl outline-none"
//                   />
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
//                   <CheckCircle className="w-3 h-3" />
//                   Confirmation will be sent to this number
//                 </p>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Notes (Optional)</label>
//                 <textarea
//                   name="notes"
//                   placeholder="Any specific concerns or requirements..."
//                   value={form.notes}
//                   onChange={handleChange}
//                   className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 px-4 py-3 rounded-xl transition outline-none resize-none"
//                   rows="3"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
//             <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//               <Clock className="w-5 h-5 text-blue-600" />
//               Select Date & Time
//             </h3>
            
//             <div className="grid grid-cols-3 gap-3 mb-6">
//               {[0, 1, 2].map((offset) => (
//                 <button
//                   key={offset}
//                   onClick={() => setActiveDay(offset)}
//                   className={`p-4 rounded-xl border-2 transition-all ${
//                     activeDay === offset
//                       ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-blue-600 shadow-lg scale-105"
//                       : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
//                   }`}
//                 >
//                   <p className="font-bold text-lg">{getDayLabel(offset)}</p>
//                   <p className="text-sm opacity-90">{getDateLabel(offset)}</p>
//                 </button>
//               ))}
//             </div>

//             {slots.length > 0 ? (
//               <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
//                 {slots.map((slot, i) => {
//                   const isBooked = isSlotBooked(form.date, slot);
//                   const isSelected = form.time === slot;
                  
//                   return (
//                     <button
//                       key={i}
//                       onClick={() => !isBooked && setForm({ ...form, time: slot })}
//                       disabled={isBooked}
//                       className={`py-3 px-2 rounded-xl font-semibold text-sm transition-all ${
//                         isBooked
//                           ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50 blur-[0.5px]"
//                           : isSelected
//                           ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
//                           : "bg-blue-50 text-blue-700 hover:bg-blue-100 border-2 border-transparent hover:border-blue-300"
//                       }`}
//                     >
//                       {slot}
//                       {isBooked && <span className="block text-[10px] mt-1">Booked</span>}
//                     </button>
//                   );
//                 })}
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
//                 <p className="text-gray-500 font-medium">No available slots</p>
//                 {availabilityNote && (
//                   <p className="text-sm text-gray-400 mt-2">{availabilityNote}</p>
//                 )}
//               </div>
//             )}
//           </div>

//           <div className="space-y-3">
//             <button
//               onClick={handleRequestClick}
//               className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
//             >
//               Request Appointment
//             </button>
//             <button
//               onClick={() => navigate(-1)}
//               className="w-full border-2 border-gray-300 py-4 rounded-xl text-gray-600 hover:bg-gray-50 font-semibold transition-all"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>

//       <ConfirmationModal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         onConfirm={handleConfirmPayment}
//         bookingType="offline"
//         amount={9}
//         details={{ ...form, fullFee: doctor.fee }}
//       />
//     </>
//   );
// }

// function OnlineBooking({ doctor, user, navigate, id, bookedSlots }) {
//   const [form, setForm] = useState({
//     name: "",
//     whatsapp: "",
//     notes: "",
//     date: "",
//     time: "",
//   });

//   const [activeDay, setActiveDay] = useState(0);
//   const [slots, setSlots] = useState([]);
//   const [availabilityNote, setAvailabilityNote] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const timeStringToDate = (time) => {
//     if (!time) return null;
//     const m = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
//     if (!m) return null;

//     let hh = parseInt(m[1], 10);
//     let mm = parseInt(m[2], 10);
//     const period = m[3] ? m[3].toUpperCase() : null;

//     if (period === "PM" && hh < 12) hh += 12;
//     if (period === "AM" && hh === 12) hh = 0;

//     return new Date(2024, 0, 1, hh, mm, 0);
//   };

//   const generateSlots = (timeSlots, selectedDate) => {
//     const allSlots = [];
//     const now = new Date();
//     const isToday = selectedDate === now.toISOString().split("T")[0];
    
//     timeSlots.forEach(({ start, end }) => {
//       const startDate = timeStringToDate(start);
//       const endDate = timeStringToDate(end);
//       if (!startDate || !endDate) return;

//       if (endDate <= startDate) {
//         endDate.setDate(endDate.getDate() + 1);
//       }

//       let current = new Date(startDate);
//       while (current