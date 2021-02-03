export const initialState = {
  currentUser: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};
