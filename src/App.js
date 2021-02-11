import React, { useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import {
  TestableNFTAddressRinkeby,
  VaultManagerAddressRinkeby,
} from "./utils/constants";
import TestableNFTABI from "./utils/abis/TestableNFT";
import MintTestNft from "./components/mintNft";
import LockNft from "./components/LockNft";
import InitializeBallot from "./components/InitializeBallot";
import CustomInput from "./components/CustomInput";
import CustomLabel from "./components/CustomLabel";
import InfoCard from "./components/InfoCard";
import ERC721 from "./utils/abis/ERC721";
import ERC20 from "./utils/abis/ERC20";
import MintPopup from "./components/MintPopup";
import lockNft from "./utils/functions";

const App = () => {
  window.ethereum.enable();
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const [assets, setAssets] = useState("");
  const [nft, setNft] = useState(""); // {address: "", tokenId: ""}
  const [vault, setVault] = useState("");
  const [ballot, setBallot] = useState("");
  const [vaults, setVaults] = useState("");

  const handleAssets = (chg) => {
    setAssets((assets) => [...assets, chg]);
    setNft(chg);
  };

  const handleCustomNftAddress = (addr) => {
    console.log("address", addr);
    const nftInstance = new ethers.Contract(addr, ERC721, provider);
    console.log("nft instance:", nftInstance);
    const owner = window.ethereum.selectedAddress;
    console.log(owner);
    nftInstance.functions
      .balanceOf(owner)
      .then((numAssets) => {
        console.log(numAssets);
        for (let i = 0; i < numAssets; i++) {
          nftInstance.functions.tokenOfOwnerByIndex(owner, i).then((id) => {
            handleAssets({ address: addr, tokenId: id.toString() });
          });
        }
      })
      .catch((err) => {
        console.error(err);
        //Trigger notification of invalid/unsupported contract
      });
  };
  const handleBallot = (ballot) => {
    setBallot(ballot);
    console.log("updated ballot: ", ballot);
  };
  const handleVault = (addr) => {
    setVault(addr);
    const vaultInstance = new ethers.Contract(addr, ERC20, provider);
    vaultInstance.functions
      .balanceOf(window.ethereum.selectedAddress)
      .then((balance) => {
        if (vaults.length < 1) {
          console.log("first setVaults");
          setVaults([
            {
              address: addr,
              balance: ethers.utils.formatEther(balance.toString()),
            },
          ]);
        } else if (
          vaults.filter((vault) => vault.address == addr).length == 0
        ) {
          setVaults((vaults) => [
            ...vaults,
            {
              address: addr,
              balance: ethers.utils.formatEther(balance.toString()),
            },
          ]);
          console.log("updating number:", vaults.length);
        }
      })
      .catch((err) => {
        console.error(err);
        if (vaults.length < 1) {
          setVaults([{ address: addr, balance: "unkown" }]);
        } else if (
          vaults.filter((vault) => vault.address == addr).length == 0
        ) {
          setVaults((vaults) => [
            ...vaults,
            { address: addr, balance: "unkown" },
          ]);
        }
        console.log("updated vault address", addr);
      });
  };

  const handleMint = (args) => {
    lockNft(
      provider,
      nft,
      handleVault,
      args.totalSupply,
      args.name,
      args.symbol
    );
  };
  return (
    <div className='App'>
      <MintTestNft provider={provider} updateState={handleAssets} />
      <label>or provide address to your own erc721</label>
      <CustomInput
        name='add NFT address'
        state={nft.address}
        updateState={handleCustomNftAddress}
      />
      <label>Lock your NFT and mint corresponding erc20shares</label>
      <MintPopup updateState={handleMint} />
      <label>or provide address to your own erc20</label>
      <CustomInput
        name='add erc20 share address'
        state={vault}
        updateState={handleVault}
      />

      {/* <InitializeBallot
        provider={provider}
        vault={vault}
        updateState={handleBallot}
      />
      <CustomInput name='Change Vault' state={vault} updateState={handleLock} /> */}
      <div>
        <InfoCard
          vaults={vaults}
          vault={vault}
          nft={nft}
          assets={assets}
          updateState={setNft}
          updateVault={handleVault}
        />
      </div>
    </div>
  );
};

export default App;

// const onSetup = async () => {
//   await
// };
