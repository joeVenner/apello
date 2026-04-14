import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../hooks/useAuthContext";

// eslint-disable-next-line react/display-name
const Select = React.forwardRef(({ onChange, onBlur, name, label, options }, ref) => (
    <>
      <label>{label}</label>
      <select className="w-full cursor-pointer bg-gray-100 border border-gray-300 p-2 rounded focus:border-blue-500 focus:bg-white placeholder-gray-400" name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
        {
            options.map((option, index) => (<option key={index} value={option}>{option}</option>))
        }
      </select>
    </>
  ));

const AddNewCalendar = () => {
    const { register,
        handleSubmit,
        formState: { errors, isValid } 
    } = useForm({mode: "all"});
    //for the steper form
    const [step, setStep] = useState(0)

    const router = useRouter();
    const { wallet, token } = useAuthContext();
    //to runs it only on the client site i'll use useeffect
    useEffect(() => {
        if(!wallet || !token){
            router.push("/calendar");
        }
    },[])

    //form submit
    const onSubmit = async(data) => {
        try{
            const calendarObject = {
                collectionName: data["Collection name"]?.toLowerCase(), 
                collectionSize: data["Collection size"]?.toLowerCase(),
                collectionImage: data["Collection image"],
                //wallet: wallet._id, 
                mintPrice: data["Mint price"],
                mintDate: data["Mint date"], 
                chain: data["chain"]?.toLowerCase(), 
                mintToken: data["mintToken"]?.toLowerCase(), 
                discordLink: data["Discord link"], 
                twitterLink: data["Twitter link"],
                websiteLink: data["Website link"], 
            };
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/calendar`, 
                calendarObject,{
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            }); 
            if(response.data){
                router.push("/calendar");
                //console.log(response.data);
            }
        }catch(err){
            console.log("err",err)
        }
    }
    //console.log(register)

    /** Input field component */
    const Input = ({label, required, type, placeholder, name}) => (
        <div className="relative">
            <legend className="mt-2 text-gray-700">{label}</legend>
            <input name={name} {...register(label, { required })}
                className={`${errors[label] && "border !border-red-400"} w-full bg-gray-100 border border-gray-300 p-2 rounded focus:border-blue-500 focus:bg-white placeholder-gray-400`}
                type={type} placeholder={placeholder}   
            />
            { errors[label] && <span className="absolute right-0 -bottom-5 text-red-400 text-xs">mandatory</span> }
        </div>
    )

    /** Group the collection input fields in a component */
    const CollectionFields = () =>(
        <section className="flex flex-col gap-1 mb-8">
            <h3 className="text-lg capitalize text-violet">Collection information</h3>
            <Input label="Collection name" required type="text" placeholder="Type your collection name"/>
            <Input label="Collection size" required type="text" placeholder="Ex: 150"/>
            <Input label="Collection image" required type="text" placeholder="your collection's image url "/>
        </section>
    )
    /** Group the mint input fields in a component */
    const MintFields = () =>(
        <section className="flex flex-col gap-1 mb-8">
            <h3 className="text-violet">Mint information</h3>
            <Input label="Mint price" type="number" placeholder="Type your collection mint price"/>
            <Input label="Mint date" required type="datetime-local" placeholder="dd/mm/aaa"/>
            <Select label="Mint token" {...register("mintToken")} options={["Juno","USDC", "Stars", "Luna", "Tori", "Atom"]} required/>
            <Select label="Mint chain" {...register("chain")} required  options={["Juno","Stargaze", "Terra", "Teritori", "Cosmos"]} />
        </section>
    )
    /** Group the collection input fields in a component */
    const LinkFields = () =>(
        <section className="flex flex-col gap-1 mb-8">
            <h3 className="text-violet">Collection information</h3>
            <Input label="Discord link" type="text" placeholder="discord link"/>
            <Input label="Twitter link" type="text" placeholder="twitter link"/>
            <Input label="Website link" type="text" placeholder="your website link "/>
        </section>
    )
    
    /** Navigation between steps */
    const Arrow = ({direction}) => { 
        return direction.toLowerCase() === "right" ? 
            (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>):
            (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>)
    }
    const Navigation = () =>(
        <section className="w-full justify-between mt-4 flex flex-row-reverse">
          { 
            step === fieldGroups.length-1 &&
            <button type="submit" className="py-3 px-5 bg-blue-700 text-blue-100 rounded text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed" disabled={!isValid}>
                SAVE
            </button>
          }
          {
            step < fieldGroups.length-1 &&
            <button type="button" className="flex flex-row items-center text-xs font-bold bg-blue-100 rounded py-2 px-3 text-blue-600 flex-row-reverse disabled:opacity-40 disabled:cursor-not-allowed" disabled={!isValid} onClick={()=>{setStep(step+1)}}>
                <Arrow direction="right" />
                NEXT
            </button>
          }
          {
            step > 0 &&
            <button type="button" className="flex flex-row items-center text-xs font-bold bg-gray-100 text-gray-400 rounded py-2 px-3" onClick={()=>{setStep(step-1)}}>
            <Arrow direction="left" />
                BACK
            </button>
          }
        </section>
    )

    /** Mark the input group already filled as blue or gray if not */
    const Reference = () =>(
        <footer className=" w-full flex items-center justify-center gap-1 py-4">
            {renderMarkers()}
        </footer>
    )
    function renderMarkers(){
        let markers = []
        for(let i=0; i<fieldGroups.length; i++)
          markers.push(<span key={i} className={`rounded-full w-2 h-2 ${step >= i ? "bg-blue-600" : "bg-gray-300"}`} />)
        return markers
    }

    

    const fieldGroups =[
        <CollectionFields key="0"/>,
        <MintFields key="1"/>,
        <LinkFields key="2"/>
    ]

    
    return ( 
        <div className="">
            <Head>
                <title>Add your collection</title>
            </Head>
            <main className="min-h-[calc(100vh-80px)] w-full font-roboto py-6 flex flex-col justify-center items-center sm:py-12">
                <form className="bg-white text-noir p-8 w-11/12 md:w-1/2 lg:w-2/5 shadow-sm" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-xl font-bold mb-4">Add your collection</h2>
                {fieldGroups[step]}
                <Navigation/>
                <Reference/>
                </form>
            </main>
        </div>
     );
}
 
export default AddNewCalendar;