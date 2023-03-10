import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { MediaRenderer } from "@thirdweb-dev/react";
import type { NextPage } from "next";

import { ListingType } from "@thirdweb-dev/sdk";
import Link from "next/link";
import { Footer, Header, ListingCard, NftSkeleton } from "../components";
import useListItem from "../utils/hooks/useListItem";
import React from "react";
import Home_banner from "../components/home_banner";

const Home: NextPage = () => {
  const { listings, loadingListings } = useListItem();

  const [searchString, setSearchString] = React.useState<string>("");

  const filteredListings = React.useMemo(() => {
    if (!searchString) {
      return listings;
    }

    return listings?.filter((listing) => {
      const name = listing.asset.name as string;
      return name.toLowerCase().includes(searchString.toLowerCase());
    });
  }, [listings, searchString]);

  return (
    <>
      <div className="bg-gradient-to-tr from-gray-400/[0.50] to-gray-200[0.35]  dark:from-[#080a0b] dark:to-black min-h-screen pb-20 md:pb-10 relative">
        <Header searchString={searchString} setSearchString={setSearchString} />

        <main className="max-w-6xl mx-auto p-2">
          {loadingListings ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-5 lg:mx-auto">
              {/* Skeleton Loading */}
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <NftSkeleton key={index} />
                ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 lg:mx-auto">
              {filteredListings?.map((listing) => (
                <Link key={listing.id} href={`/listing/${listing.id}`} className="flex flex-col">
                  <ListingCard>
                    <div className="flex flex-col p-2 space-y-2">
                      <div className="flex-1 flex flex-col pb-2 items-center">
                        <MediaRenderer className="rounded-t-lg h-44" src={listing.asset.image} />
                      </div>

                      <div className="pt-2 space-y-2">
                        <h2 className="text-md truncate text-gray-700 dark:text-white/60 font-bold leading-6">{listing.asset.typeOfProperty as string}</h2>
                        {/* <hr className="" /> */}

                        <div className="flex">
                          <GlobeAltIcon className="h-4 mr-2 text-[#0EA7E6]" />
                          <p className="truncate text-xs text-[#0EA7E6]">{listing.asset.name}</p>
                        </div>

                        <p className="text-xs truncate text-gray-600 dark:text-white/60 line-clamp-2">{listing.asset.description}</p>
                      </div>

                      <div className="flex pt-5">
                        <p className="flex items-center space-x-1">
                          <span className="font-bold text-black dark:text-white text-md">{listing.buyoutCurrencyValuePerToken.displayValue}</span>
                          <span className="text-gray-600 dark:text-gray-400 text-sm pl-1">{listing.buyoutCurrencyValuePerToken.symbol}</span>
                        </p>

                        <div
                          className={[
                            "flex space-x-1 items-center justify-end text-xs w-fit ml-auto py-2 px-4 rounded-lg text-white",
                            listing.type === ListingType.Direct ? "bg-[#2c2b2b]" : "bg-[#0EA7E6]"
                          ].join(" ")}
                        >
                          <p>{listing.type === ListingType.Direct ? "View more" : "Auction"}</p>
                        </div>
                      </div>
                    </div>
                  </ListingCard>
                </Link>
              ))}
            </div>
          )}
          <div className="hero-image"></div>
          <Home_banner />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
