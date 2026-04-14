import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import SalesCard from "../components/Cards/SalesCard";
import Top5 from "../components/Top5";
import SearchBar from "../components/SearchBar";
import Skeleton from "../components/Skeleton";
import useAxios from "../hooks/useAxios";
import useFetch from "../hooks/useFetch";
import TopSale from "../components/Cards/TopSale";
import SalesCardGrid from "../components/Cards/SalesCardGrid";

const GridView = ({ list, lastElemet, query, chain }) =>
  list && (
    <div class="w-full px-5 py-2 grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 4xl:grid-cols-6">
      <TopSale query={query} chain={chain} />
      {list?.map((sale, i) =>
        list.length === i + 1 ? (
          <div key={i} className="" ref={lastElemet}>
            <SalesCardGrid {...sale} />
          </div>
        ) : (
          <div key={i} className="">
            <SalesCardGrid {...sale} />
          </div>
        )
      )}
    </div>
  );

const ListView = ({ list, lastElemet }) =>
  list && (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl my-2">
      {list?.map((sale, i) =>
        list.length === i + 1 ? (
          <div key={i} className="" ref={lastElemet}>
            <SalesCard {...sale} />
          </div>
        ) : (
          <div key={i} className="">
            <SalesCard {...sale} />
            <div className="border-t border-white/5" />
          </div>
        )
      )}
    </div>
  );

const Sales = () => {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const router = useRouter();
  // for the top5 sales collections and the top sale
  const [queryDay, setDayQuery] = useState(7);
  const { loading, error, list, hasMore, sendQuery } = useFetch(
    "sales/search",
    query,
    pageNumber,
    router.query.chain && `&chain=${router.query.chain}`
  );
  //console.log("rerender",list,pageNumber)
  //create a useeffect for the page initaialisation after the changing the chain
  useEffect(() => {
    setPageNumber(0);
  }, [router.query.chain]);
  //console.log("pageNumber",pageNumber)

  //to reference the last element on the infinite scroll
  const observer = useRef();

  //the ref that we declared on the last element will attach that last node as an argument to the lastelement
  const lastElemet = useCallback(
    (node) => {
      //if it's fetching new data and it's loading we don't need to do anything
      if (loading) return;
      //if it's already observing anything then we disconnect from it to observe the new node which has been loaded recently
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        //entries contain all the things that we're observing, in this case we are just observing one element which is the last element
        //it's always going to be an array of nodes an array of all the things that we're observing
        //console.log('observing',entries)
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1);
        }
      });
      //to observe
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  const [isGrid, setGrid] = useState(true);

  // border-b-2 last:border-b-0
  return (
    <section
      className="h-full w-full px-7 md:px-[10%] "
      aria-label="tracking sales transactions"
    >
      <Top5 query={queryDay} setQuery={setDayQuery} />

      <div className="flex justify-between items-end md:items-center mb-5">
        <div className="flex flex-col-reverse md:flex-row gap-1 md:gap-3">
          {/* capitalize font-mono font-semibold text-2xl */}
          <h1 className="capitalize basis-full text-2xl font-mono text-blanc ">
            sales feed
          </h1>
          {/* here the user can select the card's type(grid/list)  */}
          <div className="inline-flex" aria-label="grid/list buttons">
            <button
              className={`p-1.5 rounded-l text-muted hover:text-white transition-colors ${
                isGrid ? "bg-violet text-white" : "bg-white/5 hover:bg-white/10"
              }`}
              onClick={() => setGrid(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                />
              </svg>
            </button>
            <button
              className={`p-1.5 rounded-r text-muted hover:text-white transition-colors ${
                isGrid === false ? "bg-violet text-white" : "bg-white/5 hover:bg-white/10"
              }`}
              onClick={() => setGrid(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                />
              </svg>
            </button>
          </div>
        </div>
        <SearchBar
          placeholder="Collection Name"
          value={query}
          onChange={(val) => { setQuery(val); setPageNumber(0); }}
          className="max-w-[40%]"
        />
      </div>
      {isGrid ? (
        <GridView
          query={queryDay}
          chain={router.query.chain}
          list={list}
          lastElemet={lastElemet}
        />
      ) : (
        <ListView list={list} lastElemet={lastElemet} />
      )}

      {loading && (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 p-5">
          <Skeleton variant="card" />
          <Skeleton variant="card" />
          <Skeleton variant="card" />
          <Skeleton variant="card" />
        </div>
      )}
    </section>
  );
};

export default Sales;
