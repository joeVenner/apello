import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CoinImage } from "./Cards/SalesCard";
import SalesCardGrid, { coinName } from "./Cards/SalesCardGrid";
import GlassCard from "./GlassCard";

const Card = ({ CollectionName, amountSum, collectionImage, router }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center gap-1 p-5 w-full min-h-[300px] bg-white/10 text-white shadow-inner bg-contain`}
      style={{
        backgroundImage: `url("${collectionImage}")`,
      }}
    >
      <span className="font-extrabold capitalize text-xl  ">{`${(
        Math.round(amountSum * 100) / 100
      ).toFixed(2)} $${coinName(router.query.chain)}`}</span>
      <div className="self-end mt-auto  inline-flex justify-center items-center rounded text-white-1 h-[40px] py-0 px-3 hover:opacity-80 transition duration-300 ease-in-out w-full  bg-white/10 z-10 text-xs md:text-sm truncate capitalize">
        <span className="">{CollectionName}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 12 12"
          className="my-auto ml-1 min-w-[12px]"
          width="12"
          height="12"
          size="12"
        >
          <path
            fill="#6C63FF"
            fill-rule="evenodd"
            d="M5.655.33a.5.5 0 01.69 0l.492.469a.5.5 0 00.514.109l.64-.229a.5.5 0 01.63.28l.26.63a.5.5 0 00.424.308l.678.052a.5.5 0 01.462.513l-.02.68a.5.5 0 00.263.454l.599.323a.5.5 0 01.213.657l-.294.613a.5.5 0 00.054.522l.416.539a.5.5 0 01-.072.686l-.519.44a.5.5 0 00-.162.5l.16.66a.5.5 0 01-.345.598l-.652.192a.5.5 0 00-.351.39l-.123.669a.5.5 0 01-.558.406l-.674-.09a.5.5 0 00-.48.213l-.383.561a.5.5 0 01-.676.144l-.579-.357a.5.5 0 00-.524 0l-.58.357a.5.5 0 01-.675-.144l-.383-.561a.5.5 0 00-.48-.214l-.674.09a.5.5 0 01-.558-.405l-.123-.67a.5.5 0 00-.35-.39l-.653-.19a.5.5 0 01-.346-.598l.16-.662a.5.5 0 00-.161-.499l-.519-.44a.5.5 0 01-.072-.686l.416-.54a.5.5 0 00.055-.52L.5 4.575a.5.5 0 01.213-.657l.6-.323a.5.5 0 00.261-.454l-.02-.68a.5.5 0 01.463-.513l.678-.052a.5.5 0 00.424-.308l.26-.63a.5.5 0 01.63-.28l.64.229a.5.5 0 00.514-.11L5.655.33z"
          ></path>
          <g clip-path="url(#clip0_1538_39894)">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.2"
              d="M8.5 4.5L5.062 7.938 3.5 6.375"
            ></path>
          </g>
          <defs></defs>
        </svg>
      </div>
    </div>
  );
  // <div className="h-full flex flex-col border border-noir rounded-lg overflow-hidden text-white-1 bg-noir transition-transform hover:scale-[1.02]">
  // <div className="relative w-full overflow-hidden flex items-center justify-center aspect-square">
  //     <div className="relative flex items-center justify-center w-full h-full rounded-[6px] overflow-hidden">
  //         <img src={collectionImage} alt={CollectionName} loading="lazy" className="aspect-square object-contain w-full h-full rounded-[6px] overflow-hidden" />
  //     </div>

  // </div>
  // <div className="flex px-2 py-5 gap-2 overflow-hidden">
  //     <span className="inline max-w-[50%] basis-1/2 truncate font-bold">{CollectionName}</span>
  //     <span className="max-w-[50%] basis-1/2 truncate">{`${(Math.round(amountSum * 100) / 100).toFixed(2)} $${coinName(router.query.chain)}`}</span>

  // </div>

  // </div>
};
const Top5 = ({ query, setQuery }) => {
  const [list, setList] = useState([]);

  const router = useRouter();
  //console.log("ch",router.query.chain);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/sales/top5?day=${query}${
            router.query.chain && "&chain=" + router.query.chain
          }`
        );
        const { count, sales } = res.data;
        setList(sales);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [query, router.query.chain]);
  return (
    <div className="rounded-2xl my-5 p-2  text-muted">
      <div className="flex flex-col md:flex-row gap-2 justify-between mb-2 pb-1 ">
        <h3 className="capitalize basis-full text-2xl font-mono text-blanc ">
          top collections
        </h3>
        <div className="basis-auto flex gap-2 mb-1 ">
          <input
            type="button"
            onClick={() => setQuery(1)}
            className={`cursor-pointer px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-muted hover:text-white ${
              query === 1 && "text-white"
            }`}
            value="1 Day"
          />
          <input
            type="button"
            onClick={() => setQuery(7)}
            className={`cursor-pointer px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-muted hover:text-white ${
              query === 7 && "text-white"
            }`}
            value="7 Days"
          />
          <input
            type="button"
            onClick={() => setQuery(30)}
            className={`cursor-pointer px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-muted hover:text-white ${
              query === 30 && "text-white"
            }`}
            value="30 Days"
          />
          {/* <input type="button" onClick={()=>setQuery(null)} className={`cursor-pointer ${query===null && "bg-black/25"} p-2 px-3 rounded-lg hover:bg-black/25`} value="All Time" /> */}
        </div>
      </div>
      <div
        className={`px-3 grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  `}
      >
        {list.map((sale, i) => (
          <div key={i} className="flex-1">
            <Card {...sale} router={router} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Top5;

/**
 * old design for the top5 sales
    <div className="rounded-2xl my-5 p-2 bg-noir text-[#85848b]">
            
            <div className="flex flex-col md:flex-row gap-2 justify-between mb-2 pb-1 border-b-2">
                <h3 className="capitalize basis-full text-2xl font-mono text-blanc ">top collections</h3>
                <div className="basis-auto flex gap-2 mb-1 ">
                    <input type="button" onClick={()=>setQuery(1)} className={`cursor-pointer ${query===1 && "bg-black/25"} p-2 px-3 rounded-lg hover:bg-black/25`} value="1 Day" />
                    <input type="button" onClick={()=>setQuery(7)} className={`cursor-pointer ${query===7 && "bg-black/25"} p-2 px-3 rounded-lg hover:bg-black/25`} value="7 Days" />
                    <input type="button" onClick={()=>setQuery(30)} className={`cursor-pointer ${query===30 && "bg-black/25"} p-2 px-3 rounded-lg hover:bg-black/25`} value="30 Days" />
                    {/* <input type="button" onClick={()=>setQuery(null)} className={`cursor-pointer ${query===null && "bg-black/25"} p-2 px-3 rounded-lg hover:bg-black/25`} value="All Time" /> /}
                    </div>
                    </div>
                    <div className={` px-2 mx-auto flex flex-col md:flex-row ${(list.length<=3 ? "justify-start  gap-x-10" : "justify-between" )}  `}>
                        {
                            list.map((sale,i) => (
                            <div key={i} className="text-lg basis-full md:basis-1/5 overflow-hidden flex flex-row md:flex-col items-center gap-2 p-2 rounded-lg hover:bg-black/25 cursor-pointer"> 
                                
                                <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center"><img src={sale.collectionImage} alt={sale.CollectionName} className="" /></div>
                                <div className="flex flex-col  w-full overflow-hidden">
                                    <span className="md:text-center text-lg truncate capitalize">{sale.CollectionName}</span>
                                    <div className="flex items-center justify-start md:justify-center gap-x-1">
                                        <span className="text-lg ">{(Math.round(sale.amountSum * 100) / 100).toFixed(2)} </span>
                                        {
                                            router.query.chain==="teritori"? 
                                                <span className="" ></span>
                                            :
                                                <CoinImage chain={router.query.chain} />
                                        }
                                    </div>
                                </div>
                            </div>))
        
                        }
                        
                        
                    </div>
                </div>
 */
