import React from "react";
import { ethers } from "ethers";
import { VaultManagerAddressRinkeby } from "../utils/constants";
import VaultMangagerABI from "../utils/abis/VaultManager";
const InitializeBallot = ({ provider, vault, updateState }) => {
  const initialize = () => {
    const managerConnected = new ethers.Contract(
      VaultManagerAddressRinkeby,
      VaultMangagerABI,
      provider.getSigner()
    );
    managerConnected.functions.initializeVaultBallot(vault, 0);
    managerConnected.on(
      "VaultBallotCreated",
      (underlying, tokenId, nftShare, ballot) => {
        updateState(ballot);
      }
    );
  };
  return (
    <div>
      <button onClick={() => initialize()}>
        Initiate a Vote on vault ${vault}
      </button>
    </div>
  );
};

export default InitializeBallot;
