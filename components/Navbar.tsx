import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

import useOutsideClick from "../hooks/useOutsideClick";
import { useAuthContext } from "../hooks/useAuthContext";
import csx from "../lib/csx";
import { CoinImage } from "./Cards/SalesCard";
import Header from "./Header";
import { useRouter } from "next/router";
import ConnectButton from "./ConnectButton";

type Chain = {
  name: string;
  token?: string;
};

function SalesDropdown({ chains }: { chains: Chain[] }) {
  return (
    <Header.MenuDropdown text="Sales">
      {chains.map((chain) => (
        <Header.MenuDropdownLink
          key={chain.name}
          href={`/sales?chain=${chain.name.toLowerCase()}`}
        >
          <CoinImage chain={chain.name.toLowerCase()} token={chain.token} />
          {chain.name}
        </Header.MenuDropdownLink>
      ))}
    </Header.MenuDropdown>
  );
}

function MobileMenu({ wallet, close }) {
  const ref = useOutsideClick(close);
  return (
    <div
      ref={ref}
      className={csx(
        "absolute right-0 top-[63px] px-4 pb-4 z-50 flex flex-col justify-center",
        "bg-fauxblack border-bwhite border-r-0 border",
        "drop-shadow-lg",
      )}
    >
      <div className="my-4 text-sm flex justify-center items-center">
        <ConnectButton isMobileNav />
      </div>
      <Header.Menu>
        <Header.MenuLink text="Holders" href="/holder" />
        <SalesDropdown
          chains={[
            { name: "Stargaze" },
            { name: "Injective" },
            { name: "Teritori", token: "Tori" },
            { name: "Archway", token: "Arch" },
            { name: "Juno" },
            { name: "Passage" },
            { name: "Chihuahua" },
          ]}
        />
        <Header.MenuDropdown text="Calendar">
          <Header.MenuDropdownLink href="/calendar">
            View
          </Header.MenuDropdownLink>
          <Header.MenuDropdownLink
            disabled={!Boolean(wallet)}
            href="/calendar/create"
          >
            <div
              className="relative hover:disableSpan"
              data-tip={!Boolean(wallet) && "Connect your wallet first"}
            >
              Add Collection
            </div>
          </Header.MenuDropdownLink>
        </Header.MenuDropdown>
        <Header.MenuLink
          text="Image Creator"
          href="https://zeus.apello.xyz/create"
        />
        <Header.MenuLink text="Docs" href="https://use.apello.xyz" newTab />
      </Header.Menu>
    </div>
  );
}

export default function Navbar() {
  const { wallet } = useAuthContext();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();
  useEffect(() => setMobileMenuOpen(false), [router.pathname]);

  return (
    <Header>
      <Link href="/" className="flex items-center">
        <img
          src="/logo-apello-lyre.png"
          className="relative mx-4 md:mr-6 h-8 md:h-12 object-cover"
        />
        <div
          className={csx(
            "relative text-xl md:text-3xl tracking-wider font-bold uppercase left-[-8px]",
          )}
        >
          Apello
        </div>
      </Link>

      <div className="hidden md:flex ml-auto">
        <Header.Menu>
          <Header.MenuLink text="Holders" href="/holder" />
          <SalesDropdown
            chains={[
              { name: "Stargaze" },
              { name: "Injective" },
              { name: "Teritori", token: "Tori" },
              { name: "Archway", token: "Arch" },
              { name: "Juno" },
              { name: "Passage" },
              { name: "Chihuahua" },
            ]}
          />
          <Header.MenuDropdown text="Calendar">
            <Header.MenuDropdownLink href="/calendar">
              View
            </Header.MenuDropdownLink>
            <Header.MenuDropdownLink
              disabled={!Boolean(wallet)}
              href="/calendar/create"
            >
              <div
                className="relative hover:disableSpan"
                data-tip={!Boolean(wallet) && "Connect your wallet first"}
              >
                Add Collection
              </div>
            </Header.MenuDropdownLink>
          </Header.MenuDropdown>
          <Header.MenuLink
            text="Image Creator"
            href="https://zeus.apello.xyz/create"
          />
          <Header.MenuLink text="Snapshot" disabled />
          <Header.MenuLink text="Docs" href="https://use.apello.xyz" newTab />
        </Header.Menu>
        <div className="mx-2 ml-8 text-md flex justify-center items-center">
          <ConnectButton />
        </div>
      </div>

      <div
        className="ml-auto mr-4 flex md:hidden color-white"
        onClick={(e) => {
          e.stopPropagation();
          setMobileMenuOpen(!isMobileMenuOpen);
        }}
      >
        <Image src="/menu-outline.svg" height={36} width={36} alt="" />
      </div>
      {isMobileMenuOpen && (
        <MobileMenu wallet={wallet} close={() => setMobileMenuOpen(false)} />
      )}
    </Header>
  );
}
