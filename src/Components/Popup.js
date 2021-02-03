import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";

const Popup = ({ open, close, popupTitle, children }) => {
  return (
    <Dialog open={open} className="form__Popup" maxWidth="md">
      <DialogTitle>
        <div className="popup__header">
          <h3>{popupTitle}</h3>
          <Button onClick={close} color="secondary" className="popupClose__btn">
            <Close color="secondary" />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Popup;
