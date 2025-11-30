// searching a nft inside a collection 

import { useCallback, useEffect, useState } from "react";
import { useRouter } from 'next/router'
import axios from "axios";
//import "../../styles/nfts.css";

const NftSection = (props) => {
    
    const router = useRouter()
    //get the data passed in the link
    const [collectionInfo, setcollectionInfo] = useState([]);
    const getcollectionInfo  = useCallback(() => {
        
        if(router.query.imageUrl){
            return setcollectionInfo(router.query) ;
        }
        
    }, []);
    
    
    
   
    //get the collection name from the route parameter
    const { db_name } = router.query;
    //console.log(db_name)
    //create a state that will contain the collection nfts
    const [nfts, setnfts] = useState(null);

    //
    const [number, setNumber] = useState(null);
    const [rank, setRank] = useState(null);
    //useeffect that will fetch the collection and store it on a local state
    useEffect(() => {
        //call the callback function to setcollectionInfo if the router query contains it
        getcollectionInfo();

        const fetchCollection = async ()=> {
          const response = await axios.get(`https://api.apello.org/api/nfts/${db_name}`);
          const {data, collectInfo} = response.data;
          
            
          if(response.status===200){
            setnfts(data);
            setcollectionInfo(collectInfo) ;
            
            //console.log(data,collectionInfo)
            
          }
        }
        fetchCollection();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [nftObj, setNftObj] = useState(null);
    const goClick = ()=>{
        
        if(nfts && number){
            
            setNftObj(nfts.find(nft =>{
                return parseInt(nft.ID) === parseInt(number);
            }));
            //console.log(nftObj.length);
        }
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          // 👇 Get input value
          goClick();
        }
      };
        //<img alt="nft" src={nftObj?.Pic || collectionInfo.imageUrl} className="w-full h-full rounded-3xl outline-none border-4 border-violet object-cover object-center " />
    return ( 
        <section className="mx-auto mb-8 py-8 px-6 selection:bg-violet selection:text-noir " aria-label="the collection nfts">
            
            <div className="sm:max-w-lg lg:max-w-2xl w-full mx-auto px-4 flex flex-col items-center gap-x-8  " aria-label="nft's info">
                
                <div className="w-full flex flex-col">
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-4 text-base font-azonix" aria-label="search fields">
                        <div className="flex gap-x-1 w-full sm:w-4/5" aria-label="search by number">
                            <input type="text" placeholder="Search by ID" className="outline-none border-violet border-2 rounded-lg p-3 text-noir w-full" onKeyDown={handleKeyDown} onChange={(e)=>setNumber(e.target.value)}/>
                            <button className="bg-violet rounded-lg p-3 uppercase" onClick={goClick}>Go</button>
                        </div>
                        
                    </div>
                    <div className="bg-noir rounded-lg p-4 flex flex-col self-center w-full sm:w-4/5 outline-none border-2 border-violet">
                        <div className="flex justify-between flex-wrap">
                            <h4 className="font-medium text-2xl capitalize">{nftObj? collectionInfo.name+"#"+nftObj.ID :  "nft name"}</h4>
                            <span className="bg-violet rounded-xl whitespace-nowrap h-8 p-2 flex items-center font-medium">{nftObj? "Rank "+nftObj.Rank+" of "+collectionInfo.totalItem : "nft rank"}</span>
                        </div>
                        <h5 className="text-violet font-medium text-xl font-jura">{nftObj?.Network || "Chain name"}</h5>
                    </div>
                    

                </div>
                <div className="w-full sm:w-4/5 mt-4  ">
                    <div style={{backgroundImage : `url(${nftObj?.Pic || collectionInfo.imageUrl})`}} className="pt-[100%] rounded-3xl outline-none border-4 border-violet bg-cover bg-center "></div>
                </div>
                

            </div>
        </section>
     );
}
 
export default NftSection;

