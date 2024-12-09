import { useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");
  const [placeholder, setPlaceholder] = useState("Type something");
  const [isFocused, setIsFocused] = useState(false);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:8020/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!description) {
      setIsFocused(false);
    }
  };

  return (
    <>
      <h1 className="text-center mt-5">PERN ToDo List</h1>
      <form className="d-flex mx-4 mt-3" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          placeholder={isFocused ? "" : placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </>
  );
};

export default InputTodo;
