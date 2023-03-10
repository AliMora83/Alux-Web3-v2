import { GlobeAltIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useAcceptDirectListingOffer, useAddress, useBuyNow, useContract, useListing, useMakeBid, useMakeOffer, useNetwork, useNetworkMismatch, useOffers } from "@thirdweb-dev/react";
import { ListingType } from "@thirdweb-dev/sdk";
import { RaceBy, Ring } from "@uiball/loaders";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import ImageGallery from "react-image-gallery";

import { ethers } from "ethers";
import { Header } from "../../components";
import network from "../../utils/network";
import useColorTheme from "../../utils/useColorTheme";

type Props = {};

function ListingPage({}: Props) {
  const router = useRouter();
  const { listingId } = router.query as {
    listingId: string;
  };
  const [minimumNextBid, setMinimumNextBid] = React.useState<{
    displayValue: string;
    symbol: string;
  }>();

  const [bidAmount, setBidAmount] = React.useState<string>("");
  const [, switchNetwork] = useNetwork();
  const networkMismatch = useNetworkMismatch();

  const { contract } = useContract(process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT, "marketplace");

  const { mutate: buyNow, isLoading: isBuying, error: buyError } = useBuyNow(contract);

  const { data: listing, isLoading, error } = useListing(contract, listingId);

  console.log(listing);

  const { mutate: makeOffer, isLoading: isMakingOffer, error: makeOfferError } = useMakeOffer(contract);

  const { data: offers, isLoading: isLoadingOffers, error: offersError } = useOffers(contract, listingId);

  const { mutate: makeBid, isLoading: isMakingBid, error: makeBidError } = useMakeBid(contract);

  const { mutate: acceptOffer, isLoading: isAcceptingOffer, error: acceptOfferError } = useAcceptDirectListingOffer(contract);

  const formatPlaceholder = () => {
    if (!listing) return;

    if (listing.type === ListingType.Direct) {
      return "Enter Offer Amount";
    }

    if (listing.type === ListingType.Auction) {
      return Number(minimumNextBid?.displayValue) === 0 ? "Enter Bid Amount" : `min. ${minimumNextBid?.displayValue || "0"} ${minimumNextBid?.symbol || ""}`;

      // TODO: Add support for bid increments
    }
  };

  React.useEffect(() => {
    if (!listingId || !contract || !listing) return;

    const fetchMinNextBid = async () => {
      if (!listingId || !contract) return;

      const minBidResponse = await contract.auction.getMinimumNextBid(listingId);

      setMinimumNextBid({
        displayValue: minBidResponse.displayValue,
        symbol: minBidResponse.symbol
      });
    };

    if (listing.type === ListingType.Auction) {
      fetchMinNextBid();
    }
  }, [listingId, contract, listing]);

  const address = useAddress();

  const buyNft = async () => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (networkMismatch) {
      switchNetwork && switchNetwork(network);
      return;
    }

    if (!listingId || !contract || !listing) return;

    toast.loading("Buying NFT...");

    await buyNow(
      {
        id: listingId,
        buyAmount: 1,
        type: listing.type
      },
      {
        onSuccess: () => {
          toast.dismiss();
          toast.success("NFT bought successfully!");
          router.push("/");
        },
        onError: (error, variable, context) => {
          toast.dismiss();
          toast.error("Error buying NFT");
          console.log({
            error,
            variable,
            context
          });
        }
      }
    );
  };

  const createBidOrOffer = async () => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }
    try {
      if (networkMismatch) {
        switchNetwork && switchNetwork(network);
        return;
      }

      // Direct Listing
      if (listing?.type === ListingType.Direct) {
        if (listing.buyoutPrice.toString() === ethers.utils.parseEther(bidAmount).toString()) {
          buyNft();
          return;
        }

        toast.loading("Making offer...");
        await makeOffer(
          {
            listingId,
            quantity: 1,
            pricePerToken: bidAmount
          },
          {
            onSuccess: () => {
              toast.dismiss();
              toast.success("Offer made successfully!");
              setBidAmount("");
            },
            onError: (error: any, variable, context) => {
              toast.dismiss();
              toast.error("Error making offer");
              console.log({
                error,
                variable,
                context
              });
            }
          }
        );
      }

      // Auction Listing
      if (listing?.type === ListingType.Auction) {
        toast.loading("Making bid...");
        await makeBid(
          {
            listingId,
            bid: bidAmount
          },
          {
            onSuccess: () => {
              toast.dismiss();
              toast.success("Bid made successfully!");
              setBidAmount("");
            },
            onError: (error: any, variable, context) => {
              toast.dismiss();
              toast.error("Error making bid");
              console.log({
                error,
                variable,
                context
              });
            }
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const theme = useColorTheme();

  const acceptDirectOffer = async (offer: Record<string, any>) => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (networkMismatch) {
      switchNetwork && switchNetwork(network);
      return;
    }

    if (!listingId || !contract) return;

    toast.loading("Accepting offer...");

    await acceptOffer(
      {
        listingId,
        addressOfOfferor: offer.offeror
      },
      {
        onSuccess: () => {
          toast.dismiss();
          toast.success("Offer accepted successfully!");
        },
        onError: (error: any, variable, context) => {
          toast.dismiss();
          toast.error("Error accepting offer");
          console.log({
            error,
            variable,
            context
          });
        }
      }
    );
  };

  const getGalleryImages: any = React.useCallback(() => {
    const galleryImages = listing?.asset.galleryImages as string[];
    if (galleryImages && galleryImages.length > 0) {
      return [
        {
          original: listing?.asset.image,
          thumbnail: listing?.asset.image
        },
        ...galleryImages.map((image) => ({
          original: image,
          thumbnail: image
        }))
      ];
    } else {
      return [
        {
          original: listing?.asset.image,
          thumbnail: listing?.asset.image
        }
      ];
    }
  }, [listing]);
  console.log(getGalleryImages());

  return (
    <div className="to-gary-100[0.35] dark:to-gray-300[0.25] bg-gradient-to-tr from-gray-300/[0.35] dark:from-purple-500/[0.15] min-h-screen pb-10 md:pb-10">
      <Header />

      {isLoading && (
        <div className="flex mt-10 w-full justify-center">
          <RaceBy size={80} lineWeight={5} speed={1.4} color={theme === "dark" ? "#fff" : "#0EA7E6"} />
        </div>
      )}

      {!listing && !isLoading && <h1 className="">Listing not fount</h1>}

      {!isLoading && listing && (
        <main className="max-w-6xl mx-auto p-2 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <ImageGallery additionalClass="z-0" items={getGalleryImages()} showNav={false} />

          <section className="flex-1 space-y-5">
            <div className="">
              <h1 className="text-lg font-bold">{listing.asset.typeOfProperty as string}</h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm py-2">{listing.asset.description}</p>

              <div className="flex items-center">
                <GlobeAltIcon className="h-5 text-[#0EA7E6]" />
                <a href={`https://maps.google.com/?q=${listing.asset.name}`} target="_blank" rel="noreferrer">
                  <h5 className="text-sm font-normal text-[#0EA7E6] pl-1">{listing.asset.name}</h5>
                </a>
              </div>
              <ul className="text-gray-600 dark:text-gray-200 text-sm w-2/3 pt-2 pl-6">
                <li>{`Bedrooms: ${listing.asset.bedrooms}`}</li>
                <li>{`Bathrooms: ${listing.asset.bathrooms}`}</li>
                <li>{`Square Feet: ${listing.asset.squareFeet}`}</li>
              </ul>

              <div className="grid grid-cols-2 items-center py-2">
                <p className="flex items-center text-xs sm:text-base text-gray-500">
                  <UserCircleIcon className="h-5" />
                  <span className="font-bold pr-2 pl-1 text-sm">Seller </span>
                  {listing.sellerAddress.slice(0, 4) + "..." + listing.sellerAddress.slice(-4)}
                </p>

                <a
                  href="https://api.whatsapp.com/send?phone=18027720076"
                  target="_blank"
                  className="neonBtn bg-[#0EA7E6] dark:text-white dark:bg-[#0EA7E6] w-full rounded-md text-white text-sm hover:text-[#094863] dark:hover:text-[#080a0b]"
                  rel="noreferrer"
                >
                  <p className="font-bold text-sm">Book a tour</p>
                </a>
              </div>
            </div>
            <hr className="px-5 dark:border-[#17303b]" />

            <div className="grid grid-cols-2 items-center py-2">
              <p className="font-bold text-sm">Listing Type:</p>
              <p className="text-sm">{listing.type === ListingType.Direct ? "Direct Listing" : "Auction Listing"}</p>

              <p className="font-bold text-sm">Purchase Price:</p>
              <p className="text-xl font-bold">
                {listing.buyoutCurrencyValuePerToken.displayValue} {listing.buyoutCurrencyValuePerToken.symbol}
              </p>

              <button
                onClick={buyNft}
                className="group relative col-start-2 mt-5 font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed w-full"
                disabled={isBuying || isMakingOffer || isMakingBid}
              >
                <div className="neonBtn bg-[#080a0b] dark:text-white dark:bg-[#0EA7E6]  w-full rounded-md text-white text-sm hover:text-[#0EA7E6] dark:hover:text-[#080a0b]">
                  {isBuying || isMakingOffer || isMakingBid ? <Ring size={20} lineWeight={5} speed={2} color="white" /> : "Buy Now"}
                </div>
              </button>
            </div>
            <hr className="px-5 dark:border-[#17303b]" />
          </section>
        </main>
      )}
      {/* <Footer /> */}
    </div>
  );
}

export default ListingPage;
