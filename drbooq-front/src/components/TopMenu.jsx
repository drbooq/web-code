// src/components/TopMenu.jsx - Staff can access all links
import React from "react";
import { Home, UserSearch, Hospital, Info } from "lucide-react";

const items = [
  { icon: <Home className="w-5 h-5 text-[#0071BC]" />, label: "Home", link: "/" },
  { icon: <UserSearch className="w-5 h-5 text-[#003057]" />, label: "Find a Doctor", link: "/offline-doctors" },
  { icon: <Hospital className="w-5 h-5 text-[#E63946]" />, label: "Hospitals / Clinics", link: "/hospitals" },
  { icon: <Info className="w-5 h-5 text-[#0071BC]" />, label: "About", link: "/about" },
];

export default function TopMenu() {
  return (
    <div
      className="
        fixed left-0 right-0 z-40 
        bg-[#eef2ff] border-t border-gray-200 shadow-sm
        top-14 sm:top-16
      "
    >
      <div
        className="
          max-w-7xl mx-auto 
          flex justify-between items-center
          px-4 sm:px-8 
          h-[3.2rem] sm:h-14
        "
      >
        {items.map((item, i) => {
          const isHospital = item.label === "Hospitals / Clinics";

          return (
            <a
              key={i}
              href={item.link}
              className="
                flex flex-col sm:flex-row items-center justify-center
                sm:justify-start
                gap-0.5 sm:gap-2
                text-[0.7rem] sm:text-sm font-semibold 
                text-[#003057] hover:text-[#0071BC]
                transition
                relative top-[3px] sm:top-0
              "
            >
              <span className="flex items-center justify-center relative top-[1px] sm:top-0">
                {React.cloneElement(item.icon, {
                  className:
                    "w-4 h-4 sm:w-5 sm:h-5 " +
                    (item.icon.props.className || ""),
                })}
              </span>

              <span className="truncate text-center sm:text-left">
                <span className="sm:hidden">
                  {isHospital ? "Hospitals" : item.label}
                </span>
                <span className="hidden sm:inline">{item.label}</span>
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
