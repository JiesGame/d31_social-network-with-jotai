import { atomWithReducer } from 'jotai/utils';

const userReducer = (prevState, action) => {
  const { type, data } = action;

  switch (type) {
    case 'update':
      return { ...prevState, ...data };
    default:
      throw new Error('Unknown action type');
  }
};

export const userAtom = atomWithReducer(
  { token: '', id: '', username: '', email: '', description: '' },
  userReducer
);