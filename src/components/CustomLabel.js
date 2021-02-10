import React, { useState } from "react";

const CustomLabel = (props) => {
  return (
    <div>
      <label>
        {" "}
        {props.name}: {props.state}
      </label>
    </div>
  );
};
export default CustomLabel;
