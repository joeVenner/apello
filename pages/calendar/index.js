import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import CalendarCard from "../../components/Cards/CalendarCard";
import { useAuthContext } from "../../hooks/useAuthContext";
import useAxios from "../../hooks/useAxios";

const Calendar = () => {
    
    const [query, setQuery] = useState("");
    const [ status, setStatus] = useState("upcoming");
    const [ chain, setChain] = useState("all chains");
    const toggleClick = e =>{
        console.log("test",e.target.textContent)
    }
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/calendar?${status==="upcoming" ? "upcoming= &" : "&"}name=${query}${chain!=="all chains" ? "&chain="+chain : ""}`;
    const { loading, error, data, getItems } = useAxios(url);
    useEffect(()=>{
        getItems(url);
    },[query,status, chain])
    //console.log(url, data)
    //search bar
    let timer;
    const handleChange = (e) => {
        e.preventDefault();
        if(timer){
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          setQuery(e.target.value);
        }, 1000);
    }
    return ( 
        <section className="container mx-auto pb-2" aria-label="calendar section">
            <div className="flex flex-col-reverse md:flex-row justify-between gap-3" aria-label="search fields">
                <div className="flex items-center gap-x-2 border border-[#2d2d2d] focus-within:border-[#8b949e] rounded-3xl w-full md:w-fit md:max-w-lg h-12 px-4 ">
                    <div className="flex items-center gap-x-2 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <input type="search" placeholder="Search" onChange={handleChange} className="bg-transparent w-full outline-none border-none" />

                    </div>
                    {/* chain select component */}
                    <div className="flex relative h-full  border-l border-[#2d2d2d] px-1 w-[200px] whitespace-nowrap ">
                        <button className="flex items-center gap-x-1 capitalize peer mx-auto" >
                            {chain}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#8b949e]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                        <div aria-label="drop_down" className={`hidden focus-within:!hidden peer-hover:block md:peer-focus:block hover:block bg-noir text-[#8b949e] overflow-visible w-auto absolute top-12 left-0 py-3 rounded shadow  z-20 `} >
                            <ul className="rounded flex flex-col gap-y-1">
                                <li className="py-2 px-4 text-lg capitalize whitespace-nowrap cursor-pointer rounded shadow-[inset_0_0_0_rgba(108,99,255,0.6)] transition-shadow duration-500 ease-linear hover:shadow-[inset_240.4px_0_0_rgba(108,99,255,0.99)] hover:text-white" onClick={e => setChain(e.target.textContent)}>all chains</li>
                                <li className="py-2 px-4 text-lg capitalize whitespace-nowrap cursor-pointer rounded shadow-[inset_0_0_0_rgba(108,99,255,0.6)] transition-shadow duration-500 ease-linear hover:shadow-[inset_240.4px_0_0_rgba(108,99,255,0.99)] hover:text-white" onClick={e => setChain(e.target.textContent)}>cosmoshub</li>
                                <li className="py-2 px-4 text-lg capitalize whitespace-nowrap cursor-pointer rounded shadow-[inset_0_0_0_rgba(108,99,255,0.6)] transition-shadow duration-500 ease-linear hover:shadow-[inset_240.4px_0_0_rgba(108,99,255,0.99)] hover:text-white" onClick={e => setChain(e.target.textContent)}>juno</li>
                                <li className="py-2 px-4 text-lg capitalize whitespace-nowrap cursor-pointer rounded shadow-[inset_0_0_0_rgba(108,99,255,0.6)] transition-shadow duration-500 ease-linear hover:shadow-[inset_240.4px_0_0_rgba(108,99,255,0.99)] hover:text-white" onClick={e => setChain(e.target.textContent)}>stargaze</li>
                                <li className="py-2 px-4 text-lg capitalize whitespace-nowrap cursor-pointer rounded shadow-[inset_0_0_0_rgba(108,99,255,0.6)] transition-shadow duration-500 ease-linear hover:shadow-[inset_240.4px_0_0_rgba(108,99,255,0.99)] hover:text-white" onClick={e => setChain(e.target.textContent)}>teritori</li>
                                <li className="py-2 px-4 text-lg capitalize whitespace-nowrap cursor-pointer rounded shadow-[inset_0_0_0_rgba(108,99,255,0.6)] transition-shadow duration-500 ease-linear hover:shadow-[inset_240.4px_0_0_rgba(108,99,255,0.99)] hover:text-white" onClick={e => setChain(e.target.textContent)}>terra</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex relative h-full border-l border-[#2d2d2d] pl-4 w-[200px]">
                        <button className="flex items-center gap-x-1 capitalize peer mx-auto" >
                            {status}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#8b949e]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                        <div aria-label="drop_down" className={`hidden focus-within:hidden peer-hover:block md:peer-focus:block hover:block bg-noir text-[#8b949e] overflow-visible w-auto absolute top-12 left-0 py-3 rounded shadow  z-20 `} >
                            <ul className="rounded flex flex-col gap-y-1">
                                <li className="py-2 px-4 text-lg capitalize whitespace-nowrap cursor-pointer rounded shadow-[inset_0_0_0_rgba(108,99,255,0.6)] transition-shadow duration-500 ease-linear hover:shadow-[inset_240.4px_0_0_rgba(108,99,255,0.99)] hover:text-white" onClick={e => setStatus(e.target.textContent)}>upcoming</li>
                                <li className="py-2 px-4 text-lg capitalize whitespace-nowrap cursor-pointer rounded shadow-[inset_0_0_0_rgba(108,99,255,0.6)] transition-shadow duration-500 ease-linear hover:shadow-[inset_240.4px_0_0_rgba(108,99,255,0.99)] hover:text-white" onClick={e => setStatus(e.target.textContent)}>live</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                

                
                
            </div>
            {/* loading data */}
            {
                loading && (<div className="inline-flex items-center m-4 mt-20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24" >
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" ></circle>
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" ></path>
                    </svg>
                Loading...</div> )
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

