import { InformationCircleIcon, PhotoIcon } from "@heroicons/react/24/outline";
import React from "react";

type Props = {};

function About({}: Props) {
    

    return (
        <main className="mt-5 space-y-5">
            <form className="flex flex-col space-y-6">
                {/* Upload Image */}
                <div className="flex flex-col justify-center items-center space-y-4">
                    
                    <button
                        type="button"
                        className="bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0EA7E6]"
                    >
                       
                    </button>
                    
                </div>

                {/* Name */}
                <div>
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        About NAMKA Marketplace
                    </label>
                    
                </div>
                <div>
                    <label
                        htmlFor="about"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        About page here
                    </label>
                    
                </div>
            </form>

            <p className="text-xs flex space-x-1 items-center text-[#0EA7E6]">
                <InformationCircleIcon
                    cursor={"pointer"}
                    title="By add ing an item to the marketplace, you're
                            essentially Minting an NFT of the item into your
                            wallet which can then list for sale!"
                    className="h-4 w-4 flex-shrink-0"
                />
                <span>
                    By add ing an item to the marketplace, you're essentially
                    Minting an NFT of the item into your wallet which can then
                    list for sale!
                </span>
            </p>
        </main>
    );
}

export default About;
