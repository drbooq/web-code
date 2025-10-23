import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import indiaData from "../data/indiaStatesDistricts.json";

export default function SearchBar() {
  const navigate = useNavigate();

  const [stateVal, setStateVal] = useState(localStorage.getItem("drbooq_location_state") || "");
  const [district, setDistrict] = useState(localStorage.getItem("drbooq_location_district") || "");
  const [detectError, setDetectError] = useState("");

  const states = useMemo(
    () => (indiaData.states ? indiaData.states.map((item) => item.state) : []),
    []
  );

  const districts = useMemo(() => {
    const selected = indiaData.states?.find((s) => s.state === stateVal);
    return selected ? selected.districts : [];
  }, [stateVal]);

  useEffect(() => {
    if (district && !districts.includes(district)) {
      setDistrict("");
      localStorage.removeItem("drbooq_location_district");
    }
  }, [district, districts]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!stateVal || !district) {
      setDetectError("Please choose both state and district before searching.");
      return;
    }
    const params = new URLSearchParams();
    params.set("state", stateVal);
    params.set("district", district);
    navigate(`/offline-doctors?${params.toString()}`);
  }

  return (
    <div
      className="
        bg-white shadow-lg rounded-xl 
        p-3 sm:p-8 
        max-w-3xl mx-auto 
        border border-[#E5E9EB]
      "
    >
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
          {/* State Dropdown */}
          <div>
            <label
              className="
                block text-[0.8rem] sm:text-sm 
                font-semibold text-[#003057] mb-1.5
              "
            >
              Your State
            </label>
            <select
              value={stateVal}
              onChange={(e) => {
                const v = e.target.value;
                setStateVal(v);
                v
                  ? localStorage.setItem("drbooq_location_state", v)
                  : localStorage.removeItem("drbooq_location_state");
                setDistrict("");
                localStorage.removeItem("drbooq_location_district");
              }}
              className="
                w-full px-3 sm:px-4 py-2 sm:py-3 
                border border-[#245a75] rounded-lg 
                text-[0.85rem] sm:text-base
                focus:ring-2 focus:ring-[#0071BC] focus:border-[#0071BC]
              "
            >
              <option value="">-- Select Your State --</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* District Dropdown */}
          <div>
            <label
              className="
                block text-[0.8rem] sm:text-sm 
                font-semibold text-[#003057] mb-1.5
              "
            >
              Your District
            </label>
            <select
              value={district}
              onChange={(e) => {
                const v = e.target.value;
                setDistrict(v);
                v
                  ? localStorage.setItem("drbooq_location_district", v)
                  : localStorage.removeItem("drbooq_location_district");
              }}
              disabled={!stateVal}
              className={`
                w-full px-3 sm:px-4 py-2 sm:py-3 
                border rounded-lg 
                text-[0.85rem] sm:text-base
                ${
                  !stateVal
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300"
                    : "border-[#E5E9EB]"
                }
              `}
            >
              <option value="">
                {stateVal ? "-- Select Your District --" : "Choose a state first"}
              </option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div>
          <button
            type="submit"
            disabled={!stateVal || !district}
            className="
              w-full py-2 sm:py-3 
              bg-[#0071BC] text-white 
              font-semibold rounded-lg shadow-md 
              hover:bg-[#005a94] transition 
              flex items-center justify-center gap-2 
              text-[0.9rem] sm:text-lg 
              disabled:opacity-60
            "
          >
            <Search size={18} className="sm:size-22" />
            Search Nearby Doctors
          </button>
        </div>

        {detectError && (
          <div className="text-xs text-red-600 text-center">{detectError}</div>
        )}
      </form>
    </div>
  );
}
