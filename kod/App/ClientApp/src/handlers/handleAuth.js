import { saveUser, saveToken } from "../store/actions/authActions";

export const handleAuth = (data, dispatch ) => {
  const tokenData = JSON.parse(atob(data.token.split(".")[1]));
  const user = {
    //id and roleid are strings, REMEMBER THAT!
    role: tokenData.role,
    id: tokenData.unique_name,
    name: data.fullName,
    email: data.email,
    phone: data.phone
  };
  dispatch(saveUser(user));
  dispatch(saveToken(data.token));
};
