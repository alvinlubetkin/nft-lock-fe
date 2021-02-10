import React, { useState } from "react";

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
          <button onClick={() => props.updateState(inputs)}>
            {props.name}
          </button>
          <input
            type='text'
            value={inputs}
            onChange={(event) => setInputs(event.target.value)}
          />
        </div>
      </label>
    </div>
  );
};
export default CustomInput;
