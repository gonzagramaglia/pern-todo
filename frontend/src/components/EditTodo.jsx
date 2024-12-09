import { useState } from "react";

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);
  const [showModal, setShowModal] = useState(false);

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:8020/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      setShowModal(false);
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-warning"
        onClick={() => setShowModal(true)}
      >
        Edit
      </button>

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowModal(false)}
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editting Todo</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={description || ""}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={(e) => updateDescription(e)}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTodo;
