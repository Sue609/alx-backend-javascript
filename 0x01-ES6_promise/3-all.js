import { uploadPhoto, createUser } from './utils.js';

export default function handleProfileSignup() {
  Promise.all([uploadPhoto(), createUser()])
    .then(([photoResponse, user]) => {
      console.log(`${photoResponse.body} ${user.firstName} ${user.lastName}`);
    })
    .catch((error) => {
      console.error('Signup system offline');
    });
}
