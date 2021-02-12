import React from "react";
import CustomLabel from "./CustomLabel";
import AssetList from "./AssetList";
import TokenList from "./TokenList";
import { Typography } from "@material-ui/core";
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
      <div>
        <Typography variant='h5'>Available NFTs in user account</Typography>
        <AssetList assets={props.assets} updateState={props.updateState} />
        <Typography variant='h5'>NFTShares (erc20) in users account</Typography>
        <TokenList assets={props.vaults} updateState={props.updateVault} />
      </div>
    </div>
  );
};

export default InfoCard;
