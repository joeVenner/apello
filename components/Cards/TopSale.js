import { useState, useEffect } from "react";
import { coinName } from "./SalesCardGrid";
import axios from "axios";
import { useRouter } from "next/router";

const TopSale = ({chain, query}) => {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
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
    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const card = e.target;
        const { left, top, width, height } = card.getBoundingClientRect();

        const x = ((clientX - left) / width - 0.5) * 30; // Adjust the sensitivity here
        const y = ((clientY - top) / height - 0.5) * 30;

        setTilt({ x, y });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };
    return (

        <div 
      className={`tilt-card flex flex-col justify-center items-center gap-1 p-5 w-full min-h-[200px] bg-slate-800 shadow-inner bg-cover card`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        backgroundImage: topSale && (topSale?.CollectionName!=='rektbulls' && !topSale?.CollectionName.includes("levana")) ? `url("${topSale.nftImage}")` : `url("${topSale?.collectionImage}")` 
      }}
    >
      <div className=" shadow-black" >
        <p className="drop-shadow-lg text-white font-medium text-sm md:text-base capitalize ">{`Top Sale in ${query === 1 ? "1 Day" : query+" Days"}  `}</p>
        <span className="font-extrabold text-xl md:text-2xl ">{topSale && `${topSale.amount} $${coinName(router.query.chain, topSale.nftID.split(" ")[1])}`}</span>
      </div>
      <a href={`https://www.mintscan.io/${router.query.chain}/txs/${topSale && topSale.transactionID}`} target="_blank" rel="noreferrer" className="self-end mt-auto  inline-flex justify-center items-center rounded text-white-1 h-[40px] py-0 px-3 hover:opacity-80 transition duration-300 ease-in-out w-full  bg-[#20162A] z-10 text-xs md:text-sm">Details</a>
    </div>
     );
}
 
export default TopSale;
