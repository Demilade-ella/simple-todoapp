import { ITask } from '@/types/tasks';
import Task from './Task';
import styles from './TodoList.module.css';

interface TodoListProps {
  tasks: ITask[]
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className={styles.container}>
      <table className={styles.content}>
        <thead className={styles.header}>
          <tr className={styles.row}>
            <th className={styles.headerItem}>Tasks</th>
            <th className={styles.headerItem}>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.listBody}>
          {tasks.map(task => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;