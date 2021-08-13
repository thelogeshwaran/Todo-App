
export const initialState = {
  data: [],
  sort: "None",
  filter: "All",
};

export function reducerFunc(state, { type, payload }) {
  switch (type) {
    case "DATA_FROM_LOCAL":
      return { ...state, data: payload };
    case "SORT":
      return { ...state, sort: payload };
    case "FILTER":
      return { ...state, filter: payload };
    case "UPDATE_PRIORITY":
      const updatedData = state.data.map((item) => {
        if (item.id === payload.id) {
          item.priority = payload.value;
          return item;
        }
        return item;
      });
      return { ...state, data: updatedData };
    case "UPDATE_PROGRESS":
      const updatedProgress = state.data.map((item) => {
        if (item.id === payload.id) {
          const newItem = { ...item };
          newItem.status = payload.value;
          return newItem;
        }
        return item;
      });
      return { ...state, data: updatedProgress };
    case "UPDATE_EDITDATA":
      const editedData = state.data.map((item) => {
        if (item.id === payload.id) {
          item.todo = payload.value;
          return item;
        }
        return item;
      });
      return { ...state, data: editedData };
    case "UPDATE_DELETEDATA":
      const deletedData = state.data.filter((item) => item.id !== payload);
      return { ...state, data: deletedData };
    case "ADD_DATA":
      return { ...state, data: [...state.data, payload]};
    default:
      return state;
  }
}
