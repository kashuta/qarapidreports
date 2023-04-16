/* eslint-disable import/prefer-default-export */
import { UPLOAD_AVATAR_PHOTO } from './type.redux';

export const setAvatarAction = (data) => ({
  type: UPLOAD_AVATAR_PHOTO,
  payload: data,
});
