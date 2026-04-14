import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import CalendarCard from "../../components/Cards/CalendarCard";
import SearchBar from "../../components/SearchBar";
import Skeleton from "../../components/Skeleton";
import { useAuthContext } from "../../hooks/useAuthContext";
import useAxios from "../../hooks/useAxios";

const Calendar = () => {
    
    const [query, setQuery] = useState("");
    const [ status, setStatus] = useState("upcoming");
    const [ chain, setChain] = useState("all chains");
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/calendar?${status==="upcoming" ? "upcoming= &" : "&"}name=${query}${chain!=="all chains" ? "&chain="+chain : ""}`;
    const { loading, error, data, getItems } = useAxios(url);
    useEffect(()=>{
        getItems(url);
    },[query,status, chain])
    //console.log(url, data)
    return (
        <section className="container mx-auto pb-2" aria-label="calendar section">
            <div className="flex flex-col-reverse md:flex-row justify-between gap-3" aria-label="search fields">
                <div className="flex items-center gap-x-2 w-full md:w-fit md:max-w-lg">
                    <SearchBar placeholder="Search" value={query} onChange={setQuery} />
                    {/* chain select component */}
                    <div className="flex relative h-full border-l border-white/10 px-1 w-[200px] whitespace-nowrap">
                        <button className="flex items-center gap-x-1 capitalize peer mx-auto text-muted" >
                            {chain}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-muted">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                        <div aria-label="drop_down" className={`hidden focus-within:!hidden peer-hover:block md:peer-focus:block hover:block border border-white/10 bg-surface/90 backdrop-blur-xl text-muted overflow-visible w-auto absolute top-12 left-0 py-3 rounded-xl shadow-glass z-20`} >
                            <ul className="rounded flex flex-col gap-y-1">
                                <li className="py-2 px-4 text-lg capitalize whitespace-nowrap cursor-pointer rounded hover:bg-white/10 hover:text-white transition-colors duration-200" onClick={e => setChain(e.target.textContent)}>all chains</li>
                                <li className="py-2 px-4 text-lg capitalize whitespace-nowrap cursor-pointer rounded hover:bg-white/10 hover:text-white transition-colors duration-200" onClick={e => setChain(e.target.textContent)}>cosmoshub</li>
                                <li className="py-2 px-4 text-lg capitalize whitespace-nowrap cursor-pointer rounded hover:bg-white/10 hover:text-white transition-colors duration-200" onClick={e => setChain(e.target.textContent)}>juno</li>
                                <li className="py-2 px-4 text-lg capitalize whitespace-nowrap cursor-pointer rounded hover:bg-white/10 hover:text-white transition-colors duration-200" onClick={e => setChain(e.target.textContent)}>stargaze</li>
                                <li className="py-2 px-4 text-lg capitalize whitespace-nowrap cursor-pointer rounded hover:bg-white/10 hover:text-white transition-colors duration-200" onClick={e => setChain(e.target.textContent)}>teritori</li>
                                <li className="py-2 px-4 text-lg capitalize whitespace-nowrap cursor-pointer rounded hover:bg-white/10 hover:text-white transition-colors duration-200" onClick={e => setChain(e.target.textContent)}>terra</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex relative h-full border-l border-white/10 pl-4 w-[200px]">
                        <button className="flex items-center gap-x-1 capitalize peer mx-auto text-muted" >
                            {status}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-muted">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                        <div aria-label="drop_down" className={`hidden focus-within:hidden peer-hover:block md:peer-focus:block hover:block border border-white/10 bg-surface/90 backdrop-blur-xl text-muted overflow-visible w-auto absolute top-12 left-0 py-3 rounded-xl shadow-glass z-20`} >
                            <ul className="rounded flex flex-col gap-y-1">
                                <li className="py-2 px-4 text-lg capitalize whitespace-nowrap cursor-pointer rounded hover:bg-white/10 hover:text-white transition-colors duration-200" onClick={e => setStatus(e.target.textContent)}>upcoming</li>
                                <li className="py-2 px-4 text-lg capitalize whitespace-nowrap cursor-pointer rounded hover:bg-white/10 hover:text-white transition-colors duration-200" onClick={e => setStatus(e.target.textContent)}>live</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                

                
                
            </div>
            {/* loading data */}
            {
                loading && (<div className="grid grid-cols-mobile sm:grid-cols-[repeat(auto-fill,_minmax(269px,269px))] gap-5 place-content-center mt-10 px-3">
                    <Skeleton variant="card" />
                    <Skeleton variant="card" />
                    <Skeleton variant="card" />
                    <Skeleton variant="card" />
                </div>)
            }
            {/* empty data */}
            {
                (!loading && data.length === 0) &&
                <div className="w-full mx-auto mt-20">
                    no such elements
                </div>
            }
            <div className="mt-10 px-3">
                <div className="grid grid-cols-mobile sm:grid-cols-[repeat(auto-fill,_minmax(269px,269px))] gap-5 place-content-center">
                    {data.map(calendar => (
                        <CalendarCard key={calendar._id} {...calendar} />
                    ))}
                </div>
                
            </div>
        </section>
     );
}
 
export default Calendar;


/**
 * {
                    !wallet ?
                    (<div data-tip="Connect your wallet first." className="relative max-w-fit mx-auto md:mx-0 hover:disableSpan"> 
                        <button disabled className="flex items-center h-full disabled:cursor-not-allowed max-w-fit bg-black rounded-3xl text-base font-medium capitalize tracking-wide text-center border-solid border-[#2d2d2d] border text-white px-2 py-2" >add collection</button>
                    </div>)
                    : <Link href='/calendar/create' className="flex items-center mx-auto md:mx-0 max-w-fit bg-black rounded-3xl text-base font-medium capitalize tracking-wide text-center text-white px-2 py-2  hover:cursor-pointer focus:outline-none focus-visible:ring-2 ring-blanc shadow-[inset_0_0_0_rgba(108,99,255,0.6)] ease-out duration-500 hover:shadow-[inset_130px_0_0_rgba(108,99,255,0.99)] border-solid border-[#2d2d2d] border">add collection</Link>
                }
 */

