import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

export const coinName = (chain, token) => chain === "stargaze" ? "Stars" : chain === "juno" ? "Usdc" : chain === "passage" ? "Pasg" : chain === "injective" ? "Inj" : chain === "chihuahua" ? "HuaHua": chain === "archway" ? "Arch": chain === "teritori" && token === "Tori" ? "Tori" : "Atom"

const SalesCardGrid = ({amount, buyer, chain, contract, createdAt, nftID, transactionID, CollectionName, collectionImage, nftImage}) => {
    // console.log(createdAt);
    return ( 
        
            <div className="h-full flex flex-col border border-noir rounded-lg overflow-hidden text-white-1 bg-noir transition-transform hover:scale-[1.02]">
                <div className="relative w-full overflow-hidden flex items-center justify-center aspect-square">
                    <div className="relative flex items-center justify-center w-full h-full rounded-[6px] overflow-hidden">
                        <img src={(nftImage && (CollectionName!=='rektbulls' && !CollectionName.includes("levana"))) ? nftImage : collectionImage} alt="Kirin Labs image" loading="lazy" className="aspect-square object-contain w-full h-full rounded-[6px] overflow-hidden" />
                    </div>
                    
                </div>
                <div className="p-3 flex-grow flex-shrink-0 flex flex-col justify-between">
                    <div className="flex items-center">
                        <span className="inline truncate font-bold">{`${CollectionName ? CollectionName : ''} # ${nftID?.replace(' Tori','').replace(' Atom','')}` }</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 12" className="my-auto ml-1 min-w-[12px]"  width="12" height="12" size="12"><path fill="#6C63FF" fill-rule="evenodd" d="M5.655.33a.5.5 0 01.69 0l.492.469a.5.5 0 00.514.109l.64-.229a.5.5 0 01.63.28l.26.63a.5.5 0 00.424.308l.678.052a.5.5 0 01.462.513l-.02.68a.5.5 0 00.263.454l.599.323a.5.5 0 01.213.657l-.294.613a.5.5 0 00.054.522l.416.539a.5.5 0 01-.072.686l-.519.44a.5.5 0 00-.162.5l.16.66a.5.5 0 01-.345.598l-.652.192a.5.5 0 00-.351.39l-.123.669a.5.5 0 01-.558.406l-.674-.09a.5.5 0 00-.48.213l-.383.561a.5.5 0 01-.676.144l-.579-.357a.5.5 0 00-.524 0l-.58.357a.5.5 0 01-.675-.144l-.383-.561a.5.5 0 00-.48-.214l-.674.09a.5.5 0 01-.558-.405l-.123-.67a.5.5 0 00-.35-.39l-.653-.19a.5.5 0 01-.346-.598l.16-.662a.5.5 0 00-.161-.499l-.519-.44a.5.5 0 01-.072-.686l.416-.54a.5.5 0 00.055-.52L.5 4.575a.5.5 0 01.213-.657l.6-.323a.5.5 0 00.261-.454l-.02-.68a.5.5 0 01.463-.513l.678-.052a.5.5 0 00.424-.308l.26-.63a.5.5 0 01.63-.28l.64.229a.5.5 0 00.514-.11L5.655.33z"></path><g clip-path="url(#clip0_1538_39894)"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M8.5 4.5L5.062 7.938 3.5 6.375"></path></g><defs></defs></svg>
                    </div>
                    <p className="text-[#85848b] whitespace-nowrap">{formatDistanceToNowStrict(new Date(createdAt), { addSuffix: true })}</p>
                    <div className="flex flex-col sm:flex-row items-start justify-start sm:justify-between sm:items-center gap-2 mt-1">
                        <span className="">{`${(Math.round(amount * 100) / 100).toFixed(2)} $${coinName(chain, nftID?.split(" ")[1])}`}</span>
                        <a className="rounded-md text-xs md:text-sm hover:opacity-80 bg-noir  transition-all  my-1  p-1 border-[1px] border-violet mr-auto" href={`https://www.mintscan.io/${chain}/txs/${transactionID}`} target="_blank" rel="noreferrer">Details</a>
                        
                            {/* <div className="flex-shrink-0 py-1 px-2 rounded text-sm bg-violet/40">
                                <div className="first-letter:uppercase lowercase">
                                    <span>Sold out</span>
                                </div>
                            </div> */}
                            
                            {/* <div className="flex-shrink-0 py-1 px-2 rounded text-sm bg-violet">
                                <div className="flex items-center space-x-1">
                                    <svg width="12" height="12" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg" size="12"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.03053 5.075C1.0497 5.05192 1.07287 5.03339 1.09864 5.0205C1.12442 5.00762 1.15227 5.00064 1.18053 5H5.89344C5.9134 5.00031 5.93281 5.00702 5.9494 5.01931C5.966 5.03161 5.97905 5.04897 5.98698 5.0693C5.99491 5.08964 5.99738 5.11208 5.99407 5.13394C5.9908 5.15579 5.98192 5.17613 5.96847 5.1925L4.96947 6.425C4.9503 6.44807 4.92713 6.46661 4.90135 6.4795C4.87558 6.49239 4.84773 6.49936 4.81947 6.5H0.103541C0.0836005 6.49969 0.0641653 6.49298 0.0475735 6.48069C0.0309822 6.46839 0.0179408 6.45103 0.0100181 6.4307C0.00209544 6.41036 -0.000371092 6.38792 0.00291498 6.36606C0.00620106 6.34421 0.0151002 6.32387 0.0285421 6.3075L1.03053 5.075ZM5.97297 4.05333C5.98642 4.0697 5.9953 4.09004 5.99857 4.11189C6.00188 4.13375 5.99941 4.15619 5.99148 4.17653C5.98355 4.19687 5.9705 4.21423 5.9539 4.22652C5.93731 4.23881 5.9179 4.24552 5.89794 4.24583L1.18352 4.25C1.15527 4.24936 1.12742 4.24239 1.10164 4.2295C1.07587 4.21661 1.0527 4.19807 1.03353 4.175L0.0270419 2.94667C0.0136006 2.9303 0.00470146 2.90996 0.00141482 2.88811C-0.00187126 2.86625 0.000595274 2.84381 0.00851797 2.82347C0.0164407 2.80313 0.029482 2.78578 0.0460739 2.77348C0.0626651 2.76119 0.0821003 2.75448 0.102041 2.75417L4.81647 2.75C4.84473 2.75064 4.87258 2.75761 4.89835 2.7705C4.92413 2.78339 4.9473 2.80192 4.96647 2.825L5.97297 4.05333ZM1.03053 0.575C1.0497 0.551926 1.07287 0.53339 1.09864 0.520503C1.12442 0.507616 1.15227 0.500642 1.18053 0.5L5.89647 0.504167C5.91639 0.504479 5.93585 0.511185 5.95244 0.52348C5.96904 0.535775 5.98209 0.553134 5.98996 0.573469C5.99789 0.593804 6.00037 0.61625 5.9971 0.638106C5.99378 0.659962 5.9849 0.680297 5.97145 0.696667L4.96947 1.925C4.9503 1.94807 4.92713 1.96661 4.90135 1.9795C4.87558 1.99239 4.84773 1.99936 4.81947 2H0.103541C0.0836005 1.99969 0.0641653 1.99298 0.0475735 1.98069C0.0309822 1.96839 0.0179408 1.95103 0.0100181 1.9307C0.00209544 1.91036 -0.000371092 1.88792 0.00291498 1.86606C0.00620106 1.84421 0.0151002 1.82387 0.0285421 1.8075L1.03053 0.575Z" fill="url(#solana-slim-icon-linear)"></path></svg>
                                    <span>3.30</span>
                                </div>
                            </div> */}
                        
                    </div>
                </div>
            </div>
        
     );
}
 
export default SalesCardGrid;
