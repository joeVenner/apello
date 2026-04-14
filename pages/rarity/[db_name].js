import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import GlassCard from "../../components/GlassCard";

const NftSection = (props) => {
  const router = useRouter();
  const [collectionInfo, setcollectionInfo] = useState([]);
  const getcollectionInfo = useCallback(() => {
    if (router.query.imageUrl) {
      return setcollectionInfo(router.query);
    }
  }, []);

  const { db_name } = router.query;
  const [nfts, setnfts] = useState(null);
  const [number, setNumber] = useState(null);

  useEffect(() => {
    getcollectionInfo();

    const fetchCollection = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/nfts/${db_name}`
      );
      const { data, collectInfo } = response.data;

      if (response.status === 200) {
        setnfts(data);
        setcollectionInfo(collectInfo);
      }
    };
    fetchCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [nftObj, setNftObj] = useState(null);
  const goClick = () => {
    if (nfts && number) {
      setNftObj(
        nfts.find((nft) => {
          return parseInt(nft.ID) === parseInt(number);
        })
      );
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      goClick();
    }
  };

  return (
    <section
      className="mx-auto mb-8 py-8 px-6 selection:bg-violet selection:text-noir"
      aria-label="the collection nfts"
    >
      <div
        className="sm:max-w-lg lg:max-w-2xl w-full mx-auto px-4 flex flex-col items-center gap-x-8"
        aria-label="nft's info"
      >
        <div className="w-full flex flex-col">
          <div
            className="flex flex-col md:flex-row gap-4 justify-center items-center mb-4 text-base"
            aria-label="search fields"
          >
            <div
              className="flex gap-x-1 w-full sm:w-4/5"
              aria-label="search by number"
            >
              <input
                type="text"
                placeholder="Search by ID"
                className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-xl p-3 text-white placeholder:text-muted focus:border-violet focus:outline-none focus:ring-1 focus:ring-violet/50 w-full transition-colors"
                onKeyDown={handleKeyDown}
                onChange={(e) => setNumber(e.target.value)}
              />
              <button
                className="bg-violet/80 hover:bg-violet backdrop-blur-sm rounded-xl p-3 uppercase text-white transition-colors"
                onClick={goClick}
              >
                Go
              </button>
            </div>
          </div>
          <GlassCard className="p-4 flex flex-col self-center w-full sm:w-4/5">
            <div className="flex justify-between flex-wrap">
              <h4 className="font-medium text-2xl capitalize">
                {nftObj
                  ? collectionInfo.name + "#" + nftObj.ID
                  : "nft name"}
              </h4>
              <span className="bg-violet/60 backdrop-blur-sm rounded-xl whitespace-nowrap h-8 p-2 flex items-center font-medium">
                {nftObj
                  ? "Rank " + nftObj.Rank + " of " + collectionInfo.totalItem
                  : "nft rank"}
              </span>
            </div>
            <h5 className="text-violet font-medium text-xl">
              {nftObj?.Network || "Chain name"}
            </h5>
          </GlassCard>
        </div>
        <div className="w-full sm:w-4/5 mt-4">
          <div
            style={{
              backgroundImage: `url(${nftObj?.Pic || collectionInfo.imageUrl})`,
            }}
            className="pt-[100%] rounded-3xl outline-none border border-white/10 bg-cover bg-center"
          />
        </div>
      </div>
    </section>
  );
};

export default NftSection;