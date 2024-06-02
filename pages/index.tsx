import React, { useState, useEffect } from "react";

const index = () => {
  const [todos, setTodos] = useState<string[]>([]); // specify type as string[]
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    // localStorage.clear();
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() === "") return; // prevent adding empty todo
    setTodos([...todos, inputValue]);
    setInputValue("");
  };
  const deleteTodo = (index: number) => {
    console.log("deleteTodo called with index: ", index);
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    console.log("updatedTodos: ", updatedTodos);
    setTodos(updatedTodos);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="flex flex-col justify-start items-center h-screen">
      <h1 className="font-bold m-5">Todo App</h1>
      <input
        className="border border-b-8"
        placeholder="Your todo here"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={addTodo} className="border border-blue-300 p-2 m-10">
        Add Todo
      </button>
      <ul className="flex flex-col justify-start items-start">
        {todos.map((todo, index) => (
          <li className="w-screen flex justify-center m-2" key={index}>
            <div className="flex justify-around w-4/6 border border-x-black">
              {todo}
              <button
                className="border border-black bg-red-300"
                onClick={() => deleteTodo(index)}
              >
                Delete
              </button>{" "}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default index;
