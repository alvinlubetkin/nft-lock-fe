import React from "react";
import CustomLabel from "./CustomLabel";
import AssetList from "./AssetList";
import TokenList from "./TokenList";
const InfoCard = (props) => {
  return (
    <div>
      <CustomLabel
        name='user address'
        state={window.ethereum.selectedAddress}
      />
      <CustomLabel name='currently selected token' state={props.vault} />
      <CustomLabel name='currently selected nft' state={props.nft.address} />
      <CustomLabel name='tokenId of selected nft ' state={props.nft.tokenId} />
      <AssetList assets={props.assets} updateState={props.updateState} />
      <TokenList assets={props.vaults} updateState={props.updateVault} />
    </div>
  );
};

export default InfoCard;
