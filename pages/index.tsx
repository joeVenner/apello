import Image from "next/image";
import { useState } from "react";
import { FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";

import csx from "../lib/csx";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { CHAINS } from "../lib/chains";

const BotInviteURL = {
  TokenGating:
    "https://discord.com/api/oauth2/authorize?client_id=1047250675324690592&permissions=268527680&scope=bot",
  SalesTracking: "https://bit.ly/ApelloSalesTracker",
};

function InviteLink({ text, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={csx(
        "w-60 px-3 py-3",
        "bg-black rounded",
        "border-solid border-apello border-2",
        "text-base font-medium uppercase tracking-wide text-center text-white",
        "hover:cursor-pointer focus:outline-none focus-visible:ring-2 ring-blanc",
        "shadow-[inset_0_0_0_rgba(230,150,0,0.6)] ease-out duration-700",
        "hover:shadow-[inset_240px_0_0_rgba(230,150,0,1)]",
      )}
    >
      {text}
    </a>
  );
}

function InviteBotModal({ close }) {
  return (
    <Modal title="invite bot" isOpen={true} handleClose={close}>
      <div className="flex flex-col justify-between mx-auto">
        <div className="flex flex-col justify-center items-center py-8 gap-y-4 ">
          <InviteLink
            text="Apello Token Gating"
            href={BotInviteURL.TokenGating}
          />
          <InviteLink
            text="Apello Sales Tracker"
            href={BotInviteURL.SalesTracking}
          />
        </div>
      </div>
    </Modal>
  );
}

function Metric({ description, value }) {
  return (
    <div className="flex flex-col items-center justify-center m-4">
      <div className="text-2xl md:text-4xl font-bold">{value}</div>
      <div className="font-jura text-md md:text-2xl text-center leading-tight">
        {description}
      </div>
    </div>
  );
}

function Main() {
  const [botModalOpen, setBotModalOpen] = useState(false);

  return (
    <div
      className={csx(
        "relative flex flex-col items-center justify-center",
        "pb-16 overflow-hidden bg-fauxblack2",
        "border-b-2 border-bwhite",
      )}
    >
      <div
        className="relative my-6 md:mb-12 mt-6 md:mt-8 animate-bounce-float h-[30vh] w-[30vh] md:h-[35vh] md:w-[35vh]"
        style={{
          zIndex: 5,
          backgroundImage: "url(/apellodemotrans2.png)",
          backgroundSize: "cover",
        }}
      />
      <div
        className={csx(
          "text-center",
          "mb-3 text-3xl px-2 md:px-0 md:text-6xl tracking-wide",
          "font-bold uppercase drop-shadow-apello",
          "selection:bg-bleu selection:text-[#171819]",
        )}
      >
        Evolving The Cosmos
      </div>
      <p className="md:mb-2 text-center text-[#e5e5e5] font-jura text-xl md:text-3xl selection:bg-violet ">
        The Premier Toolkit for <b>Cosmos</b> NFT Communities
      </p>
      <div className="hidden flex flex-row md:mt-4">
        <Metric description="Servers Using Apello" value={42069} />
        <Metric description="Holders Verified" value={69420} />
      </div>
      <div className="flex flex-row mt-4 md:mt-8 gap-x-8 text-lg md:text-xl z-10">
        <Button onClick={() => setBotModalOpen(!botModalOpen)}>
          <span className="leading-8">Invite Apello</span>
          <Image
            className="h-[28px] w-[28px] md:h-[32px] md:w-[32px]"
            src="/discord-mark-white.svg"
            alt="discord"
            width={32}
            height={32}
          />
          <Image
            className="absolute h-[24px] w-[24px] md:w-auto md:h-auto top-[-14%] right-[-4%]"
            src="/4858-verified.png"
            alt="discord"
            width={28}
            height={28}
          />
        </Button>
      </div>
      {botModalOpen && <InviteBotModal close={() => setBotModalOpen(false)} />}
    </div>
  );
}

function ChainInfo({ chain }) {
  return (
    <div
      className={csx(
        "relative flex flex-col items-center justify-center gap-y-3",
        "text-md md:text-xl w-[60px] md:w-[100px]",
        !chain.supported && "opacity-60",
      )}
    >
      <div className={csx("relative", "hover:bottom-1")}>
        <Image
          className="h-[50px] w-[50px] md:h-[100px] md:w-[100px]"
          src={chain.icon}
          alt={chain.name}
          height={100}
          width={100}
        />
      </div>
      {chain.displayName}
      {!chain.supported && (
        <div
          className={csx(
            "absolute bottom-[-20px] md:bottom-[-24px] text-center whitespace-nowrap",
            "font-bold text-xs md:text-sm uppercase",
          )}
        >
          Coming Soon
        </div>
      )}
    </div>
  );
}

function SupportedChains() {
  return (
    <div
      className={csx(
        "relative flex flex-col items-center justify-center",
        "pb-16 overflow-hidden",
        "border-b border-bwhite",
      )}
    >
      <div
        className={csx(
          "text-center",
          "py-8 md:py-16 text-2xl md:text-4xl tracking-wide",
          "font-bold uppercase",
          "selection:bg-bleu selection:text-[#171819]",
        )}
      >
        Supported Chains
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-x-5 md:gap-x-5 gap-y-5 px-8">
        {CHAINS.map((c) => (
          <ChainInfo key={c.name} chain={c} />
        ))}
      </div>
    </div>
  );
}

function Link({ href, children }) {
  return (
    <a className={csx("text-apello hover:underline no-underline")} href={href}>
      {children}
    </a>
  );
}

function TokenGatingInfo() {
  return (
    <div
      className={csx(
        "relative flex flex-col md:flex-row items-center justify-center",
        "pb-8 px-12 overflow-hidden",
        "border-b-2 border-bwhite",
      )}
    >
      <Image
        src="/tokengatingbot.png"
        width={420}
        height={420}
        alt="Apello Token Gating"
        style={{ transform: "scaleX(-1)" }}
        className="h-[280px] w-[280px] md:h-[420px] md:w-[420px]"
      />
      <div
        className={csx(
          "relative mx-auto flex flex-col items-center justify-center basis-1/3",
        )}
      >
        <div
          className={csx(
            "text-center text-white",
            "mb-3 sm:mb-6 text-2xl md:text-3xl tracking-wide pb-2 px-4 pt-4 md:pt-8",
            "font-bold uppercase",
            "selection:bg-bleu selection:text-[#171819]",
            "border-b-4 border-apello",
          )}
        >
          Unlock Your Community
        </div>
        <div className="text-md md:text-lg">
          Apello&apos;s Token Gating Bot allows NFT holders to verify their
          holdings and automatically receive custom Discord roles based on rules
          that you configure. You can even link the bot to your{" "}
          <Link href="https://daodao.zone">DAO DAO</Link> and allow it to verify
          staked NFTs!
        </div>
      </div>
    </div>
  );
}

function SalesTrackerInfo() {
  return (
    <div
      className={csx(
        "relative flex flex-col-reverse md:flex-row items-center justify-center",
        "pb-8 pt-8 md:pt-0 px-16 overflow-hidden",
        "border-b-2 border-bwhite",
      )}
    >
      <div
        className={csx(
          "relative mx-auto flex flex-col items-center justify-center basis-1/3",
        )}
      >
        <div
          className={csx(
            "text-center text-white",
            "mb-3 mt-4 sm:mb-6 text-2xl md:text-3xl tracking-wide pb-2 px-4",
            "font-bold uppercase",
            "selection:bg-bleu selection:text-[#171819]",
            "border-b-4 border-apello",
          )}
        >
          Never Miss A Sale
        </div>
        <div className="text-md md:text-lg">
          Keep up with your collection&apos;s secondary market in realtime using
          Apello&apos;s Sales Tracker bot. Let it loose in one of your Discord
          channels and receive an automatic update every time one of your tokens
          is sold.
        </div>
      </div>
      <Image
        src="/auctioneer.png"
        width={420}
        height={420}
        alt="Apello Token Gating"
        className="relative h-[280px] w-[280px] md:h-[420px] md:w-[420px] md:bottom-[-64px]"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="flex flex-col align-center justify-center bg-fauxblack2">
      <div className="flex flex-col py-8">
        <div className="flex mb-6 font-bold text-xl justify-center">
          Join The Community
        </div>
        <div className="flex flex-row gap-x-6 justify-center pb-6">
          <a
            href="https://github.com/Apello-xyz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub
              className="transition duration-200 opacity-85 hover:opacity-100 hover:cursor-pointer"
              size={48}
            />
          </a>
          <a
            href="https://twitter.com/apelloxyz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter
              className="transition duration-200 opacity-85 hover:opacity-100 hover:cursor-pointer"
              size={48}
            />
          </a>
          <a
            href="https://discord.gg/caalabs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDiscord
              className="transition duration-200 opacity-85 hover:opacity-100 hover:cursor-pointer"
              size={48}
            />
          </a>
        </div>
        <div className="flex justify-center gap-y-2">
          <Link href="/apello_brand_assets.zip">Download Media Kit</Link>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <section className="flex flex-col">
        <Main />
      </section>
      <section className="flex flex-col">
        <TokenGatingInfo />
      </section>
      <section className="flex flex-col">
        <SalesTrackerInfo />
      </section>
      <section className="flex flex-col">
        <SupportedChains />
      </section>
      <Footer />
    </>
  );
}
