import { ethers } from "ethers";
import { TestableNFTAddressRinkeby } from "../utils/constants";
import TestableNFTABI from "../utils/abis/TestableNFT";

const MintTestNft = ({ provider, updateState }) => {
  const testNftInstance = new ethers.Contract(
    TestableNFTAddressRinkeby,
    TestableNFTABI,
    provider
  );

  const mint = () => {
    console.log("run test");
    let nftConnected = testNftInstance.connect(provider.getSigner());
    nftConnected.functions.mintToUser(window.ethereum.selectedAddress);
    testNftInstance.on("Transfer", (from, to, tokenId) => {
      if (to.toLowerCase() == window.ethereum.selectedAddress.toLowerCase()) {
        updateState({
          tokenId: tokenId.toString(),
          address: TestableNFTAddressRinkeby,
        });
        console.log(
          `Transfer (event) : from: ${from}, to: ${to}, tokenId: ${tokenId}`
        );
        testNftInstance.off("Transfer");
      }
    });
  };

  return (
    <div>
      <button onClick={() => mint()}>Mint a Test NFT</button>
    </div>
  );
};
export default MintTestNft;

//add button for transferring nft?
