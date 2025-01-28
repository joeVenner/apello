import { createContext, useEffect, useState } from "react";
import { useManager } from "@cosmos-kit/react";

import * as ApelloAPI from "../interface/apello";
import useThread from "../hooks/useThread";
import { chainForWallet } from "../lib/chains";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";

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

  const isPhantomInstalled = () => {
    return Boolean(window.solana && window.solana.isPhantom);
  };



  async function connectWallet(chainName) {
    console.log(chainName);
    if (chainName === "formal") {
      if (isMetaMaskInstalled()) {
        try {
          const accounts = await new Promise((resolve, reject) => {
            setTimeout(() => {
              window.leap.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then(resolve)
                .catch(reject);
            }, 100);
          });
          console.log('Connected to Leap', accounts[0]);
          return { chainName, address: accounts[0], isWalletConnected: true };
    
        } catch (error) {

          console.error('User denied account access',error);

          return null;
        }
      } else {
        console.log('Leap wallet is not installed');
        alert('Leap wallet is not installed');
        return null;
      }
    } 
    else if (chainName === "forma") {
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
    } 
    else if (chainName === "solana") {
        if (isPhantomInstalled()) {
          try {
            const { publicKey } = await window.solana.connect();
            console.log("Connected to Phantom Wallet", publicKey.toString());
            return { chainName, address: publicKey.toString(), isWalletConnected: true };
          } catch (error) {
            console.error("User denied Phantom Wallet access", error);
            return null;
          }
        } else {
          console.log("Phantom Wallet is not installed");
          alert("Phantom Wallet is not installed");
          return null;
        }
        } 
    
    else {
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
    } 
    else if (chainName === "formal") {
      // MetaMask doesn't have a built-in disconnect method
      // You can clear your app's state instead
      console.log('Disconnected from Leap');
      return Promise.resolve(true);
    } 
    else if (chainName === "solana") {
      // MetaMask doesn't have a built-in disconnect method
      // You can clear your app's state instead
      console.log('Disconnected from Phantom');
      return Promise.resolve(true);}
    else {
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
    console.log("Cashed Wallet: ",cachedAuth.wallet.type);
    if (cachedAuth.wallet.type === "forma") {
        
          let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log(accounts);
          if (accounts.length > 0 && accounts[0].toLowerCase() === cachedAuth.wallet.adress.toLowerCase()) {
            console.log('Reconnected to MetaMask', accounts[0]);
            setAuth(cachedAuth);
          } else {
            console.log('MetaMask account does not match cached account');
            accounts = await window.leap.ethereum.request({ method: 'eth_requestAccounts' });
            setAuth(cachedAuth);
            // Optionally, you can update the auth with the new account
            // setAuth({ ...cachedAuth, wallet: { ...cachedAuth.wallet, address: accounts[0] } });
          }}
    else if (cachedAuth.wallet.type === "formal") {
        
          const accounts = await window.leap.ethereum.request({ method: 'eth_requestAccounts' });
          console.log(accounts);
          if (accounts.length > 0 && accounts[0].toLowerCase() === cachedAuth.wallet.adress.toLowerCase()) {
            console.log('Reconnected to Leap Forma', accounts[0]);
            setAuth(cachedAuth);
          } else {
            console.log('Leap Forma account does not match cached account');
            // Optionally, you can update the auth with the new account
            // setAuth({ ...cachedAuth, wallet: { ...cachedAuth.wallet, address: accounts[0] } });
          }}
    else if (cachedAuth.wallet.type === "solana") {
            if (window.solana && window.solana.isPhantom) {
              try {
                const { publicKey } = await window.solana.connect({ onlyIfTrusted: true });
                if (publicKey.toString().toLowerCase() === cachedAuth.wallet.adress.toLowerCase()) {
                  console.log("Reconnected to Phantom Wallet", publicKey.toString());
                  setAuth(cachedAuth);
                } else {
                  console.log("Phantom Wallet account does not match cached account");
                }
              } catch (error) {
                console.error("Failed to reconnect to Phantom Wallet:", error);
              }
            } else {
              console.log("Phantom Wallet is not installed");
            }
          } 
    else {
      // Original reconnect logic for Cosmos chains
      const walletRepo = walletManager.getWalletRepo(
        chainForWallet(cachedAuth.wallet).name
      );
      walletRepo.activate();
      setAuth(cachedAuth);
    }
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

