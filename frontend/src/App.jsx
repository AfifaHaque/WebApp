import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import TaskManagement from "./pages/TaskManagement";
import StudySchedule from "./pages/StudySchedule";
import CalendarView from "./pages/CalendarView";
import DeadlineTracker from "./pages/DeadlineTracker";
import ProgressTracking from "./pages/ProgressTracking";
import FileManager from "./pages/FileManager";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />

        <div className="main-content">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<TaskManagement />} />
            <Route path="/study-schedule" element={<StudySchedule />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/deadlines" element={<DeadlineTracker />} />
            <Route path="/progress" element={<ProgressTracking />} />
            <Route path="/files" element={<FileManager />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;