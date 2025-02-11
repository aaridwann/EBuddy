const initialData = {
  id: '',
  uid: '',
  email: '',
  displayName: '',
  photoURL: '',
};

const shimmerMapContent: Array<{width: number, height: number}> = [
  {
    width: 200,
    height: 20,
  },
  {
    width: 300,
    height: 25,
  },
  {
    width: 260,
    height: 18,
  },
];
const defaultImage = 'https://static-00.iconduck.com/assets.00/avatar-default-icon-512x512-4mctvw9j.png';
const defaultAlt = 'User';

export { initialData, shimmerMapContent, defaultImage, defaultAlt };