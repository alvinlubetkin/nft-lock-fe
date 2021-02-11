import React, { useState } from "react";
import {
  Button,
  DialogTitle,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

const MintPopup = (props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    props.updateState({ name: name, symbol: symbol, totalSupply: supply });
  };
  const handleName = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };
  const handleSymbol = (event) => {
    console.log(event.target.value);
    setSymbol(event.target.value);
  };
  const handleSupply = (event) => {
    setSupply(event.target.value);
  };
  return (
    <div>
      <Button variant='outlined' onClick={handleClick}>
        Lock NFT and Mint NFTShares
      </Button>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Mint</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your token name, symbol, and the total supply to mint.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Name'
            type='name'
            fullWidth
            onChange={handleName}
          />
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Symbol'
            type='name'
            fullWidth
            onChange={handleSymbol}
          />
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Number of Tokens'
            type='name'
            fullWidth
            onChange={handleSupply}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MintPopup;
