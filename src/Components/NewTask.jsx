import React, { useRef, useState } from "react";
const NewTask = ({ addTask }) => {
  const title = useRef();
  const form = useRef();

  const submitForm = (e) => {
    e.preventDefault();

    const task = {
      title: title.current.value,
      date: new Date().toLocaleString(),
    };

    addTask(task);
    console.log(title.current.value);

    form.current.reset();
  };
  return (
    <form ref={form} onSubmit={submitForm}>
      <label htmlFor="title" className="text-lg text-gray-400">
        Add New Task
      </label>
      <div className="flex gap-x-2 bg-white rounded-md shadow-sm p-2 pl-3 mt-2">
        <input
          type="text"
          id="title"
          className="focus:outline-none w-full"
          maxLength={30}
          placeholder="Title.."
          autoFocus
          required
          ref={title}
        />
        <button
          type="submit"
          className="w-40 px-3 py-2 rounded font-semibold bg-blue-500 text-white hover:bg-blue-600"
        >
          + New Task
        </button>
      </div>
    </form>
  );
};

export default NewTask;
