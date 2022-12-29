import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import React from "react";
import toast from "react-hot-toast";

import { ModalHandle } from "../../components/Modal/Modal";

function useMint() {
  const address = useAddress();
  const [image, setImage] = React.useState<File | null>(null);
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [typeOfProperty, setTypeOfProperty] = React.useState<string>("");
  const [bedrooms, setBedrooms] = React.useState<string>("");
  const [bathrooms, setBathrooms] = React.useState<string>("");
  const [squareFeet, setSquareFeet] = React.useState<string>("");
  const [galleryImages, setGalleryImages] = React.useState<string[]>([]);

  const [isMinting, setIsMinting] = React.useState<boolean>(false);

  const aboutModalRef = React.useRef<ModalHandle>(null);
  const inventoryModalRef = React.useRef<ModalHandle>(null);
  const connectModalRef = React.useRef<ModalHandle>(null);

  const openConnectModal = () => {
    connectModalRef.current?.openModal();
  };
  const closeConnectModal = () => {
    connectModalRef.current?.closeModal();
  };

  const openAddInventory = () => {
    inventoryModalRef.current?.openModal();
  };
  const closeAddInventory = () => {
    inventoryModalRef.current?.closeModal();
  };

  const { contract: collectionContract } = useContract(process.env.NEXT_PUBLIC_COLLECTION_CONTRACT, "nft-collection");

  const { data: nfts, isLoading: isLoadingNft, refetch: refetchNtfs } = useOwnedNFTs(collectionContract, address);

  const mintNtf = async () => {
    if (!collectionContract || !address) {
      closeAddInventory();
      toast.error("Please connect your wallet");
      return;
    }

    // Toasts
    if (!image) return toast.error("Please upload an image");
    if (!name) return toast.error("Please enter a address");
    if (!description) return toast.error("Please enter a description");
    if (!typeOfProperty) return toast.error("Please enter a type of property");
    if (!bedrooms) return toast.error("Please enter number of bedrooms");
    if (!bathrooms) return toast.error("Please enter number of bathrooms");
    if (!squareFeet) return toast.error("Please enter property size");
    if (!galleryImages[0]) return toast.error("Please upload at least one gallery image");

    toast.loading("Minting NFT...");
    setIsMinting(true);

    const metadata = {
      name,
      description,
      typeOfProperty,
      bedrooms,
      bathrooms,
      squareFeet,
      image: image,
      galleryImages
    };

    try {
      const tx = await collectionContract.mintTo(address, metadata);

      const receipt = tx.receipt;
      const tokenId = tx.id;
      const nft = await tx.data();

      setIsMinting(false);
      refetchNtfs();
      toast.dismiss();
      toast.success("Successfully minted NFT");
      closeAddInventory();
    } catch (error) {
      toast.dismiss();
      setIsMinting(false);
      toast.error("Error minting NFT");
      console.error({ error });
    } finally {
      setName("");
      setDescription("");
      setTypeOfProperty("");
      setBedrooms("");
      setBathrooms("");
      setSquareFeet("");
      setImage(null);
      setGalleryImages([]);
    }
  };

  return {
    address,
    name,
    setName,
    description,
    setDescription,
    typeOfProperty,
    setTypeOfProperty,
    bedrooms,
    setBedrooms,
    bathrooms,
    setBathrooms,
    squareFeet,
    setSquareFeet,
    image,
    setImage,
    galleryImages,
    setGalleryImages,
    isMinting,
    openAddInventory,
    closeAddInventory,
    openConnectModal,
    closeConnectModal,
    inventoryModalRef,
    connectModalRef,
    mintNtf,
    nfts,
    isLoadingNft,
    refetchNtfs
  };
}

export default useMint;
