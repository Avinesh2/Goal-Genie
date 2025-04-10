import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import GoalSetup from '../pages/GoalSetup';
import Dashboard from '../pages/Dashboard';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/goal-setup" element={<GoalSetup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
