import {
  WalletConnectionStatus,
  useWallet,
  useWalletManager,
} from "@noahsaso/cosmodal";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";

const CosmodalTest: NextPage = () => {
  const { connect, disconnect } = useWalletManager();
  const { status, error, name, address, signingCosmWasmClient } = useWallet();

  return (
    <section className="m-10">
      <p className="font-mono mb-10">
        Testing{" "}
        <Link
          className="underline"
          href="https://github.com/NoahSaso/cosmodal"
          rel="noopener noreferrer"
        >
          NoahSaso/cosmodal
        </Link>
      </p>
      {status === WalletConnectionStatus.Connected ? (
        <div>
          <p>
            Name: <b>{name}</b>
          </p>
          <p>
            Address: <b>{address}</b>
          </p>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <div>
          <button
            className="flex items-center text-lg px-3 py-2 mb-2 rounded-md border-solid border-violet border-2"
            onClick={connect}
          >
            Connect
          </button>
          {error && (
            <p>{error instanceof Error ? error.message : `${error}`}</p>
          )}
        </div>
      )}
    </section>
  );
};

export default CosmodalTest;
