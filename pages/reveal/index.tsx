import NFTHoverCard from "../../components/NFTHoverCard";
import { useAuthContext } from "../../hooks/useAuthContext";

const Apelleons = () => {
  const { wallet } = useAuthContext();

  if (!wallet || wallet?.type !== "stargaze") {
    return (
      <section className="m-10 mt-4">
        <div className="w-full flex flex-col items-center">
          <h1 className="text-center font-bold text-3xl mb-2">NFT Reveal</h1>
          <p className="text-center text-2xl mt-4 mb-8">
            Connect your Stargaze wallet
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="m-10 mt-4">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-center font-bold text-3xl mb-2">NFT Reveal</h1>
        <select
          className=" border text-md rounded-lg block w-full p-2.5 bg-gray-700 border-gray-500  text-white max-w-md"
          defaultValue="DEFAULT"
        >
          <option value="DEFAULT" disabled>
            Choose a collection
          </option>
          <option key="apelleons" value="apelleons">
            Apelleons
          </option>
        </select>

        <pre className="text-center text-2xl mt-4 mb-8">work in progress</pre>
        <div className="flex flex-wrap justify-center gap-4">
          <NFTHoverCard nftId={5} />
          <NFTHoverCard nftId={57} />
          <NFTHoverCard nftId={114} />
          <NFTHoverCard nftId={118} />
          <NFTHoverCard nftId={1425} />
          <NFTHoverCard nftId={3452} />
        </div>
      </div>
    </section>
  );
};

export default Apelleons;
