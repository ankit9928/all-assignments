import { useEffect, useState } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newtodo, setNewTodo] = useState({ title: "", description: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos");
      const data = await response.json();
      console.log(data);
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTodo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTodo = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newtodo.title,
          description: newtodo.description,
        }),
      });

      const data = await response.json();
      setTodos((prev) => [...prev, data]);
      //setNewTodo({title: "" , description: "" })
    } catch (error) {
      console.log(error);
    }
  };

   const handelDelete = async (todoid) => { 
    try {
      await fetch(`http://localhost:3000/todos/${todoid}`, {
        method: "DELETE",
      });

      setTodos((prev) => prev.filter((todo) => todo.id !== todoid));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Todo App</h1>

      <div>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={newtodo.title}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={newtodo.description}
          onChange={handleChange}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} {todo.description}{" "}
            <button onClick={() => handelDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
