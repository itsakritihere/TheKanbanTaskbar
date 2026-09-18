
import "./App.css";

function App() {
  return (
    <div className="app">

      <header>
        <h1>Kanban Task Board</h1>
        <button>Add Task</button>
      </header>

      <main className="board">

        {/* To Do */}
        <section className="column">
          <h2>To Do</h2>

          <div className="task-card">
            <h3>Build Login Page</h3>
            <p>Create the login page UI.</p>
            <span>High</span>
          </div>

          <div className="task-card">
            <h3>Add Search</h3>
            <p>Add search functionality.</p>
            <span>Medium</span>
          </div>
        </section>


        {/* In Progress */}
        <section className="column">
          <h2>In Progress</h2>

          <div className="task-card">
            <h3>API Integration</h3>
            <p>Connect the backend API.</p>
            <span>High</span>
          </div>
        </section>


        {/* Done */}
        <section className="column">
          <h2>Done</h2>

          <div className="task-card">
            <h3>Navbar</h3>
            <p>Responsive navigation completed.</p>
            <span>Low</span>
          </div>
        </section>

      </main>

    </div>
  );
}

export default App;

