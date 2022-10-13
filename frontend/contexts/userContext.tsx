import { getCookie, deleteCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { CurrentUserData } from 'types/api';
import { UserContextType } from 'types/context';
import { getExpireDate, isExpired, decodeToken } from 'utils/helpers';
import { getHttp } from 'utils/http';

type UserProviderProps = {
  children: ReactNode;
};

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserData | null>(null);

  const { replace } = useRouter();

  const [currentLinkSection, setCurrentLinkSection] =
    useState<number | null>(null);

  useEffect(() => {
    const loggedUser = getCookie('user');

    const checkUser = async () => {
      try {
        const token = getCookie('token') as string;
        const exp = getExpireDate(token);

        if (isExpired(exp)) return logout();

        const user = await getHttp(`users/${loggedUser?.toString()}`);

        return setCurrentUser(user);
      } catch (error) {
        logout();
      }
    };
    loggedUser && checkUser();
  }, []); // eslint-disable-line

  const login = async (token: string) => {
    const {
      user: { id },
    } = decodeToken(token as string) as { user: { id: string } };

    const user = await getHttp(`users/${id.toString()}`, token);

    if (user) {
      setCurrentUser(user);
      setCookie('token', token);
      setCookie('user', user.id);
      replace('/');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    deleteCookie('user');
    deleteCookie('token');
    replace('/sign-in');
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        logout,
        login,
        currentLinkSection,
        setCurrentLinkSection,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
