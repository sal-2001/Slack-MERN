import ProfileIcon from "../assets/ProfileIcon.jpg"
export const initialState = {
  user: {
    name: "",
    email: "",
    phone: "",
    photo: ProfileIcon
  },
  isLoggedIn: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        user: {
          name: action.user.name,
          email: action.user.email,
          phone: action.user.phone,
          photo: action.user.photo,
        },
        isLoggedIn: true,
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
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default reducer;
