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
  needImgPreview,
  imgSrc,
  specificClass,
  setSelectedFile,
  needActionTwoBtn,
  actionTwo,
  uploading,
}) => {
  const fileInputRef = useRef(null);

  const uploadFileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <Paper className={`avatarUpload__element absc-center ${specificClass}`}>
      {needImgPreview && <Avatar className="avatarEle" src={imgSrc} />}
      <input
        style={{ display: "none" }}
        type="file"
        ref={fileInputRef}
        onChange={uploadFileHandler}
      />
      <div className="fileAction__btns">
        <Button
          disabled={uploading}
          onClick={() => {
            fileInputRef.current.click();
          }}
          variant="contained"
          color="primary"
        >
          Change Avatar
        </Button>
        {needActionTwoBtn && (
          <Button
            disabled={uploading}
            onClick={actionTwo}
            variant="contained"
            color="primary"
          >
            Upload
          </Button>
        )}
      </div>
    </Paper>
  );
};
