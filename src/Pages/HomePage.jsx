import React, { useState } from "react";
import NewTask from "../Components/NewTask";
import TodoItem from "../Components/TodoItem";
import { toast } from "react-toastify";

const HomePage = () => {
  const [todos, setTodos] = useState([]);

  const addTask = (task) => {
    setTodos((prevTodos) => [...prevTodos, task]);
    toast.success("Task Added successfully!", { autoClose: 2000 });
  };
  const deleteTask = (id) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== id));
    toast.error("Task Delete successfully!", { autoClose: 2000 });
  };
  const updateTask = (task, id) => {
    setTodos((prevTodos) => prevTodos.map((t, i) => (i === id ? task : t)));
    toast.info("Task Update successfully!", { autoClose: 2000 });
  };
  return (
    <>
      <NewTask addTask={addTask} />
      <ul className="bg-gray-200 rounded-md shadow-sm p-4">
        {todos.map((todo, i) => (
          <TodoItem
            key={i}
            id={i}
            todo={todo}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
      </ul>
    </>
  );
};

export default HomePage;
