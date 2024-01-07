import ProfileIcon from "./assets/ProfileIcon.jpg"
export const initialState = {
  user: {
    name: "",
    email: "",
    phone: "",
    photo: ProfileIcon
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
          photo: ProfileIcon
        },
      };
    default:
      return state;
  }
};

export default reducer;
