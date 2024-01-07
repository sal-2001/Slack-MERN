export const addUser = (dispatch, data) => {
  dispatch({
    type: "ADD_USER",
    user: {
      name: data.name,
      email: data.email,
      phone: data?.phone,
      photo: data.avatar,
    },
  });
};
