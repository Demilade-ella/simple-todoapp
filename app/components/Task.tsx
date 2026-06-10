"use client";

import { SubmitEventHandler, useState } from 'react';
import { useRouter } from "next/navigation";
import { ITask } from '@/types/tasks';
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { editTodo } from '@/api';
import { deleteTodo } from '@/api';
import Modal from './Modal';
import styles from './Task.module.css';

interface TaskProps {
  task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit
    })
    setOpenModalEdit(false);
    router.refresh();
  }

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDelete(false);
    router.refresh();
  }

  return (
    <tr key={task.id} className={styles.bodyRow}>
      <td className={styles.bodyItem}> {task.text} </td>
      <td className={styles.bodyIcon}>
        <FaEdit
          className={styles.edit}
          size={20}
          onClick={() => setOpenModalEdit(true)}
        />
        {openModalEdit  && (
          <Modal isOpen={openModalEdit} onClose={() => setOpenModalEdit(false)}>
          <form onSubmit={handleSubmitEditTodo} className="modal-form">
            <h3 className="form-title"> Edit task </h3>
            <div className="modal-action">
              <input
                value={taskToEdit}
                onChange={e => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="modal-input"
              />
              <button type="submit" className="sumbit-btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        )}
        <FaTrashCan
          className={styles.delete}
          size={20}
          onClick={() => setOpenModalDelete(true)}
        />
        {openModalDelete  && (
          <Modal isOpen={openModalDelete} onClose={() => setOpenModalDelete(false)}>
            <h3 className={styles.deleteMessage}> Are you sure you want to delete this task? </h3>
            <div className={styles.modalAction}>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDeleteTask(task.id)}
              >
                Yes
              </button>
            </div>
          </Modal>
        )}
      </td>
    </tr>
  );
}

export default Task;