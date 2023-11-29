import { uploadPhoto, createUser } from './utils.js';

async function asyncUploadUser() {
  try {
    const [photo, user] = await Promise.all([uploadPhoto(), createUser()]);
    return {
      photo: photo,
      user: user
    };
  } catch (error) {
    return {
      photo: null,
      user: null
    };
  }
}

export default asyncUploadUser;
