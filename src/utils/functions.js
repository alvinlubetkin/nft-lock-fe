import { ethers } from "ethers";
import { VaultManagerAddressRinkeby } from "../utils/constants";
import VaultManagerABI from "../utils/abis/VaultManager";
import ERC721ABI from "../utils/abis/ERC721";

const lockNft = async (
  provider,
  nft,
  updateState,
  supply,
  name,
  symbol,
  removeNft
) => {
  const managerInstance = new ethers.Contract(
    VaultManagerAddressRinkeby,
    VaultManagerABI,
    provider
  );

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
      if (approved.toLowerCase() == VaultManagerAddressRinkeby.toLowerCase()) {
        console.log("approved");
        managerConnected.functions.lockNFT(
          window.ethereum.selectedAddress,
          nft.address,
          tokenId,
          name,
          symbol,
          ethers.utils.parseEther(supply)
        );
        // nftInstance.off("Approval");
      }
    });
  } else {
    managerConnected.functions.lockNFT(
      window.ethereum.selectedAddress,
      nft.address,
      nft.tokenId,
      name,
      symbol,
      ethers.utils.parseEther(supply)
    );
  }

  managerInstance.on("VaultCreated", (vault, creator, underlying, tokenId) => {
    updateState(vault);
    removeNft(nft);
  });
};

export default lockNft;
