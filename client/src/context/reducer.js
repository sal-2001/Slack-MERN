export const initialState = {
  user: {
    name: "",
    email: "",
    phone: "",
    photo:
      "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        user: {
          name: action.data.name,
          email: action.data.email,
          phone: action.data.phone,
          photo: action.data.photo,
        },
      };
    case "REMOVE_USER":
      return {
        ...state,
        user: {
          name: "",
          email: "",
          phone: "",
          photo:
            "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg",
        },
      };
    default:
      return state;
  }
};

export default reducer;
