import Image from "next/image";

import Button from "./Button";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { CHAINS, chainForWallet } from "../lib/chains";
import csx from "../lib/csx";
import useOutsideClick from "../hooks/useOutsideClick";

function displayAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function ChainOption({ chain, connect }) {
  return (
    <div
      className={csx(
        "flex gap-x-3 py-1",
        "cursor-pointer hover:text-apello transition duration-200",
      )}
      onClick={() => connect(chain.name.toLowerCase())}
    >
      <Image src={chain.icon} height={20} width={20} alt={chain.name} />
      {chain.displayName}
    </div>
  );
}

function ChainSelect({ connect, close, isMobileNav = false }) {
  const ref = useOutsideClick(close);

  return (
    <div
      ref={ref}
      className={csx(
        "flex flex-col z-50 bg-fauxblack py-4 pl-5 pr-[64px] md:pr-12",
        "text-xl",
        !isMobileNav && "rounded-xl",
        "border-l border-b border-bwhite",
        isMobileNav
          ? "fixed top-[0px] right-[0px]"
          : "fixed top-[70px] right-[4px]",
        // "top-[-16px] md:top-[70px] right-[-24px] md:right-[0px]",
        "animate-slide-from-right-mobile md:animate-slide-from-right",
      )}
    >
      {CHAINS.filter((x) => x.supported).map((chain) => (
        <ChainOption key={chain.name} chain={chain} connect={connect} />
      ))}
    </div>
  );
}

function WalletInfo({ wallet }) {
  
  return (
    <div className="flex gap-x-4">
      <Image
        src={chainForWallet(wallet).icon}
        width={20}
        height={20}
        alt={wallet.type}
      />
      {displayAddress(wallet.address)}
    </div>
  );
}

export default function ConnectButton({
  children,
  color,
  hideDisconnect = false,
  isMobileNav = false,
}: {
  children?: React.ReactNode;
  color?: string;
  hideDisconnect?: boolean;
  isMobileNav?: boolean;
}) {
  const { connect, disconnect, wallet } = useAuthContext();
  const [isChainSelectorOpen, setChainSelectorOpen] = useState(false);

  function connectAndCloseSelector(chainName) {
    connect(chainName);
    setChainSelectorOpen(false);
  }

  return (
    <div className="relative flex">
      <Button
        variant="outline"
        color={color}
        inactive={Boolean(wallet)}
        onClick={(e) => {
          e.stopPropagation();
          if (!wallet) {
            setChainSelectorOpen(true);
          }
        }}
      >
        <span className="whitespace-nowrap">
          {wallet ? (
            <WalletInfo wallet={wallet} />
          ) : (
            <div className="flex gap-x-3 items-center">
              {children ? (
                children
              ) : (
                <>
                  <span>Connect</span>
                  <Image
                    src="/wallet-outline.svg"
                    height={28}
                    width={28}
                    alt="Wallet"
                  />
                </>
              )}
            </div>
          )}
        </span>
      </Button>
      {wallet && !hideDisconnect && (
        <Image
          onClick={disconnect}
          className="ml-4 hover:opacity-80 cursor-pointer"
          src="/log-out-outline.svg"
          height={30}
          width={30}
          alt="Disconnect"
        />
      )}
      {isChainSelectorOpen && (
        <ChainSelect
          connect={connectAndCloseSelector}
          close={() => setChainSelectorOpen(false)}
          isMobileNav={isMobileNav}
        />
      )}
    </div>
  );
}
