import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

import { BannerContext } from "../../context/BannerContext";
import { Grid } from "./Grid";
import { AbsoluteSpinner } from "../AbsoluteSpinner";
import { SelectCollection } from "./SelectCollection";
import { SaveSnackbar } from "./SaveSnackbar";
import { BannerModal } from "./BannerModal";

import type { Collection, Item as ItemType, DataResponse } from "./types";

const Item: React.FC<{
  children?: React.ReactNode;
  item?: ItemType;
  handleClick(item: ItemType): void;
}> = ({ children, item, handleClick }) => {
  return (
    <div
      className={`${
        !item ? "cursor-default" : ""
      } cursor-pointer relative h-[80px] w-[80px] object-cover rounded-md overflow-hidden bg-gray-800`}
    >
      <div className="w-full h-full absolute bg-gray-700 flex justify-center items-center">
        <div className="w-full h-full absolute border-2 border-dashed border-gray-500 flex justify-center items-center text-slate-500 text-3xl">
          {children}
        </div>
        {item && (
          <>
            <Image
              fill
              priority
              src={item.image}
              alt={item.tokenId}
              className="transition-transform duration-175 ease-out hover:scale-105"
              sizes="(max-width: 1024px) 30vw, 10vw"
            />
            <div
              className="absolute w-full h-full flex justify-center items-center transition-opacity ease-out opacity-0 hover:opacity-100 hover:bg-slate-900/75"
              onClick={() => {
                handleClick(item);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const NFTSelector = ({ address }: { address: string }) => {
  const { push } = useRouter();
  const [loadingCollection, setLoadingCollection] = useState(false);
  const [loadingBanner, setLoadingBanner] = useState(false);
  const [error, setError] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [items, setItems] = useState<ItemType[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>(null);
  const [bannerBase64, setBannerBase64] = useState<string>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { config, saveNFTs } = useContext(BannerContext);

  // ToDo: Move to context or hook
  const fetchData = useCallback(async () => {
    setLoadingCollection(true);
    setError(false);
    try {
      const response = await axios.get<DataResponse>(
        // `https://nft-api.stargaze-apis.com/api/v1beta/profile/${address}/nfts` // Deprecated API
        `https://nft-api.stargaze-apis.com/api/v1beta/profile/${address}/paginated_nfts?limit=1000`
      );

      const tokens = response.data.tokens;

      const groupedByCollectionName = tokens.reduce((accumulator, item) => {
        const { name } = item.collection;
        const group = accumulator.find((group) => group.name === name);
        const reducedItem = {
          tokenId: item.tokenId,
          image: item.image,
        };

        if (group) {
          group.items.push(reducedItem);
        } else {
          accumulator.push({ name, items: [reducedItem] });
        }

        return accumulator;
      }, []);

      // Sort collection names A-Z
      groupedByCollectionName.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      // Sort collection items by token id ascending
      groupedByCollectionName.reduce((accumulator, collection) => {
        collection.items.sort((a, b) => {
          return a.tokenId - b.tokenId;
        });
        return accumulator;
      }, []);

      setCollections(groupedByCollectionName);
    } catch (error: unknown) {
      setError(true);
    } finally {
      setLoadingCollection(false);
    }
  }, [address]);

  const handleSelect = (newItem: ItemType) => {
    // If max 3 already selected, replace last with new selection
    if (config.selectedNFTs.length === 3) {
      saveNFTs([...config.selectedNFTs.slice(0, 2), newItem]);
      return;
    }

    saveNFTs([...config.selectedNFTs, newItem]);
  };

  const handleRemove = (oldItem: ItemType) => {
    saveNFTs(config.selectedNFTs.filter((item) => item !== oldItem));
  };

  const handleSubmit = async () => {
    try {
      setLoadingBanner(true);
      const response = await axios.post("/api/generate-banner", {
        config,
      });
      setBannerBase64(`data:;base64,${response.data}`);
      setIsModalOpen(true);
    } catch (error: unknown) {
      console.error("Error generating image");
    } finally {
      setLoadingBanner(false);
    }
  };

  useEffect(() => {
    if (address) {
      fetchData();
    }
  }, [address, fetchData]);

  useEffect(() => {
    if (selectedCollection) {
      const associatedCollection = collections.find(
        (item) => item.name === selectedCollection
      );
      setItems(associatedCollection.items);
    }
  }, [collections, selectedCollection]);

  return (
    <div className="w-full flex flex-col items-center">
      {error && <div>Error fetching data</div>}
      <SelectCollection
        collections={collections}
        handleChange={(value: string | null) => {
          setSelectedCollection(value);
        }}
      />
      <BannerModal
        isOpen={isModalOpen}
        bannerBase64={bannerBase64}
        handleClose={() => {
          setIsModalOpen(false);
          setBannerBase64(null);
        }}
      />
      <Grid
        collectionName={selectedCollection}
        handleSelect={handleSelect}
        handleRemove={handleRemove}
        items={items}
        selected={config.selectedNFTs}
      />
      <SaveSnackbar>
        <div className="flex gap-3 mb-3">
          <Item handleClick={handleRemove} item={config.selectedNFTs?.[0]}>
            1
          </Item>
          <Item handleClick={handleRemove} item={config.selectedNFTs?.[1]}>
            2
          </Item>
          <Item handleClick={handleRemove} item={config.selectedNFTs?.[2]}>
            3
          </Item>
        </div>
        <div className="flex gap-2">
          <button
            className="block w-full min-w-[100px] py-2 rounded border border-slate-500 bg- text-md font-medium  text-white transition duration-150 ease-in-out hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed"
            onClick={() => {
              push("/banner/theme");
            }}
          >
            Back
          </button>
          <button
            className="block w-full min-w-[100px] py-2 rounded bg-indigo-600 text-md font-medium  text-white transition duration-150 ease-in-out hover:bg-indigo-500 disabled:bg-slate-500 disabled:cursor-not-allowed"
            disabled={
              config.selectedNFTs.length < 3 ||
              loadingBanner ||
              loadingCollection
            }
            onClick={handleSubmit}
          >
            Next
          </button>
        </div>
        {loadingBanner && <AbsoluteSpinner />}
      </SaveSnackbar>
    </div>
  );
};

export default NFTSelector;