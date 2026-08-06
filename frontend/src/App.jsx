import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import TaskManagement from "./pages/TaskManagement";
import StudySchedule from "./pages/StudySchedule";
import CalendarView from "./pages/CalendarView";
import DeadlineTracker from "./pages/DeadlineTracker";
import ProgressTracking from "./pages/ProgressTracking";
import FileManager from "./pages/FileManager";
import Profile from "./pages/Profile";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function AppLayout() {
  return (
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
          <Route path="/profile" element={<Profile />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public authentication pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected application */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;