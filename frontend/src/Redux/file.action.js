/* eslint-disable import/prefer-default-export */
import { SET_IMAGES, SET_IMAGES_NAMES, UPLOAD_AVATAR_PHOTO } from './type.redux';

export const setAvatarAction = (data) => ({
  type: UPLOAD_AVATAR_PHOTO,
  payload: data,
});

export const setImagesAction = (data) => ({
  type: SET_IMAGES,
  payload: data,
});

export const setImageNamesAction = (data) => ({
  type: SET_IMAGES_NAMES,
  payload: data,
});
