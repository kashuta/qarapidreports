import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import React, {
  useCallback,
} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import png from '../../assets/png.png';
import jpg from '../../assets/jpg.png';
import svg from '../../assets/svg.png';
import defaultImage from '../../assets/default.png';
import jpeg from '../../assets/jpeg.png';

const ImageConfig = {
  png,
  jpg,
  svg,
  'svg+xml': svg,
  default: defaultImage,
  jpeg,
};

function FileUpload({
  multiple, name, singleFile, setSingleFile, fileList, setFileList,
}) {
  const onFileUpload = useCallback(
    (e) => {
      const { target } = e;
      if (!target.files) return;

      if (multiple) {
        const newFiles = Object.values(target.files).map((file) => file);
        if (newFiles) {
          const updatedList = [...fileList, ...newFiles];
          setFileList(updatedList);
        }
      } else {
        const newFile = Object.values(target.files).map((file) => file);
        setSingleFile(newFile);
      }
    },
    [fileList, multiple, singleFile],
  );

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
  };

  const fileSingleRemove = () => {
    setSingleFile([]);
  };

  const calcSize = (size) => (size < 1000000
    ? `${Math.floor(size / 1000)} KB`
    : `${Math.floor(size / 1000000)} MB`);

  return (
    <Box mb={5} mt={3} align="center">
      <Button variant="contained" component="label">
        Attach image
        <input hidden onChange={onFileUpload} name={name} accept="image/jpg, image/png, image/jpeg" multiple={multiple} type="file" />
      </Button>

      {fileList.length > 0 || singleFile.length > 0 ? (
        <Stack spacing={2} sx={{ my: 2 }}>
          {(multiple ? fileList : singleFile).map((item, index) => {
            const imageType = item.type.split('/')[1];
            return (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  backgroundColor: 'rgba(191, 191, 191, 0.3)',
                  borderRadius: 1.5,
                  p: 0.5,
                }}
              >
                <Box display="flex">
                  <img
                    src={ImageConfig[`${imageType}`] || ImageConfig.default}
                    alt="upload"
                    style={{
                      height: '3.5rem',
                      objectFit: 'contain',
                    }}
                  />
                  <Box sx={{ ml: 1 }}>
                    <Typography>{item.name}</Typography>
                    <Typography variant="body2">
                      {calcSize(item.size)}
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  onClick={() => {
                    if (multiple) {
                      fileRemove(item);
                    } else {
                      fileSingleRemove();
                    }
                  }}
                  sx={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            );
          })}
        </Stack>
      ) : null}
    </Box>
  );
}

export default FileUpload;
