import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";

const CustomInput = (props) => {
  const [inputs, setInputs] = useState("");
  // const states = () => {
  //   props.state.map((state) => {
  //     return (
  //       <input
  //         type='text'
  //         value={"a"}
  //         onChange={(event) =>
  //           setInputs((inputs) => [...inputs, event.target.value])
  //         }
  //       />
  //     );
  //   });

  //   const names = () => {
  //     props.name.map((name) => {
  //       return (
  //         <button onClick={() => props.updateState(state)}>{props.name}</button>
  //       );
  //     });
  //   };
  // };
  return (
    <div>
      <label>
        <div>
          <Button variant='outlined' onClick={() => props.updateState(inputs)}>
            {props.name}
          </Button>
          <div>
            {" "}
            <TextField
              type='name'
              variant='outlined'
              onChange={(event) => setInputs(event.target.value)}
            />
          </div>
        </div>
      </label>
    </div>
  );
};
export default CustomInput;
