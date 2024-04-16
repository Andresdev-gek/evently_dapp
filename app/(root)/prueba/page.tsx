"use client";

import React, { useEffect, useState } from "react";
import ContractCallVote from "../../../components/shared/ContractCallVote";
import { userSession } from "../../../components/shared/ConnectWallet";
import { Connect } from "@stacks/connect-react";

const PruebaPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <Connect
      authOptions={{
        appDetails: {
          name: "Stacks Next.js Template",
          icon: "../../public/assets/icons/clock.svg",
        },
        redirectTo: "/",
        onFinish: () => {
          window.location.reload();
        },
        userSession,
      }}
    >
      <div>
        <h2>Next.js + Stacks.js 👋</h2>

        <ContractCallVote />
      </div>
    </Connect>
  );
};

export default PruebaPage;
