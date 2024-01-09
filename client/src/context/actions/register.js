export const addUser = (dispatch, data) => {
  console.log("adding user : ", data);
  dispatch({
    type: "ADD_USER",
    user: {
      _id: data?._id,
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      avatar: data?.avatar,
    },
  });
};
