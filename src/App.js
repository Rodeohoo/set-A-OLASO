import "./App.css";
import NewTask from "./components/NewTask";

function App() {
  return (
    <main className="app">
      <header className="pageHeader">
        <p className="eyebrow">TASK MANAGER</p>
        <h1>My Scheduled Tasks</h1>
        <p>Create, organize, and update your tasks in one place.</p>
      </header>

      <NewTask />
    </main>
  );
}

export default App;
