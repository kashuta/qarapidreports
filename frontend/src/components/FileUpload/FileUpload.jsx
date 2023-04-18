import {
  Box,
  Button,
  // FormHelperText,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
// import { styled } from '@mui/material/styles';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
// import uploadImg from '../../assets/cloud-upload.png';
// import { ImageConfig } from './FileConfig';
// import { Controller, useController, useFormContext } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { useFetcher } from 'react-router-dom';
import png from '../../assets/png.png';
import jpg from '../../assets/jpg.png';
import svg from '../../assets/svg.png';
import defaultImage from '../../assets/default.png';
import jpeg from '../../assets/jpeg.png';
import { setImageNamesAction, setImagesAction } from '../../Redux/file.action';

const ImageConfig = {
  png,
  jpg,
  svg,
  'svg+xml': svg,
  default: defaultImage,
  jpeg,
};

// Custom Styles for the Box Component
// const CustomBox = styled(Box)({
//   '&.MuiBox-root': {
//     backgroundColor: '#fff',
//     borderRadius: '2rem',
//     boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
//     padding: '1rem',
//   },
//   '&.MuiBox-root:hover, &.MuiBox-root.dragover': {
//     opacity: 0.6,
//   },
// });

// FileUpload Component
function FileUpload({
  multiple, name, singleFile, setSingleFile, fileList, setFileList,
}) {
  // Form Context
  // const {
  //   control,
  //   formState: { isSubmitting, errors },
  // } = useFormContext();

  // State with useState()
  // const { field } = useController({ name, control });
  // const [singleFile, setSingleFile] = useState([]);
  // const [fileList, setFileList] = useState([]);

  const dispatch = useDispatch();
  // const images = useSelector((state) => state.FileReducer.images);
  // const imageNames = useSelector((state) => state.FileReducer.imageNames);
  // const wrapperRef = useRef < HTMLDivElement > (null);

  // Toggle the dragover class
  // const onDragEnter = () => wrapperRef.current?.classList.add('dragover');
  // const onDragLeave = () => wrapperRef.current?.classList.remove('dragover');

  // Image Upload Service
  // const onFileDrop = useCallback(
  //   (e) => {
  //     const { target } = e;
  //     if (!target.files) return;

  //     if (limit === 1) {
  //       console.log(target.files);
  //       const newFile = Object.values(target.files).map((file) => file);
  //       if (singleFile.length >= 1) return alert('Only a single image allowed');
  //       setSingleFile(newFile);
  //       field.onChange(newFile[0]);
  //     }

  //     if (multiple) {
  //       const newFiles = Object.values(target.files).map((file) => file);
  //       if (newFiles) {
  //         const updatedList = [...fileList, ...newFiles];
  //         if (updatedList.length > limit || newFiles.length > 3) {
  //           return alert(`Image must not be more than ${limit}`);
  //         }
  //         setFileList(updatedList);
  //         field.onChange(updatedList);
  //       }
  //     }
  //   },
  //   [field, fileList, limit, multiple, singleFile],
  // );
  useEffect(
    () =>
    // if (!images.length) {
    //   if (multiple) {
    //     setFileList([]);
    //   } else {
    //     setSingleFile([]);
    //   }
    // }

      () => {
        dispatch(setImagesAction([]));
        dispatch(setImageNamesAction([]));
      },
    [],
  );

  // useEffect(() => () => {
  //   dispatch(setImagesAction([]));
  //   dispatch(setImageNamesAction([]));
  // }, []);

  const onFileUpload = useCallback(
    (e) => {
      const { target } = e;
      if (!target.files) return;

      if (multiple) {
        const newFiles = Object.values(target.files).map((file) => file);
        if (newFiles) {
          const updatedList = [...fileList, ...newFiles];
          setFileList(updatedList);
          console.log(updatedList);
          const updatedNames = [...updatedList].map((el) => el.name);
          dispatch(setImageNamesAction(updatedNames));
          dispatch(setImagesAction(updatedList));
          // console.log(target.files[0]);
        }
      } else {
        const newFile = Object.values(target.files).map((file) => file);
        setSingleFile(newFile);
        dispatch(setImageNamesAction([newFile.name]));
        dispatch(setImagesAction([newFile]));
      }
    },
    [fileList, multiple, singleFile],
  );

  // remove multiple images
  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    dispatch(setImagesAction(updatedList));
    const updatedNames = [...updatedList].map((el) => el.name);
    dispatch(setImageNamesAction(updatedNames));
  };

  // remove single image
  const fileSingleRemove = () => {
    setSingleFile([]);
    dispatch(setImageNamesAction([]));
    dispatch(setImagesAction([]));
  };

  // Calculate Size in KiloByte and MegaByte
  const calcSize = (size) => (size < 1000000
    ? `${Math.floor(size / 1000)} KB`
    : `${Math.floor(size / 1000000)} MB`);

  // Reset the State
  // useEffect(() => {
  //   if (isSubmitting) {
  //     setFileList([]);
  //     setSingleFile([]);
  //   }
  // }, [isSubmitting]);

  // Actual JSX
  return (
    <>
      <Button variant="contained" component="label">
        Attach image
        <input hidden onChange={onFileUpload} name={name} accept="image/jpg, image/png, image/jpeg" multiple={multiple} type="file" />
      </Button>
      {/* <CustomBox>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            position: 'relative',
            width: '100%',
            height: '13rem',
            border: '2px dashed #4267b2',
            borderRadius: '20px',
          }}
          ref={wrapperRef}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDragLeave}
        >
          <Stack justifyContent="center" sx={{ p: 1, textAlign: 'center' }}>
            <Typography sx={{ color: '#ccc' }}>
              {limit > 1 ? 'Browse files to upload' : 'Browse file to upload'}
            </Typography>
            <div>
              <img
                src={uploadImg}
                alt="file upload"
                style={{ width: '5rem' }}
              />
            </div>
            <Typography variant="body1" component="span">
              <strong>Supported Files</strong>
            </Typography>
            <Typography variant="body2" component="span">
              JPG, JPEG, PNG
            </Typography>
          </Stack>
          <Controller
            name={name}
            defaultValue=""
            control={control}
            render={({ field: { name, onBlur, ref } }) => (
              <input
                type="file"
                name={name}
                onBlur={onBlur}
                ref={ref}
                onChange={onFileDrop}
                multiple={multiple}
                accept="image/jpg, image/png, image/jpeg"
                style={{
                  opacity: 0,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                }}
              />
            )}
          />
        </Box>
      </CustomBox> */}

      {/* <FormHelperText
        sx={{ textAlign: 'center', my: 1 }}
        error={!!errors[name]}
      >
        {errors[name] ? (errors[name]?.message as unknown as string) : ''}
      </FormHelperText> */}

      {/* Image Preview */}
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
                  // color="error"
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
    </>
  );
}

export default FileUpload;
