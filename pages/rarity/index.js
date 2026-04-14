import { Fragment, useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import CollectionCard from "../../components/Cards/CollectionCard";
import SearchBar from "../../components/SearchBar";
import Skeleton from "../../components/Skeleton";
import useFetch from "../../hooks/useFetch";
import { useDebounce } from "../../hooks/useDebounce";

const RaritySection = () => {
  //page number
  const [pageNumber, setPageNumber] = useState(0);
  //filter by name
  const [searchInput, setSearchInput] = useState("");
  const query = useDebounce(searchInput, 1000);

  //call the useFetch hook
  const { loading, error, list , hasMore } = useFetch('collectionsInfo/search', query, pageNumber);

  //reset page number when debounced query changes
  useEffect(() => {
    setPageNumber(0);
  }, [query]);
  
  //to reference the last element on the infinite scroll
  const observer = useRef();

  //the ref that we declared on the last element will attach that last node as an argument to the lastelement
  const lastElemet = useCallback( (node) => {
    //if it's fetching new data and it's loading we don't need to do anything
    if(loading) return;
    //if it's already observing anything then we disconnect from it to observe the new node which has been loaded recently
    if(observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      //entries contain all the things that we're observing, in this case we are just observing one element which is the last element
      //it's always going to be an array of nodes an array of all the things that we're observing
      //console.log('observing',entries)
      if(entries[0].isIntersecting && hasMore){
        setPageNumber((prev) => prev+1);
      }

      
    });
    //to observe
    if(node) observer.current.observe(node);
  },[loading,hasMore]);
    
    //filter by blockchain
    const [blockchain, setBlockchain] = useState('All Chains');

    const selectChain = (e)=>{
      const value = e.target.getAttribute('value') || e.target.textContent;
      setBlockchain(value);
      setShow(false);
    }

    //reference the div to be hidden when clicking outside
    const ref = useRef(null);
    //show the select dropdown
    const [show,setShow] = useState(false);
    //click outside
    useEffect(() => {
      const handleClickOutside = (event)=>{
        if (ref.current && !ref.current.contains(event.target)) {
            setShow(false);
          }
      }
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    }, [show]);

    return ( 
        <section className=" m-10  ">
          <div className=" flex flex-col sm:flex-row gap-x-2 gap-y-2 justify-between mx-10 font-jura" aria-label="search fields ">
            <SearchBar
              placeholder="Collection Name"
              value={searchInput}
              onChange={(val) => { setSearchInput(val); if (!val) setPageNumber(0); }}
              className="max-w-md w-full"
            />

            <div className="relative ml-auto w-full sm:w-auto" aria-label="select blockchain filter">
              <button className={`flex justify-between items-center relative p-3 min-w-[150px] w-full sm:w-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl ${show && 'border-violet'} `} onClick={()=>setShow(!show)} >
                <span className="text-white">{blockchain}</span>
                <svg className="absolute top-[calc(50% - 0.5em)] right-1 text-muted" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="10" viewBox="0 0 256 256" > <path fill="none" d="M0 0H256V256H0z"></path> <path d="M215.4 92.9A8 8 0 00208 88H48a8 8 0 00-7.4 4.9 8.4 8.4 0 001.7 8.8l80 80a8.2 8.2 0 0011.4 0l80-80a8.4 8.4 0 001.7-8.8z"></path></svg>
              </button>
              {show && <div ref={ref} className="absolute top-full z-50 min-w-[150px] w-full sm:w-auto border border-white/10 bg-surface/90 backdrop-blur-xl rounded-xl shadow-glass">
                <ul className="py-2 text-muted" onClick={selectChain} >
                  <li  className="py-2 px-6 hover:bg-white/10 hover:text-white transition-colors duration-200 cursor-pointer select-none" value="All Chains" >All Chains</li>
                  <div  className="my-2 border-t border-white/5" />
                  <li  className="py-4 px-6 hover:bg-white/10 hover:text-white transition-colors duration-200 cursor-pointer select-none" value="Cosmos">Cosmos</li>
                  <li  className="py-4 px-6 hover:bg-white/10 hover:text-white transition-colors duration-200 cursor-pointer select-none" value="Terra">Terra</li>
                  <li className="py-4 px-6 hover:bg-white/10 hover:text-white transition-colors duration-200 cursor-pointer select-none" value="Stargaze">Stargaze</li>
                  <li className="py-4 px-6 hover:bg-white/10 hover:text-white transition-colors duration-200 cursor-pointer select-none" value="Juno">Juno</li>
                </ul>
              </div>}
            </div>
          </div>

          <div className="ml-[-16px] flex flex-wrap flex-row p-10  gap-y-3">
              {list && list.map((collection,i)=>{
                if( list.length === i+1 ){
                  return  (<Fragment key={i}>
                    <div  className="" ref={lastElemet}></div>
                    <CollectionCard  collectionInfo={collection}  />
                  </Fragment>);
                }
                else{
                  return  (<CollectionCard key={i} collectionInfo={collection}  />);
                }
              } )}
          </div>
            <div className="">{loading && (
              <div className="flex flex-wrap flex-row gap-y-3">
                <Skeleton variant="card" className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4" />
                <Skeleton variant="card" className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4" />
                <Skeleton variant="card" className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4" />
                <Skeleton variant="card" className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4" />
              </div>
            )}</div>
            <div className="">{error && `Error:${error}`}</div>
        </section>
     );
}
 
export default RaritySection;