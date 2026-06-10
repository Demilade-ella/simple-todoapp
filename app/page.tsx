import { getAllTodos } from '@/api';
import AddTask from './components/AddTask';
import TodoList from './components/TodoList';
import './globals.css';

export default async function Home() {
  const tasks = await getAllTodos();
  return (
    <main className='todo-container'>
      <div className='title'>
        <h1> Todo List App</h1>
        <AddTask />
      </div>
      <TodoList tasks={tasks} />
    </main>
  );
}
