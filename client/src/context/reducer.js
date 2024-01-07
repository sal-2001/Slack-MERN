export const initialState = {
  user: {
    name: "",
    email: "",
    phone: "",
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
        },
      };
    case "REMOVE_USER":
      return {
        ...state,
        user: {
          name: "",
          email: "",
          phone: "",
        },
      };
    default:
      return state;
  }
};

export default reducer;
