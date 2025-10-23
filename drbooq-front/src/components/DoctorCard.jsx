import React from "react";

/**
 * DoctorCard
 * - Lightweight presentational card used across doctor listing pages
 * - Shows name, specialization, hospital info, fee, rating, experience
 * - NEW: displays a small status badge (Pending / Rejected) when doc.status !== 'approved'
 *
 * Props:
 *  - doc: doctor object (id, name, specialization, fee, rating, experience, photoUrl, status, hospitals[])
 *  - onBook: function invoked when Book button is clicked
 *  - onViewProfile: function invoked when View profile is clicked
 *  - showFee, showRating, showExperience: booleans to control UI bits
 *  - className: extra classes for container
 */
export default function DoctorCard({
  doc = {},
  onBook = () => {},
  onViewProfile = () => {},
  showFee = true,
  showRating = true,
  showExperience = true,
  className = "",
}) {
  const status = (doc.status || "approved").toString().toLowerCase();
  const isPending = status !== "approved";
  const badgeLabel = status === "rejected" ? "Rejected" : "Pending";
  const badgeClass = status === "rejected"
    ? "bg-red-50 text-red-700 border border-red-100"
    : "bg-yellow-50 text-yellow-800 border border-yellow-100";

  const initials = (doc.name || "Dr").split(" ").map((s) => s[0] || "").slice(0, 2).join("").toUpperCase();

  return (
    <div className={`relative bg-white rounded-xl shadow p-4 flex gap-4 items-start text-slate-900 ${className}`}>
      {/* status badge (small) */}
      {isPending && (
        <div className="absolute top-3 right-3">
          <span
            role="status"
            aria-label={`Profile status ${badgeLabel}`}
            className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeClass}`}
          >
            {badgeLabel}
          </span>
        </div>
      )}

      <div className="w-16 h-16 rounded-full overflow-hidden bg-indigo-50 grid place-items-center text-indigo-700 font-semibold text-lg flex-shrink-0">
        {doc.photoUrl ? (
          <img src={doc.photoUrl} alt={`${doc.name} avatar`} className="w-full h-full object-cover" />
        ) : (
          <div className="select-none">{initials}</div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-semibold truncate">{doc.name || "Doctor"}</div>
            <div className="text-xs text-gray-500 truncate mt-1">{doc.specialization || "General Medicine"}</div>
            {doc.hospitals && doc.hospitals.length > 0 && (
              <div className="text-xs text-gray-400 truncate mt-1">{String(doc.hospitals[0])}</div>
            )}
          </div>

          <div className="text-right flex-shrink-0">
            {showRating && typeof doc.rating !== "undefined" && (
              <div className="text-sm font-semibold">{Number(doc.rating).toFixed(1)} ★</div>
            )}
            {showFee && (typeof doc.fee !== "undefined") && (
              <div className="text-xs text-gray-500 mt-1">₹{doc.fee}</div>
            )}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <button onClick={onBook} className="px-3 py-1 rounded-md bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-sm font-medium shadow-sm">Book</button>
          <button onClick={onViewProfile} className="px-3 py-1 rounded-md border text-sm">View profile</button>

          {showExperience && typeof doc.experience !== "undefined" && (
            <div className="ml-auto text-xs text-gray-500">{doc.experience} yrs</div>
          )}
        </div>
      </div>
    </div>
  );
}
