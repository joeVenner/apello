import { createContext, useEffect, useState } from "react";
import { useManager } from "@cosmos-kit/react";

import * as ApelloAPI from "../interface/apello";
import useThread from "../hooks/useThread";
import { chainForWallet } from "../lib/chains";

const AUTH_CACHE_KEY = "apello/wallet";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const walletManager = useManager();
  const [auth, setAuth] = useState(null);
  const thread = useThread();

  const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };




  async function connectWallet(chainName) {
    console.log(chainName);
    if (chainName === "forma") {
      if (isMetaMaskInstalled()) {
        try {
          const accounts = await new Promise((resolve, reject) => {
            setTimeout(() => {
              window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then(resolve)
                .catch(reject);
            }, 100);
          });
          console.log('Connected to MetaMask', accounts[0]);
          return { chainName, address: accounts[0], isWalletConnected: true };
    
        } catch (error) {

          console.error('User denied account access',error);

          return null;
        }
      } else {
        console.log('MetaMask is not installed');
        alert('MetaMask is not installed');
        return null;
      }
    } else {
      const walletRepo = walletManager.getWalletRepo(chainName);
      walletRepo.activate();
      walletRepo.connect();

      return thread.run(() =>
        walletRepo.current?.isWalletConnected ? walletRepo.current : null,
      );
    }
  }

  function disconnectWallet(chainName) {
    if (chainName === "forma") {
      // MetaMask doesn't have a built-in disconnect method
      // You can clear your app's state instead
      console.log('Disconnected from MetaMask');
      return Promise.resolve(true);
    } else {
      const walletRepo = walletManager.getWalletRepo(chainName);
      if (!walletRepo.current) return;

      walletRepo.current.disconnect();
      walletRepo.disconnect();

      return thread.run(() => !walletRepo.current?.isWalletConnected);
    }
  }

  function view() {
    if (!auth) return;

    const walletRepo = walletManager.getWalletRepo(
      chainForWallet(auth.wallet).name,
    );
    walletRepo.openView();
  }
  async function connect(chainName) {
    const wallet = await connectWallet(chainName);
    if (!wallet) return;

    const response = await ApelloAPI.addWallet(
      wallet.chainName,
      wallet.address,
    );

    setAuth(response.data);

    localStorage.setItem(AUTH_CACHE_KEY, JSON.stringify(response.data));
  }


  async function disconnect() {
    if (!auth) return;

    await disconnectWallet(chainForWallet(auth.wallet).name);

    setAuth(null);

    localStorage.clear();
  }

  async function reconnect(cachedAuth) {
    try {
      await ApelloAPI.checkWallet(cachedAuth.token, cachedAuth.wallet.adress);
    } catch (e) {
      return localStorage.clear();
    }

    const walletRepo = walletManager.getWalletRepo(
      chainForWallet(cachedAuth.wallet).name,
    );
    walletRepo.activate();

    setAuth(cachedAuth);
  }

  useEffect(() => {
    const cachedAuth = JSON.parse(localStorage.getItem(AUTH_CACHE_KEY));
    if (cachedAuth) {
      reconnect(cachedAuth);
    }
  }, []);

  const contextValue = {
    connect,
    disconnect,
    view,

    ...(auth || {}),
    wallet: auth ? { ...auth.wallet, address: auth.wallet.adress } : undefined,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

