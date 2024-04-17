"use client";

import React, { useEffect, useState } from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";
import Image from "next/image";
import TruncateText from "./TruncateText"
import { deleteValue, saveEncryptedValue } from "@/lib/utils";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });



function authenticate() {
  showConnect({
    userSession,
    appDetails: {
      name: "Evently Dapp",
      icon: "/assets/complete-logo.svg",
    },
    redirectTo: "/",
    onFinish: () => {
      saveEncryptedValue("principalAddress", userSession.loadUserData().profile.stxAddress.testnet);
      window.location.reload();
    },
    onCancel: () => {
      console.log('no conection'); // WHEN user cancels/closes pop-up
    },
  });
}

function disconnect() {
  deleteValue("principalAddress");
  userSession.signUserOut("/");
}

const ConnectWallet = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (mounted && userSession.isUserSignedIn()) {
    return (
      <section className="block mt-0">
        <button
          className="bg-transparent hover:bg-green-200 text-black font-bold py-2 px-3 rounded border-1 border-green-500 inline-flex items-center"
          onClick={disconnect}
        >
          <span className="hidden lg:block">Disconnect Wallet</span>

          <Image
            alt="menu"
            src="/assets/icons/out.svg"
            width={20}
            height={20}
            className="cursor-pointer lg:ml-2"
          ></Image>
        </button>

        <TruncateText text={userSession.loadUserData().profile.stxAddress.testnet} />

        
      </section>
    );
  }

  return (
    <button
      className="bg-transparent hover:bg-green-200 text-black font-bold py-2 px-3 rounded border-1 border-green-500 inline-flex items-center"
      onClick={authenticate}
    >
      <span className="hidden lg:block">Connect Wallet</span>

      <Image
        alt="menu"
        src="/assets/icons/wallet.svg"
        width={20}
        height={20}
        className="cursor-pointer lg:ml-2"
      ></Image>
    </button>
  );
};

export default ConnectWallet;
