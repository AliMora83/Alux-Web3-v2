import { MediaRenderer, useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import React from "react";
import { ListingSkeleton, ListingCard } from ".";

type Props = {
  selectedNft: NFT | null;
  setSelectedNft: React.Dispatch<React.SetStateAction<NFT | null>>;
  setListingType: React.Dispatch<React.SetStateAction<"directListing" | "auctionListing" | null>>;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  nfts: NFT[] | undefined;
  isLoadingNft: boolean;
  refetchNtfs: () => void;
};

function ListItem({ selectedNft, setSelectedNft, setPrice, setListingType, nfts, isLoadingNft, refetchNtfs }: Props) {
  return (
    <main className="overflow-hidden">
      <h5 className="font-medium text-xl">Select a Property for sale as NFT.</h5>
      <p className="text-xs dark:text-gray-300">Here you will find Property NFT&lsquo;s you have uploaded and are linked to your wallet</p>

      <div className="p-5 py-8 overflow-x-auto scrollbar-thin scrollbar-thumb-[#0EA7E6] scrollbar-track-[#2c2b2b]">
        <div className="flex items-center space-x-6">
          {isLoadingNft ? (
            <>
              {/* Skeleton Loading */}
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <ListingSkeleton key={i} />
                ))}
            </>
          ) : (
            <>
              {nfts?.map((nft) => (
                <ListingCard noHover active={selectedNft?.metadata.id === nft.metadata.id} key={nft.metadata.id}>
                  <div
                    onClick={() => {
                      if (selectedNft && selectedNft?.metadata.id === nft.metadata.id) {
                        setSelectedNft(null);
                      } else {
                        setSelectedNft(nft);
                      }
                    }}
                    className="flex flex-col bg-gray-100 items-start rounded-lg p-2 w-full"
                  >
                    <MediaRenderer className="rounded-lg w-72" src={nft.metadata.image} />
                    <p className="truncate pt-2 text-base font-md text-[#080a0b]">{nft.metadata.typeOfProperty as string}</p>

                    <p className="truncate pb-2 text-xs font-md text-gray-400">{nft.metadata.name}</p>
                    <hr />
                    <p className="text-xs text-gray-400 pt-2">{nft.metadata.description}</p>
                  </div>
                </ListingCard>
              ))}
            </>
          )}
        </div>
      </div>

      {selectedNft && (
        <form>
          <div className="flex flex-col p-10">
            <div className="grid grid-cols-2 gap-5">
              <label htmlFor="directListing" className="border-r font-light">
                Direct Listing
              </label>
              <input type="radio" name="listingType" id="directListing" value="directListing" className="ml-auto h-10 w-10 cursor-pointer" onChange={() => setListingType("directListing")} />

              {/* <label
                htmlFor="auctionListing"
                className="border-r font-light"
              >
                Auction
              </label>
              <input
                type="radio"
                name="listingType"
                id="auctionListing"
                value="auctionListing"
                className="ml-auto h-10 w-10 cursor-pointer"
                onChange={() =>
                  setListingType("auctionListing")
                }
              /> */}

              <label htmlFor="price" className="border-r font-light">
                Price
              </label>
              <input type="text" placeholder="0.05" className="outline-none bg-gray-100 text-gray-500 dark:text-gray-400 p-3 border rounded-md" onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>
        </form>
      )}
    </main>
  );
}

export default ListItem;
