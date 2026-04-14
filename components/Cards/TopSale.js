import { useState, useEffect } from "react";
import { coinName } from "./SalesCardGrid";
import axios from "axios";
import { useRouter } from "next/router";

const TopSale = ({chain, query}) => {
    const [topSale, setTopSale] = useState(null);
    const router = useRouter();
    // console.log("topsale", router.query.chain, query, chain, topSale, topSale.nftID.split(" ")[1]);
    useEffect(()=>{
      const fetchData = async() =>{
          try{

          const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sales/top1?day=${query}&chain=${chain}`);
          console.log("top1",res)
          const {topSale} = res.data;
          // console.log(topSale);
          setTopSale(topSale[0])

          } catch (err) {
              console.log(err)
          }
      }
      fetchData();
    },[query, router.query.chain])
    return (

        <div
      className={`flex flex-col justify-center items-center gap-1 p-5 w-full min-h-[200px] bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-glass hover:border-white/20 shadow-inner bg-cover`}
      style={{
        backgroundImage: topSale && (topSale?.CollectionName!=='rektbulls' && !topSale?.CollectionName.includes("levana")) ? `url("${topSale.nftImage}")` : `url("${topSale?.collectionImage}")`
      }}
    >
      <div className=" shadow-black" >
        <p className="drop-shadow-lg text-white font-medium text-sm md:text-base capitalize ">{`Top Sale in ${query === 1 ? "1 Day" : query+" Days"}  `}</p>
        <span className="font-extrabold text-xl md:text-2xl ">{topSale && `${topSale.amount} $${coinName(router.query.chain, topSale.nftID.split(" ")[1])}`}</span>
      </div>
      <a href={`https://www.mintscan.io/${router.query.chain}/txs/${topSale && topSale.transactionID}`} target="_blank" rel="noreferrer" className="self-end mt-auto  inline-flex justify-center items-center rounded text-white-1 h-[40px] py-0 px-3 hover:opacity-80 transition duration-300 ease-in-out w-full  bg-white/10 z-10 text-xs md:text-sm">Details</a>
    </div>
     );
}
 
export default TopSale;
