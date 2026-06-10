"use client";

import { SubmitEventHandler, useState } from "react";
import { LuPlus } from "react-icons/lu";
import Modal from "./Modal";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  // const [todos, setTodos] = useState([]);

  const handleSubmitNewTodo: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const trimmedText = newTaskValue.trim();

    if (!trimmedText) {
      setShowError(true);
      return;
    }

    await addTodo({
      id: uuidv4(),
      text: newTaskValue
    })

    setShowError(false);
    // setTodos([...todos, { id: Date.now(), newTaskValue: trimmedText, done: false}])
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  }

  return (
    <div>
      <button
        className="add-task-btn"
        onClick={() => setModalOpen(true)}
      >
        Add new task
        <LuPlus size={18} />
      </button>

      {modalOpen && (
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmitNewTodo} className="modal-form">
            <h3 className="form-title"> Add new task </h3>
            <div className="modal-action">
              <input
                value={newTaskValue}
                onChange={(e) => {
                  setNewTaskValue(e.target.value)
                  if (showError) setShowError(false)
                }}
                type="text"
                placeholder="Type here"
                className="modal-input"
                onKeyDown={(e) => e.key === 'Enter' && handleSubmitNewTodo}
              />
              <button type="submit" className="sumbit-btn">
                Submit
              </button>
            </div>
            {showError && (
              <p className="error"> Task can't be empty</p>
            )}
          </form>
        </Modal>
      )}
    </div>
  );
}

export default AddTask;