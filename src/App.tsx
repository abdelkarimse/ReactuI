
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Dashboard } from './Admin/Dashboard'
import './App.css'
import DashboardClient from './Client/DashboardClient';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/dashboard/*" element={<Dashboard />} />
        <Route path="/client/dashboard/*" element={<DashboardClient />} />
      </Routes>
    </Router>
  )
}

export default App
