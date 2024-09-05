const initialState = {
  users: [],
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] };

    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case "EDIT_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };

    default:
      return state;
  }
}
