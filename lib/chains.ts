import mapping from "./mapping";
import { capitalize } from "./string";

export class Chain {
  name: string;
  properName?: string;
  ticker: string;
  supported: boolean;

  constructor(props) {
    this.name = props.name;
    this.properName = props.properName;
    this.ticker = props.ticker;
    this.supported = props.supported;
  }

  get icon() {
    return `/chains/${this.name}.svg`;
  }

  get displayName() {
    return this.properName || capitalize(this.name);
  }
}

export const CHAINS: Chain[] = [
  {
    name: "injective",
    ticker: "INJ",
    supported: true,
  },
  {
    name: "osmosis",
    ticker: "OSMO",
    supported: true,
  },
  {
    name: "stargaze",
    ticker: "STARS",
    supported: true,
  },
  { name: "juno", ticker: "JUNO", supported: true },
  {
    name: "passage",
    ticker: "PASG",
    supported: true,
  },
  {
    name: "chihuahua",
    ticker: "HUAHUA",
    supported: true,
  },
  {
    name: "teritori",
    ticker: "TORI",
    supported: true,
  },
  {
    name: "terra",
    ticker: "LUNA",
    supported: true,
  },
  {
    properName: "Omniflix",
    name: "omniflixhub",
    ticker: "FLIX",
    supported: true,
  },
  {
    name: "archway",
    ticker: "ARCH",
    supported: true,
  },
  {
    name: "oraichain",
    ticker: "ORAI",
    supported: true,
  },
].map((c) => new Chain(c));

export const CHAINS_BY_WALLET_TYPE = mapping("name", CHAINS, (k) =>
  k === "omniflixhub" ? "omniflix" : k,
);

export function chainForWallet(wallet: { type: string }) {
  return CHAINS_BY_WALLET_TYPE[wallet.type];
}
