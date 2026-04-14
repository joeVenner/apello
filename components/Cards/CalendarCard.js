import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import GlassCard from "../GlassCard";

//
export const Chain = ({name}) => {
    let chainUrl;
    switch(name) {
        case 'terra':
            chainUrl = "/terra_station.png";
            break;
        case 'cosmoshub':
            chainUrl = "https://raw.githubusercontent.com/cosmostation/chainlist/master/chain/cosmoshub/chainImg/logoImg/chainImg.svg";
            break;
        case 'juno':
            chainUrl = "https://raw.githubusercontent.com/cosmostation/chainlist/master/chain/juno/chainImg/logoImg/chainImg.svg";
            break;
        case 'stargaze':
            chainUrl = "https://raw.githubusercontent.com/cosmostation/chainlist/master/chain/stargaze/chainImg/logoImg/chainImg.svg";
            break;
        case 'teritori':
            chainUrl = "https://raw.githubusercontent.com/cosmostation/chainlist/master/chain/teritori/chainImg/logoImg/chainImg.svg";
            break;
        default:
            chainUrl = "/terra_station.png";
    }

    return ( <Image height="32" width="32" src={"/chains/"+name+".png"} className="h-8" alt={name} />)
}

export const Token = ({name}) => {
    return ( <Image height="24" width="24" src={"/tokens/"+name+".png"} className="h-6" alt={name} />)
}

const CalendarCard = ({collectionName, collectionSize, collectionImage, mintPrice, mintDate, chain, mintToken, discordLink, twitterLink, websiteLink}) => {
    return ( 
        <GlassCard className="text-center max-w-full cursor-pointer" hover={true}>
            <div className="relative mb-1">
                <img  src={collectionImage} alt="collection profile" className={`h-[265px] w-full`} />
                <div className="relative px-1 -top-4 w-fit mx-auto ">
                    <Chain name={chain} />
                </div>
                <div className="absolute left-0 top-4 z-10 flex flex-col gap-y-2 text-muted " aria-label="social media section">
                    <a href={twitterLink} target="_blank" rel="noopener noreferrer" className="px-1 "><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="20" viewBox="0 0 256 256" ><path fill="none" d="M0 0H256V256H0z"></path><path d="M245.7 77.7l-30.2 30.1c-6 69.9-65 124.2-135.5 124.2-14.5 0-26.5-2.3-35.6-6.8-7.3-3.7-10.3-7.6-11.1-8.8a8 8 0 013.9-11.9c.2-.1 23.8-9.1 39.1-26.4a108.6 108.6 0 01-24.7-24.4c-13.7-18.6-28.2-50.9-19.5-99.1a8.1 8.1 0 015.5-6.2 8 8 0 018.1 1.9c.3.4 33.6 33.2 74.3 43.8V88a48.3 48.3 0 0148.6-48 48.2 48.2 0 0141 24H240a8 8 0 017.4 4.9 8.4 8.4 0 01-1.7 8.8z"></path></svg></a>
                    <a href={discordLink} target="_blank" rel="noopener noreferrer" className="px-1"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="20" viewBox="0 0 256 256" > <path fill="none" d="M0 0H256V256H0z"></path><path d="M247.3 169.8l-34-113.2a15.6 15.6 0 00-9.2-10.2h-.6l.6-.2A192.4 192.4 0 00169.6 36a8 8 0 00-9.4 6.3 7.9 7.9 0 006.2 9.4c4.5.9 8.9 2 13.2 3.2A8 8 0 01176 70h-.8a185.4 185.4 0 00-47.2-6 181.8 181.8 0 00-46.1 5.8 8 8 0 01-5.6-14.9h.1c4.3-1.2 8.7-2.3 13.2-3.2a8 8 0 006.3-9.4 8.1 8.1 0 00-9.4-6.3 191.2 191.2 0 00-34.6 10.4 15.6 15.6 0 00-9.2 10.2l-34 113.2a16 16 0 004.9 16.7 34.7 34.7 0 002.9 2.5h.1c16.2 13.2 37.5 23.3 61.5 29.1a6.3 6.3 0 001.9.3 8 8 0 001.9-15.8 160.3 160.3 0 01-31.3-11.1 8 8 0 018.6-13.2c19 8.4 42.9 13.7 68.8 13.7s49.8-5.3 68.8-13.7a8 8 0 018.6 13.2 160.3 160.3 0 01-31.3 11.1 8 8 0 001.9 15.8 6.3 6.3 0 001.9-.3c24-5.8 45.3-15.9 61.5-29.1h.1a34.7 34.7 0 002.9-2.5 16 16 0 004.9-16.7zM96 156a12 12 0 1112-12 12 12 0 01-12 12zm64 0a12 12 0 1112-12 12 12 0 01-12 12z"></path></svg></a>
                    <a href={websiteLink} target="_blank" rel="noopener noreferrer" className="px-1 "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg></a>
                    
                </div>
            </div>
            <h5 className="text-white font-bold px-5 capitalize truncate ">{collectionName}</h5>
            <span className="block text-violet font-light px-5 truncate ">{formatDistanceToNowStrict(new Date(mintDate), { addSuffix: true })}</span>
            <div className="flex gap-x-2 justify-between capitalize p-2">
                <div className="flex items-center justify-center gap-x-1 rounded  px-1 overflow-hidden">
                    <label htmlFor="collectionSize" className="">size: </label>
                    <span className="font-bold truncate">{collectionSize}</span>
                </div>
                <div className="flex items-center justify-center gap-x-1 rounded py-2 px-1 overflow-hidden">
                    <label htmlFor="collectionprice" className="">price: </label>
                    <span className="font-bold truncate">{mintPrice}</span>
                    <span className="">{mintToken}</span>
                </div>
            </div>
        </GlassCard>
     );
}
 
export default CalendarCard;