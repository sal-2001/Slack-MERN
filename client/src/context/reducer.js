import ProfileIcon from "../assets/ProfileIcon.jpg";
export const initialState = {
  user: null,
  isLoggedIn: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        user: {
          _id: action.user._id,
          name: action.user.name,
          email: action.user.email,
          phone: action.user.phone,
          avatar: action.user.avatar,
        },
        isLoggedIn: true,
      };
    case "REMOVE_USER":
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default reducer;
