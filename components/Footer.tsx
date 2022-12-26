import React from "react";
import alux from "public/alux.png";
import Image from "next/image";

type Props = {};

function Footer({}: Props) {
  return (
    <div className="absolute bottom-0 left-0 right-0">
      <footer
        className="flex flex-col items-center text-white justify-between pb-5
          space-y-3 mt-5"
      >
        <a
          href="https://www.alux.com/"
          target="_blank"
        >
          <Image
            className="rounded-full h-6 w-6 hover:scale-110 ease-in-out duration-150"
            src={alux}
            alt="icon"
          />
        </a>
        <p className="text-xs px-10 text-gray-500 text-center">
          Copyright © 2022 Alux Inc. All rights
          reserved | Web3 Development by{" "}
          <span className="font-medium">
            <a
              href="https://alimora-portfolio.vercel.app/"
              target="_blank"
            >
              Ali Mora.
            </a>
          </span>
        </p>
      </footer>
    </div>
  );
}

export default Footer;
