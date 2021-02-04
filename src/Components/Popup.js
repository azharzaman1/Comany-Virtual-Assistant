import React from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import {
  SET_ADD_EMPLOYEE_POPUP,
  SET_VIEW_EMPLOYEE_POPUP,
} from "../redux/slices/generalSlice";

const Popup = ({
  open,
  popupTitle,
  loadingPopup,
  popupSpecificClass,
  popupContentSpecificClass,
  children,
}) => {
  const dispatch = useDispatch();

  const closePopups = () => {
    dispatch(SET_VIEW_EMPLOYEE_POPUP(false));
    dispatch(SET_ADD_EMPLOYEE_POPUP(false));
  };
  return (
    <>
      {loadingPopup ? (
        <Dialog
          open={open}
          className={`form__Popup ${popupSpecificClass}`}
          maxWidth="md"
        >
          {children}
        </Dialog>
      ) : (
        <Dialog
          open={open}
          className={`form__Popup ${popupSpecificClass}`}
          maxWidth="md"
        >
          <DialogTitle>
            <div className="popup__header">
              <h3>{popupTitle}</h3>
              <Button
                onClick={closePopups}
                color="secondary"
                className="popupClose__btn"
              >
                <Close color="secondary" />
              </Button>
            </div>
          </DialogTitle>
          <DialogContent className={popupContentSpecificClass}>
            {children}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Popup;
