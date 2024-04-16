'use client'

import React, { useEffect, useState } from "react";

import { useConnect } from "@stacks/connect-react";
import {StacksNetwork, StacksNetworkName, StacksTestnet} from "@stacks/network";
import {
  AnchorMode,
  PostConditionMode,
  stringAsciiCV,
  stringUtf8CV,
  principalCV,
  uintCV,
  callReadOnlyFunction,
} from "@stacks/transactions";



const ContractCallVote = () => {
  const { doContractCall } = useConnect();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  function vote(pick: string) {
    doContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.OnChainOnly,
      contractAddress: "ST39MJ145BR6S8C315AG2BD61SJ16E208P1FDK3AK",
      contractName: "example-fruit-vote-contract",
      functionName: "vote",
      functionArgs: [stringUtf8CV(pick), 'ST39MJ145BR6S8C315AG2BD61SJ16E208P1FDK3AK'],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [],
      onFinish: (data) => {
        console.log("onFinish:", data);
        window
          .open(
            `https://explorer.hiro.so/txid/${data.txId}?chain=testnet`,
            "_blank"
          )
          ?.focus();
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  }

  const network = new StacksTestnet();
  const contractAddress = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
  const contractName = "evently1";

  function addEvent() {
    const eventId = stringAsciiCV('EI137d80e3-e338-48df-907b-feafb539b155')
    const owner = principalCV('ST1TPC1ER8W9TB0XGYY8P6MNFKT1M2MP2A0QN5VBY')
    const price = uintCV(1)
    const limit = uintCV(5)
    const expiry = uintCV((new Date()).getTime() / 1000 | 0)

    doContractCall({
      network,
      contractAddress,
      contractName,
      functionName: "add-event",
      functionArgs: [eventId, owner, price, limit, expiry],
      onFinish: (data) => {
        console.log("onFinish:", data);
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  }

  function updateEvent() {
    const eventId = stringAsciiCV('EI137d80e3-e338-48df-907b-feafb539b155')
    const newOwner = principalCV('ST1TPC1ER8W9TB0XGYY8P6MNFKT1M2MP2A0QN5VBY')
    const price = uintCV(2)
    const limit = uintCV(6)
    const expiry = uintCV((new Date()).getTime() / 1000 | 0)

    doContractCall({
      network,
      contractAddress,
      contractName,
      functionName: "update-event",
      functionArgs: [eventId, newOwner, price, limit, expiry],
      onFinish: (data) => {
        console.log("onFinish:", data);
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  }

  function getEvent(eventUUID: string) {
    const network = new StacksTestnet();
    const contractAddress = "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5";
    const contractName = "evently1";

    const eventId = stringAsciiCV(eventUUID)
    

    const options = {
      contractAddress,
      contractName,
      functionName: "get-event",
      functionArgs: [eventId],
      senderAddress: 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
      network,
    };

    

    callReadOnlyFunction(options)
      .then(result => {
        console.log("aca result", result);
        
      })
      .catch(error => {
        console.error("Failed to fetch event details:", error);
      });
  }

  

  function buyTicket(eventUUID: string, ticketId: string) {
    //const eventId = stringAsciiCV('EI137d80e3-e338-48df-907b-feafb539b155')
    //const ticketId = stringAsciiCV('TI237d80e3-e338-48df-907b-feafb539b156')

    doContractCall({
      network,
      contractAddress,
      contractName,
      functionName: "buy-ticket",
      functionArgs: [eventUUID, ticketId],
      onFinish: (data) => {
        console.log("onFinish:", data);
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  }

  

 

  return (
    <div>
      hola
    </div>
  );
};

export default ContractCallVote;
