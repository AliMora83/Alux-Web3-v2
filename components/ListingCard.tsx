import React from "react";

type Props = {
  children: React.ReactNode;
  active?: boolean;
  noHover?: boolean;
};

function ListingCard({
  children,
  active,
  noHover,
}: Props) {
  return (
    <div
      className={`group relative cursor-pointer transition duration-500 ease-in-out ${
        noHover ? "" : "hover:scale-105"
      } ${active ? "scale-105" : "scale-100"}`}
    >
      <div
        className={`animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-xl bg-gradient-to-t from-[#bfbebe] to-[#ededed]
                dark:bg-gradient-to-t dark:from-[#0f5573] dark:to-[#2b2113] opacity-20 blur transition duration-500 group-hover:opacity-80 ${
                  active ? "opacity-80" : ""
                }`}
      ></div>
      <div className="relative block space-x-4 divide-gray-600 rounded-xl bg-gray-100 px-1.5 leading-none text-gray-200 transition duration-200 hover:text-gray-300 dark:bg-black sm:p-2">
        <div className="duration-600 origin-top-left rounded-2xl p-3 sm:w-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default ListingCard;
