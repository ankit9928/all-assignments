import { useEffect, useState } from "react";
import axios from 'axios';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newtodo, setNewTodo] = useState({ title: "", description: "" });

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todos");
      const data = response.data;
      // console.log(data);
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
      const response = await axios.post("http://localhost:3000/todos",{
        title: newtodo.title,
        description: newtodo.description,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        
      });

      const data = response.data;
      setTodos((prev) => [...prev, data]);
      //setNewTodo({title: "" , description: "" })
    } catch (error) {
      console.log(error);
    }
  };

   const handelDelete = async (todoid) => { 
    try {
      await axios.delete(`http://localhost:3000/todos/${todoid}`);

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
