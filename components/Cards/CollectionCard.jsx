import  Link  from 'next/link';
import GlassCard from '../GlassCard';

const CollectionCard = ({collectionInfo}) => {

    //console.log("infos",collectionInfo)

    return ( 
        <div className="pl-4 grow-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 max-w-full sm:max-w-[50%] md:max-w-[33.3333%] lg:max-w-[25%]  flex  " aria-label='collection card'>

            { collectionInfo && <Link href={
                    {   pathname: `/rarity/${collectionInfo.symbol}`,
                        query: collectionInfo 
            }} as={`/rarity/${collectionInfo.symbol}`}   className='w-full' >
                <GlassCard className="flex flex-col" hover={true}>
                <img  src={collectionInfo.coverImageUrl} alt="collection profile" className={`h-48 object-cover object-center transition-transform duration-300 hover:scale-110  `} />
                    
                    <div className="relative flex justify-center pb-11">
                        <img src={collectionInfo.imageUrl} alt="collection profile" className={`absolute -top-11 h-[88px] w-[88px] border-2 border-white/20  rounded-2xl object-cover object-center `} />
                            
                    </div>
                    <div className='py-2 flex justify-center '>
                        <h2 className="font-jura text-lg truncate px-2">{collectionInfo.name}</h2>
                    </div>
                </GlassCard>
            </Link>}
        </div>
     );
}
 
export default CollectionCard;