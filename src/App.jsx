import Board from './components/Board';
import "./App.css";
export default function App() {
  return (
    <>
      <header className="app-header">
        <h1>Kanban Board</h1>
        <p>Organize your work, track progress, and get things done.</p>
      </header>
      <Board />
    </>
  );
}