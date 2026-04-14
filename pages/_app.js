import { Analytics } from "@vercel/analytics/react";
import { ChainProvider } from "@cosmos-kit/react";
import { wallets as keplr } from "@cosmos-kit/keplr";
import { wallets as leap } from "@cosmos-kit/leap";
import { wallets as ninji } from "@cosmos-kit/ninji";
import { wallets as ledger } from "@cosmos-kit/ledger";
import { chains, assets } from "chain-registry";

import Layout from "../containers/Layout";
import { AuthContextProvider } from "../components/AuthProvider";
import { DiscordProvider } from "../hooks/useDiscordConnection";
import "../styles/globals.css";
import "@interchain-ui/react/styles";

const WC_PROJECT_ID = "a4a7d739f0795a89b2b212a734d662fa";

export default function App({ Component, pageProps }) {
  const supportedWallets = [...keplr, ...leap, ...ledger, ...ninji];

  return (
    <ChainProvider
      chains={chains}
      assetLists={assets}
      wallets={supportedWallets}
      walletConnectOptions={{ signClient: { projectId: WC_PROJECT_ID } }}
    >
      <AuthContextProvider>
        <DiscordProvider>
          <Layout>
            <Component {...pageProps} />
            <Analytics />
          </Layout>
        </DiscordProvider>
      </AuthContextProvider>
    </ChainProvider>
  );
}
