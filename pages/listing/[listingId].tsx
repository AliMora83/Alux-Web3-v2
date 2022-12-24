import { UserCircleIcon } from "@heroicons/react/24/solid";
import {
    MediaRenderer,
    useContract,
    useListing,
    useNetwork,
    useNetworkMismatch,
    useBuyNow,
    useAddress,
    useMakeOffer,
    useOffers,
    useMakeBid,
    useAcceptDirectListingOffer,
} from "@thirdweb-dev/react";
import { ListingType, NATIVE_TOKENS } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import React from "react";
import Countdown from "react-countdown";
import { RaceBy, Ring } from "@uiball/loaders";
import toast from "react-hot-toast";

import { ButtonNeon, Footer, Header, ListingCard } from "../../components";
import network from "../../utils/network";
import useColorTheme from "../../utils/useColorTheme";
import { ethers } from "ethers";

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

    const { contract } = useContract(
        process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
        "marketplace"
    );

    const {
        mutate: buyNow,
        isLoading: isBuying,
        error: buyError,
    } = useBuyNow(contract);

    const { data: listing, isLoading, error } = useListing(contract, listingId);

    console.log(listing);

    const {
        mutate: makeOffer,
        isLoading: isMakingOffer,
        error: makeOfferError,
    } = useMakeOffer(contract);

    const {
        data: offers,
        isLoading: isLoadingOffers,
        error: offersError,
    } = useOffers(contract, listingId);

    const {
        mutate: makeBid,
        isLoading: isMakingBid,
        error: makeBidError,
    } = useMakeBid(contract);

    const {
        mutate: acceptOffer,
        isLoading: isAcceptingOffer,
        error: acceptOfferError,
    } = useAcceptDirectListingOffer(contract);

    const formatPlaceholder = () => {
        if (!listing) return;

        if (listing.type === ListingType.Direct) {
            return "Enter Offer Amount";
        }

        if (listing.type === ListingType.Auction) {
            return Number(minimumNextBid?.displayValue) === 0
                ? "Enter Bid Amount"
                : `min. ${minimumNextBid?.displayValue || "0"} ${
                      minimumNextBid?.symbol || ""
                  }`;

            // TODO: Add support for bid increments
        }
    };

    React.useEffect(() => {
        if (!listingId || !contract || !listing) return;

        if (listing.type === ListingType.Auction) {
            fetchMinNextBid();
        }
    }, [listingId, contract, listing]);

    const fetchMinNextBid = async () => {
        if (!listingId || !contract) return;

        const minBidResponse = await contract.auction.getMinimumNextBid(
            listingId
        );

        setMinimumNextBid({
            displayValue: minBidResponse.displayValue,
            symbol: minBidResponse.symbol,
        });
    };

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
                type: listing.type,
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
                        context,
                    });
                },
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
                if (
                    listing.buyoutPrice.toString() ===
                    ethers.utils.parseEther(bidAmount).toString()
                ) {
                    buyNft();
                    return;
                }

                toast.loading("Making offer...");
                await makeOffer(
                    {
                        listingId,
                        quantity: 1,
                        pricePerToken: bidAmount,
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
                                context,
                            });
                        },
                    }
                );
            }

            // Auction Listing
            if (listing?.type === ListingType.Auction) {
                toast.loading("Making bid...");
                await makeBid(
                    {
                        listingId,
                        bid: bidAmount,
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
                                context,
                            });
                        },
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
                addressOfOfferor: offer.offeror,
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
                        context,
                    });
                },
            }
        );
    };

    return (
        <div className="to-gary-100[0.35] dark:to-gray-300[0.25] bg-gradient-to-tr from-gray-300/[0.35] dark:from-purple-500/[0.15] min-h-screen pb-10 md:pb-10">
            <Header />

            {isLoading && (
                <div className="flex mt-10 w-full justify-center">
                    <RaceBy
                        size={80}
                        lineWeight={5}
                        speed={1.4}
                        color={theme === "dark" ? "#fff" : "#0EA7E6"}
                    />
                </div>
            )}

            {!listing && !isLoading && <h1 className="">Listing not fount</h1>}

            {!isLoading && listing && (
                <main className="max-w-6xl mx-auto p-2 flex flex-col lg:flex-row space-y-10 space-x-5 pr-10 my-3">
                    <div className="p-10 mx-auto lg:mx-0 max-w-md xl:max-w-6xl">
                        <ListingCard noHover>
                            <div className="cursor-default overflow-hidden p-3 rounded-md border dark:border-[#17303b] mx-auto lg:mx-0 max-w-md lg:max-w-md">
                                <MediaRenderer
                                    className="rounded-lg"
                                    src={listing.asset.image}
                                />
                                {/* Pull images form IPFS */}
                            </div>
                        </ListingCard>
                    </div>

                    <section className="flex-1 space-y-5">
                        <div className="">
                            <h1 className="text-lg font-bold">
                                LA Condominium
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 text-sm py-2">
                                {listing.asset.description}
                            </p>
                            <h5 className="text-base font-semibold text-gray-600 pl-5">
                                {listing.asset.name}
                            </h5>
                            <ul className="text-gray-600 dark:text-gray-200 text-sm w-2/3 pt-2 pl-5">
                                <li>{`Bedrooms: ${listing.asset.bedrooms}`}</li>
                                <li>{`Bathrooms: ${listing.asset.bathrooms}`}</li>
                                <li>{`Square Feet: ${listing.asset.squareFeet}`}</li>
                            </ul>

                            <p className="flex items-center text-xs pt-2 sm:text-base text-gray-500">
                                <UserCircleIcon className="h-5" />
                                <span className="font-bold pr-1 text-sm">
                                    Seller{" "}
                                </span>
                                {listing.sellerAddress.slice(0, 4) +
                                    "..." +
                                    listing.sellerAddress.slice(-4)}
                            </p>
                        </div>
                        <hr className="px-5 dark:border-[#17303b]" />

                        <div className="grid grid-cols-2 items-center py-2">
                            <p className="font-bold text-sm">Listing Type:</p>
                            <p className="text-sm">
                                {listing.type === ListingType.Direct
                                    ? "Direct Listing"
                                    : "Auction Listing"}
                            </p>

                            <p className="font-bold text-sm">Purchase Price:</p>
                            <p className="text-xl font-bold">
                                {
                                    listing.buyoutCurrencyValuePerToken
                                        .displayValue
                                }{" "}
                                {listing.buyoutCurrencyValuePerToken.symbol}
                            </p>

                            <button
                                onClick={buyNft}
                                className="group relative col-start-2 mt-5 font-bold rounded-full w-44 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={
                                    isBuying || isMakingOffer || isMakingBid
                                }
                            >
                                <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-md bg-gradient-to-r from-gray-600 to-gray-500 opacity-30 blur transition duration-500 group-hover:opacity-70 w-36"></div>
                                <div className="neonBtn bg-[#080a0b] dark:text-white dark:bg-[#0EA7E6] py-3 px-5 w-36 rounded-md text-white text-sm hover:text-[#0EA7E6] dark:hover:text-[#080a0b]">
                                    {isBuying ||
                                    isMakingOffer ||
                                    isMakingBid ? (
                                        <Ring
                                            size={20}
                                            lineWeight={5}
                                            speed={2}
                                            color="white"
                                        />
                                    ) : (
                                        "Buy Now"
                                    )}
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
