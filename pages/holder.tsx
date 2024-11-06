import Image from "next/image";

import ConnectButton from "../components/ConnectButton";
import Button from "../components/Button";
import csx from "../lib/csx";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDiscordConnection } from "../hooks/useDiscordConnection";
import * as DiscordAPI from "../interface/discord";

function VerifyStep({
  instruction,
  details = null,
  number,
  complete = false,
  children,
}) {
  return (
    <div
      className={csx(
        "flex flex-col border-y-2 md:border-2 md:rounded-xl my-2 border-bwhite",
        complete && "opacity-40",
      )}
    >
      <div className="flex text-2xl bg-fauxblack2 rounded-xl">
        <div className="flex justify-center items-center mr-4 py-2 px-6 rounded-l-xl border-r border-bwhite w-[60px]">
          {number}
        </div>
        <div className="flex flex-col w-full p-3 mb-2 md:mb-0">
          <div className="flex items-center flex-col md:flex-row">
            <div className="flex text-xl font-bold md:font-normal md:text-2xl md:mr-auto text-center items-center py-2">
              {instruction}
            </div>
            <div className="flex text-base">{children}</div>
          </div>
          {details && (
            <div className="px-2 pb-2 text-base md:text-lg">{details}</div>
          )}
        </div>
      </div>
    </div>
  );
}

function DiscordSummary({ account }) {
  return (
    <div className="flex items-center gap-x-4">
      <div className="text-lg">{account.globalName}</div>
      <Image
        className="rounded-md"
        src={DiscordAPI.avatarURL(account)}
        height={50}
        width={50}
        alt="Discord Avatar"
      />
    </div>
  );
}

function NFTRow({ ids }) {
  return (
    <div className="flex">
      {ids.map((id) => (
        <Image
          key={id}
          src={`/napejas/${id}.png`}
          height={80}
          width={80}
          alt={"Napejas"}
        />
      ))}
    </div>
  );
}

const HolderSection = () => {
  const { wallet } = useAuthContext();
  const discordAccount = useDiscordConnection();

  return (
    <section className="relative overflow-hidden flex flex-col items-center md:justify-center h-full grow md:py-16">
      <div className="hidden md:block" id="stars" />
      <div className="hidden md:block" id="stars2" />
      <div className="hidden md:block" id="stars3" />
      <div className="flex flex-col z-10 w-full md:w-[630px]">
        <div className="flex flex-col md:border-2 border-bwhite md:rounded-xl mb-2">
          <div className="bg-fauxblack2 flex tracking-wide flex-col items-center text-lg rounded-xl p-6 gap-y-2">
            <div className="text-center text-xl md:text-2xl font-bold">
              Welcome to Apello Token Gate
            </div>
            <div className="text-base md:text-lg text-center">
              Link your wallet and Discord account to verify your NFT holdings.
            </div>
          </div>
        </div>
        <div className="bg-fauxblack2 relative overflow-hidden flex flex-col md:border-2 border-bwhite md:rounded-xl mb-2h">
          <div className="flex tracking-wide flex-col items-center text-md rounded-xl p-6 gap-y-2 hidden md:flex">
            <div className="text-center md:text-left">
              Apello is an NFT community toolkit for Cosmos projects built by
              CAA Labs.{" "}
              <a
                className="text-apello hover:underline hover:opacity-90 cursor-pointer"
                href="https://apello.xyz"
              >
                Check out
              </a>{" "}
              our tools,{" "}
              <a
                className="text-apello hover:underline hover:opacity-90 cursor-pointer"
                href="https://discord.gg/caalabs"
              >
                join
              </a>{" "}
              our community, or support our project via donations! 
              <a
                className="text-apello hover:underline hover:opacity-90 cursor-pointer"
                href="https://use.apello.xyz/apello/donate/donation"
              >
                join
              </a>{" "}
             
            </div>
          </div>
          <div className="pb-4 flex justify-center gap-x-5 hidden md:flex">
            <a
              href="https://injective.talis.art/collection/65e75806add77a2a935e81e2"
              className="flex gap-x-2 text-apello hover:underline hover:opacity-90 cursor-pointer"
            >
              Napejas
              <Image
                src="/chains/injective.svg"
                height={20}
                width={20}
                alt="Injective"
              />
            </a>
            <a
              href="https://www.stargaze.zone/m/stars1yrpjz5cu5vemal70p686jk6cyj8aktuz8qkcg7xvvlalr90pxhqqvc4zy9/tokens"
              className="flex gap-x-2 text-apello hover:underline hover:opacity-90 cursor-pointer"
            >
              Cosmos Apes
              <Image
                src="/chains/stargaze.svg"
                height={20}
                width={20}
                alt="Injective"
              />
            </a>
          </div>
          <div className="text-center text-sm italic mb-4">
            (Want to advertise your project here? Open a ticket on{" "}
            <a
              className="text-apello hover:underline hover:opacity-90 cursor-pointer"
              href="https://discord.gg/caalabs"
            >
              our Discord
            </a>
            .)
          </div>
        </div>

        <VerifyStep
          instruction="Connect Wallet"
          number={1}
          complete={Boolean(wallet)}
        >
          <ConnectButton
            hideDisconnect
            color={Boolean(wallet) ? "green" : "apello"}
          >
            {wallet ? "✓" : "Connect"}
          </ConnectButton>
        </VerifyStep>
        {wallet && (
          <VerifyStep
            instruction="Connect Discord"
            number={2}
            complete={Boolean(discordAccount)}
          >
            {discordAccount ? (
              <DiscordSummary account={discordAccount} />
            ) : (
              <Button variant="outline" onClick={() => DiscordAPI.authorize()}>
                Connect
              </Button>
            )}
          </VerifyStep>
        )}
        {wallet && discordAccount && (
          <VerifyStep
            instruction="Your wallet has been linked!"
            number={3}
            details={
              <div className="pt-2">
                To finish receiving your roles:
                <ul className="list-disc mx-8">
                  <li className="py-3 md:py-2">
                    Return to your community&#39;s holder verification channel
                  </li>
                    <li className="pb-2">
                    Click
                    <a href="https://discord.gg/caalabs">
                      <span className="bg-green mx-2 p-2 px-4 rounded-md text-sm uppercase">
                        &#128273;&nbsp;&nbsp; Verify
                      </span>
                    </a>
                  </li>
                  
                </ul>
              </div>
            }
          >
            {false}
          </VerifyStep>
        )}
      </div>
    </section>
  );
};

export default HolderSection;
