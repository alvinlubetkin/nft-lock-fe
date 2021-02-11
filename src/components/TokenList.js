import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
const TokenList = (props) => {
  const columns = [
    { field: "id", headerName: "Index", width: 200 },
    { field: "address", headerName: "Token Address", width: 200 },
    { field: "balance", headerName: "Balance", width: 200 },
  ];
  const rows = [];
  const grid = () => {
    console.log("tokens:", props.assets);
    if (!props.assets) {
      rows.push({ id: "None", address: "None", balance: "None" });
      // setRows({ index: "None", address: "None", tokenId: "None" });
      return <DataGrid rows={rows} columns={columns} pageSize={10} />;
    } else {
      props.assets.map((asset, i) => {
        //   setRows((rows) => [...rows, { ...asset, index: i }]);

        rows.push({ ...asset, id: i });
      });
      return (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          onRowClick={onSelection}
        />
      );
    }
  };

  const onSelection = (event) => {
    console.log(event.row);
    props.updateState(event.row.address);
  };

  return <div style={{ height: 400, width: "50%" }}>{grid()}</div>;
};
export default TokenList;
