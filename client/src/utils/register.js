export const isValid = (data, isLogin) => {
  const fields = ["username", "name", "password"];
  let flag = true;
  fields.every((field) => {
    if ((isLogin || field !== "name") && !data[field]) {
      alert(`${field} is required`);
      flag = false;
      return false;
    }
  });
  return flag;
};

export const getAuthToken = () => {
  return localStorage.getItem("token");
};
