import { atomWithReducer } from 'jotai/utils';
import Cookies from 'js-cookie';

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
  {id: Cookies.get('id') || "", username: Cookies.get('username') || "", email: Cookies.get('email') || "", description: Cookies.get('description') || "" },
  userReducer
);