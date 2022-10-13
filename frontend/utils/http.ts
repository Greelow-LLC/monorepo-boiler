import { getCookie, setCookie } from 'cookies-next';
import { getExpireDate, isExpired } from 'utils/helpers';
import api from 'api';

const getHeaders = () => {
  const token = getCookie('token') as string;
  return {
    token,
    headers: {
      'api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  };
};

const setToken = (token: string) => {
  return { Authorization: `Bearer ${token}` };
};

const refreshToken = async () => {
  const { headers, token } = getHeaders();

  try {
    const {
      data: { token: newToken },
    } = await api.get('refresh-token', {
      headers: {
        ...headers,
        ...setToken(token),
      },
    });

    setCookie('token', newToken);
    return newToken;
  } catch (error) {
    console.error('erroooor');
  }
};

export const postHttp = async (endpoint: string, body: Object) => {
  const { headers, token } = getHeaders();

  const exp = getExpireDate(token);

  let tokenToSend = token;

  if (isExpired(exp)) {
    const newToken = await refreshToken();
    tokenToSend = newToken;
  }

  const { data } = await api.post(`${endpoint}`, body, {
    headers: {
      ...headers,
      ...setToken(tokenToSend),
    },
  });

  return data;
};

export const getHttp = async (endpoint: string, customToken?: any) => {
  const { headers, token } = getHeaders();

  const exp = getExpireDate(token);
  let tokenToSend = token;

  if (isExpired(exp)) {
    const newToken = await refreshToken();
    tokenToSend = newToken;
  }

  const headersToSend = customToken
    ? {
        ...headers,
        Authorization: `Bearer ${customToken}`,
      }
    : {
        ...headers,
        ...setToken(tokenToSend),
      };

  const { data } = await api.get(`${endpoint}`, { headers: headersToSend });

  return data;
};

export const putHttp = async (endpoint: string, id: number, body: Object) => {
  const { headers, token } = getHeaders();

  const exp = getExpireDate(token);

  let tokenToSend = token;

  if (isExpired(exp)) {
    const newToken = await refreshToken();
    tokenToSend = newToken;
  }

  const { data } = await api.put(`${endpoint}/${id}`, body, {
    headers: {
      ...headers,
      ...setToken(tokenToSend),
    },
  });
  return data;
};

export const deleteHttp = async (endpoint: string, id: number) => {
  const { headers, token } = getHeaders();

  const exp = getExpireDate(token);

  let tokenToSend = token;

  if (isExpired(exp)) {
    const newToken = await refreshToken();
    tokenToSend = newToken;
  }

  const { data } = await api.delete(`${endpoint}/${id}`, {
    headers: {
      ...headers,
      ...setToken(tokenToSend),
    },
  });
  return data;
};
