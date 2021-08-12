import {db} from "../Firebase/Firebase";
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
      updatePriority(payload)
      const updatedData = state.data.map((item) => {
        if (item.id === payload.id) {
          item.priority = payload.value;
          return item;
        }
        return item;
      });
      return { ...state, data: updatedData };
    case "UPDATE_PROGRESS":
      updateProgress(payload)
      const updatedProgress = state.data.map((item) => {
        if (item.id === payload.id) {
          const newItem = { ...item };
          newItem.status =
            payload.value === "Inprogress" ? "Done" : "Inprogress";
          return newItem;
        }
        return item;
      });
      return { ...state, data: updatedProgress };
    case "UPDATE_EDITDATA":
      editData(payload)
      const editedData = state.data.map((item) => {
        if (item.id === payload.id) {
          item.todo = payload.value;
          return item;
        }
        return item;
      });
      return { ...state, data: editedData };
    case "UPDATE_DELETEDATA":
      deleteData(payload)
      const deletedData = state.data.filter((item) => item.id !== payload);
      return { ...state, data: deletedData };
    case "ADD_DATA":
      addData(payload)
      return { ...state, data: [...state.data, payload]};
    default:
      return state;
  }
}


function addData(todo){
  db.collection("Todos").doc(todo.id).set(todo)
}

function deleteData(id){
  db.collection("Todos").doc(id).delete();
}

function editData(data){
  db.collection("Todos").doc(data.id).update({
    todo : data.value
  })
}

function updatePriority(payload){
  db.collection("Todos").doc(payload.id).update({
    priority : payload.value
  })
}

function updateProgress(payload){
  db.collection("Todos").doc(payload.id).update({
    status : payload.value === "Inprogress" ? "Done" : "Inprogress"
  })
}