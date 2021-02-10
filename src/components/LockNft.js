import { ethers } from "ethers";
import {
  TestableNFTAddressRinkeby,
  VaultManagerAddressRinkeby,
} from "../utils/constants";
import VaultManagerABI from "../utils/abis/VaultManager";
import ERC721ABI from "../utils/abis/ERC721";
import TestableNFTABI from "../utils/abis/TestableNFT";
import BigNumber from "big-number";
const LockNft = ({ provider, nft, updateState }) => {
  const managerInstance = new ethers.Contract(
    VaultManagerAddressRinkeby,
    VaultManagerABI,
    provider
  );
  const lock = async () => {
    const nftInstance = new ethers.Contract(nft.address, ERC721ABI, provider);
    const managerConnected = managerInstance.connect(provider.getSigner());
    const nftConnected = nftInstance.connect(provider.getSigner());
    //need to check if already approved
    const approvedAddrs = await nftConnected.functions.getApproved(nft.tokenId);
    const isApproved = approvedAddrs.filter(
      (addr) => addr == VaultManagerAddressRinkeby
    );
    console.log("approved: ", isApproved);
    if (isApproved.length == 0) {
      nftConnected.functions.approve(VaultManagerAddressRinkeby, nft.tokenId);

      nftInstance.on("Approval", (owner, approved, tokenId) => {
        if (
          approved.toLowerCase() == VaultManagerAddressRinkeby.toLowerCase()
        ) {
          console.log("approved");
          managerConnected.functions.lockNFT(
            window.ethereum.selectedAddress,
            nft.address,
            tokenId,
            "TestShare",
            "tst",
            ethers.utils.parseEther("10000000")
          );
          // nftInstance.off("Approval");
        }
      });
    } else {
      managerConnected.functions.lockNFT(
        window.ethereum.selectedAddress,
        nft.address,
        nft.tokenId,
        "TestShare",
        "tst",
        ethers.utils.parseEther("10000000")
      );
    }

    managerInstance.on(
      "VaultCreated",
      (vault, creator, underlying, tokenId) => {
        updateState(vault);
      }
    );
  };
  return (
    <div>
      <button onClick={() => lock()}>Lock NFT and Mint NFTShare ERC20</button>
    </div>
  );
};

export default LockNft;
