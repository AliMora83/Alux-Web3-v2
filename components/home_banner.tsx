import React from "react";

type Props = {};

export default function Home_banner({}: Props) {
  return (
    <div className="my-16">
      <section className="bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-md">
        <div className="container flex flex-col mx-auto md:flex-row">
          <div className="w-full md:w-1/5 m-5 rounded-md">
            <img src="alux.png" alt="alux" />
          </div>
          <div className="flex flex-col w-full p-6 lg:w-2/3 md:p-8">
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-8 h-8 mb-4 mr-3 text-[#0EA7E6]"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <div className="">
                <h2 className="text-xl font-semibold leading-none">
                  Blockchain Solutions for Real
                  Estate
                </h2>
                <p className="mt-1 mb-4 text-sm">
                  Learn more about the lastest
                  technologies for Real Estate
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-500 pt-4 dark:text-gray-400">
              One of the most exciting ways
              Ethereum benefits the industry is
              through the digital securitization
              of real estate properties, also
              known as tokenization. Digital
              assets can represent real-world
              assets such as real estate, real
              estate funds, revenue streams,
              governance rights, and more. <br />{" "}
              <br />
              Once these assets are tokenized,
              they can be divided into more
              granular pieces, made accessible to
              a wider pool of investors, and
              leveraged to raise capital. Once
              tokenized, the programmable Ethereum
              blockchain enables the secure and
              compliant digitization of the
              transactions and processes around
              these assets, including issuance,
              trading, and lifecycle management.
            </p>
            <a
              href="https://consensys.net/blockchain-use-cases/real-estate/"
              target="_blank"
              className="pt-5"
            >
              <button className="self-start px-6 py-2 text-base font-medium rounded-lg bg-[#0EA7E6] text-gray-50">
                Read more
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
