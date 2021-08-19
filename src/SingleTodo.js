import { observer } from 'mobx-react-lite'
import React,{ useState } from 'react';
import Button from './Components/Button/Button';
import Dropdown from "react-dropdown";
import TodoInputForm from './Components/TododInputForm/TodoInputForm';
import { Draggable } from "react-beautiful-dnd";
import { db } from "./Firebase/Firebase";
import { useAuthProvider } from "./Context/AuthProvider";

function SingleTodo({item, index}) {
    const options = ["low", "medium", "high"];
  const [edit, setEdit] = useState(false);
  const { currentUser } = useAuthProvider();

  function editInput(updatedValue){
    if (updatedValue) {
        
        db.collection("Todos")
          .doc(currentUser.uid)
          .collection("todos")
          .doc(item.id)
          .update({
            todo: updatedValue,
          })
          .then(() => {
            item.updateTodo(updatedValue)
          })
          .catch((err) => {
            console.log(err);
          });
          setEdit(false);
      }
  }

    return (
        <div>
          {edit ? (
            <TodoInputForm
              value={item.todo}
              onSubmitTodo={editInput}
              buttonValue="update"
            />
          ) : (
            <div className="todoItem">
              <input
                className="todoCheckbox"
                type="checkbox"
                defaultChecked={item.status === "Done" ? true : false}
                // onChange={() => 
                //     updateProgress(item.id, item.status)
                // }
              />
              
                <div className="todoMessage">{item.todo}</div>
              
              <div onClick={() =>
                 setEdit(true)}>
                <Button content="✏️" />
              </div>
              <Button
            //    onClick={() => 
            //     deleteTodo(item.id)} 
                content="Delete" />
              <div>
                <Dropdown
                  className="dropdown"
                  options={options}
                //   onChange={(e) => 
                //     updatePriority(item.id, e.value)
                // }
                  value={item.priority}
                  placeholder="Select an option"
                />
              </div>
            </div>
          )}
          
    </div>

  );
}


export default observer(SingleTodo) 
