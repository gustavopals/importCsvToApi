import axios from "axios";

export async function doLogin() {
  const loginUrl = `${process.env.API_URL}api/login`;
  const loginParams = {
    user: "dev",
    password: "123456",
    rememberUser: false,
  };
  const loginResult = await axios.post(loginUrl, loginParams);
  return {
    token: loginResult.data.token,
  };
}
