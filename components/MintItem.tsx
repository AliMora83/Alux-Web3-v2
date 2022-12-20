import {
  InformationCircleIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import React from "react";

type Props = {
  image: File | null;
  setImage: (image: File | null) => void;
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  typeOfProperty: string;
  setTypeOfProperty: (
    typeOfProperty: string
  ) => void;
  bedrooms: string;
  setBedrooms: (bedrooms: string) => void;
  bathrooms: string;
  setBathrooms: (bathrooms: string) => void;
  squareFeet: string;
  setSquareFeet: (squareFeet: string) => void;
};

function MintItem({
  image,
  setImage,
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
}: Props) {
  const [imageUrl, setImageUrl] = React.useState<
    string | null
  >(null);

  const onFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      e.target.files &&
      e.target.files.length > 0
    ) {
      setImage(e.target.files[0]);
    }
  };

  React.useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImageUrl(
          reader.result as string | null
        )
      );
      reader.readAsDataURL(image);
    }
  }, [image]);

  return (
    <main className="mt-5 space-y-5">
      <form className="flex flex-col space-y-6">
        {/* Upload Image */}
        <div className="flex flex-col justify-center items-center space-y-4">
          <div className="inline-flex justify-center items-center h-24 w-24 rounded-md overflow-hidden bg-gray-100 shadow-md border border-gray-200">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="item"
                className="h-full w-full object-contain"
              />
            ) : (
              <PhotoIcon className="h-10 w-10 text-gray-400" />
            )}
          </div>
          <button
            type="button"
            className="bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0EA7E6]"
          >
            <label
              htmlFor="image"
              className="cursor-pointer py-2 px-3 inline-flex"
            >
              {image ? "Change" : "Upload"} Image
            </label>
          </button>
          <input
            id="image"
            name="image"
            type="file"
            className="hidden"
            onChange={onFileChange}
            accept="image/*"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Address of Property
          </label>
          <input
            type="text"
            id="address"
            name="address"
            onChange={(e) =>
              setName(e.target.value)
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#0EA7E6] focus:border-[#0EA7E6] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#0EA7E6] dark:focus:border-[#0EA7E6]"
            placeholder="eg. 112 Woodland Drive, New York, NY 10019"
            value={name}
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#0EA7E6] focus:border-[#0EA7E6] block w-full p-2.5 dark:bg-gray-700 dark:border-[#080a0b] dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#0EA7E6] dark:focus:border-[#0EA7E6]"
            placeholder="Description of your Property..."
            value={description}
            required
          />
        </div>
        <div className="flex flex-row justify-between">
          <div>
            <label
              htmlFor="typeOfProperty"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Property Type
            </label>
            <input
              type="text"
              id="typeOfProperty"
              name="typeOfProperty"
              onChange={(e) =>
                setTypeOfProperty(e.target.value)
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#0EA7E6] focus:border-[#0EA7E6] inline w-40 p-2.5 dark:bg-gray-700 dark:border-[#080a0b] dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#0EA7E6] dark:focus:border-[#0EA7E6]"
              placeholder="Single family home"
              value={typeOfProperty}
              required
            />
          </div>
          <div>
            <label
              htmlFor="bedrooms"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Bedrooms
            </label>
            <input
              type="text"
              id="bedrooms"
              name="bedrooms"
              onChange={(e) =>
                setBedrooms(e.target.value)
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#0EA7E6] focus:border-[#0EA7E6] inline w-36 p-2.5 dark:bg-gray-700 dark:border-[#080a0b] dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#0EA7E6] dark:focus:border-[#0EA7E6]"
              placeholder="eg. 4"
              value={bedrooms}
              required
            />
          </div>
          <div>
            <label
              htmlFor="bathrooms"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Bathrooms
            </label>
            <input
              type="text"
              id="bathrooms"
              name="bathrooms"
              onChange={(e) =>
                setBathrooms(e.target.value)
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#0EA7E6] focus:border-[#0EA7E6] inline w-36 p-2.5 dark:bg-gray-700 dark:border-[#080a0b] dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#0EA7E6] dark:focus:border-[#0EA7E6]"
              placeholder="eg. 3"
              value={bathrooms}
              required
            />
          </div>
          <div>
            <label
              htmlFor="squareFeet"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Square feet
            </label>
            <input
              type="text"
              id="squareFeet"
              name="squareFeet"
              onChange={(e) =>
                setSquareFeet(e.target.value)
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#0EA7E6] focus:border-[#0EA7E6] inline w-36 p-2.5 dark:bg-gray-700 dark:border-[#080a0b] dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#0EA7E6] dark:focus:border-[#0EA7E6]"
              placeholder="eg. 2200"
              value={squareFeet}
              required
            />
          </div>
        </div>
      </form>

      <p className="text-xs flex space-x-1 items-center w-3/5 text-gray-400">
        <InformationCircleIcon
          cursor={"pointer"}
          title="By adding your property here, you're
                            Minting an NFT of the item into your
                            wallet which may then be
                            listed for sale!"
          className="h-4 w-4 flex-shrink-0"
        />
        <span className="">
          By adding your property here, you're
          Minting an NFT of the item into your
          wallet which may then be listed for
          sale!
        </span>
      </p>
    </main>
  );
}

export default MintItem;
