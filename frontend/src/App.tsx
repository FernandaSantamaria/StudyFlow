import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Subjects from "./pages/Subjects";
import StudySessions from "./pages/StudySessions";

import Notifications from "./pages/Notifications";
import StudyGoals from "./pages/StudyGoals";
import Resources from "./pages/Resources";
import Flashcards from "./pages/Flashcards";

function App() {

  const user = localStorage.getItem("user");

  return (

    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/dashboard"
        element={
          user
            ? <Dashboard />
            : <Navigate to="/" />
        }
      />

      <Route
        path="/tasks"
        element={
          user
            ? <Tasks />
            : <Navigate to="/" />
        }
      />

      <Route
        path="/subjects"
        element={
          user
            ? <Subjects />
            : <Navigate to="/" />
        }
      />

      <Route 
        path="/notifications" 
        element={
          user 
            ? <Notifications /> 
            : <Navigate to="/" />
        } 
        />
        
      <Route 
        path="/study-goals" 
        element={
            user  
            ? <StudyGoals /> 
            : <Navigate to="/" />
        } 
        />

      <Route 
        path="/resources" 
        element={
         user 
            ? <Resources /> 
            : <Navigate to="/" />
        } 
        />

      <Route
        path="/study-sessions"
        element={
          user
            ? <StudySessions />
            : <Navigate to="/" />
        }
      />
      <Route 
        path="/flashcards" 
        element={
          user 
            ? <Flashcards /> 
            : <Navigate to="/" />
       } 
      />

    </Routes>

  );
}

export default App;