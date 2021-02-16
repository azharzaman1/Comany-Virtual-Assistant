import React, { useRef } from "react";
import {
  Avatar,
  Button,
  Paper,
  TextField,
  CircularProgress,
  Box,
  Typography,
  LinearProgress,
} from "@material-ui/core";
import PropTypes from "prop-types";
import "./FormComponentsGen.css";

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
  progress,
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
      {uploading ? (
        <h3 className="uploadingProgress__indicator t-center">
          Upload In Progress... {`${Math.round(progress)}%`}
        </h3>
      ) : (
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
          {needActionTwoBtn && (
            <Button onClick={actionTwo} variant="contained" color="primary">
              Upload
            </Button>
          )}
        </div>
      )}
    </Paper>
  );
};

export const UploadingProgress = (props) => {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={2}>
        <LinearProgress color="primary" variant="determinate" {...props} />
      </Box>
      <Box minWidth={125}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.progress
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

UploadingProgress.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};
