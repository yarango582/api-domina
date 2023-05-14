import axios, { AxiosResponse } from "axios";

const urlRegister =
  import.meta.env.VITE_API_AUTH_BASE + import.meta.env.VITE_API_AUTH_REGISTER;
const urlLogin = import.meta.env.VITE_API_AUTH_BASE + import.meta.env.VITE_API_AUTH_LOGIN;

interface RegisterProps {
  username: string;
  password: string;
  email: string;
}
interface LoginProps {
  password: string;
  email: string;
}

export const register = async ({ username, password, email }: RegisterProps) => {
  const response: AxiosResponse = await axios.post(urlRegister, {
    username,
    password,
    email,
  });

  if (response.status === 201) {
    return response.data;
  }
  if (response.status >= 400) {
    throw new Error(response.data.message);
  }
  return response.data;
};

export const login = async ({ email, password }: LoginProps) => {
  const response: AxiosResponse = await axios.post(urlLogin, {
    email,
    password,
  });

  if (response.status === 200) {
    return response.data;
  }
  if (response.status >= 400) {
    throw new Error(response.data.message);
  }
  return response.data;
};
