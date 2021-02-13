import React, { useRef } from "react";
import { Avatar, Button, Paper, TextField } from "@material-ui/core";
import "./FormComponentsGen.css";
import { CallMergeTwoTone } from "@material-ui/icons";

export const Input = ({
  label,
  name,
  value,
  onChange,
  error,
  helperText,
  type,
  specificClass,
}) => {
  return (
    <TextField
      className={`signup__input ${specificClass}`}
      label={label}
      variant="outlined"
      name={name}
      value={value}
      onChange={onChange}
      color="primary"
      error={error}
      helperText={helperText}
      type={type}
    />
  );
};

export const UploadAvatar = ({
  avaSrc,
  specificClass,
  setSelectedFile,
  needUploadToDBBtn,
  finalAction,
}) => {
  const fileInputRef = useRef(null);

  const uploadFileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <Paper className={`avatarUpload__element absc-center ${specificClass}`}>
      <Avatar className="avatarEle" src={avaSrc} />
      <input
        style={{ display: "none" }}
        type="file"
        ref={fileInputRef}
        onChange={uploadFileHandler}
      />
      <div className="fileAction__btns">
        <Button
          onClick={() => {
            fileInputRef.current.click();
          }}
          variant="contained"
          color="primary"
        >
          Change Avatar
        </Button>
      </div>
    </Paper>
  );
};
