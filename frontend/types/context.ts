import { Dispatch, SetStateAction } from 'react';
import { CurrentUserData } from 'types/api';

export type UserContextType = {
  currentUser: CurrentUserData | null;
  logout(): void;
  currentLinkSection: number | null;
  setCurrentLinkSection: Dispatch<SetStateAction<number | null>>;
  login: (token: string) => void;
  setCurrentUser: (user: CurrentUserData) => void;
};
