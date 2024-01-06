export const initialState = {
  username: "",
  name: "",
  rooms: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        username: action.data.username,
        name: action.data.name,
        rooms: action.data.rooms,
      };
    case "REMOVE_USER":
      return {
        ...state,
        username: "",
        name: "",
        rooms: "",
      };
    default:
      return state;
  }
};

export default reducer;
