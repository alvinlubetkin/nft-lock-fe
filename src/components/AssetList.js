import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
const AssetList = (props) => {
  const columns = [
    { field: "id", headerName: "Index", width: 200 },
    { field: "tokenId", headerName: "Token ID", width: 200 },
    { field: "address", headerName: "NFT Address", width: 200 },
  ];
  const rows = [];
  const grid = () => {
    if (!props.assets) {
      rows.push({ id: "None", address: "None", tokenId: "None" });
      // setRows({ index: "None", address: "None", tokenId: "None" });
      return <DataGrid rows={rows} columns={columns} pageSize={10} />;
    } else {
      props.assets.map((asset, i) => {
        //   setRows((rows) => [...rows, { ...asset, index: i }]);
        rows.push({ ...asset, id: i });
      });
      return (
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          pageSize={5}
          onRowClick={onSelection}
        />
      );
    }
  };

  const onSelection = (event) => {
    console.log(event.row);
    const newNft = { address: event.row.address, tokenId: event.row.tokenId };
    props.updateState(newNft);
  };

  return <div style={{ width: "100%" }}>{grid()}</div>;
};
export default AssetList;
