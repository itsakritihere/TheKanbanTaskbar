import Board from './components/Board';
import "./App.css";
export default function App() {
  return (
    <>
      <header className="app-header">
        <h1>Kanban Board</h1>
      </header>
      <Board />
    </>
  );
}