import { destroy, flow, getParent, types } from "mobx-state-tree";
import { db } from "../Firebase/Firebase";
import { filterData } from "../Utils/Todos/FilterData";
import { sortData } from "../Utils/Todos/SortData";

export const TodoModel = types
  .model("TodoModel", {
    todo: types.string,
    status: types.string,
    priority: types.string,
    id: types.string,
  })
  .actions((self) => ({
    updatePriority(priority) {
      self.priority = priority;
    },
    updateStatus(status) {
      self.status = status;
    },
    updateTodo(todo) {
      self.todo = todo;
    },
    removeTodo() {
      getParent(self, 2).remove(self);
    },
  }));

export const TodoStore = types
  .model("TodoStore", {
    todos: types.array(TodoModel),
    filter: types.string,
    sort: types.string,
  })
  .actions((self) => ({
    addNewTodo(todo) {
      self.todos.push(todo);
    },
    setTodos(todos) {
      self.todos = todos;
    },
    fetchTodos: flow(function* (id) {
      try {
        const data = yield db
          .collection("Todos")
          .doc(id)
          .collection("todos")
          .get();
        const fetchedData = data.docs?.map((item) => item.data());
        if (fetchedData) {
          self.setTodos(fetchedData);
        }
      } catch (err) {
        console.log(err);
      }
    }),
    setFilter(filter) {
      self.filter = filter;
    },
    setSort(sort) {
      const tempData = sortData(self.todos, sort);
      self.setTodos(tempData);
      self.sort = sort;
    },
    remove(item) {
      destroy(item);
    },
  }))
  .views((self) => ({
    filteredData() {
      const todos = filterData(self.todos, self.filter);
      return todos;
    },
  }));
