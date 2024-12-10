// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { ClassProvider } from './contexts/ClassContext';
import Layout from './components/layout/Layout';
import ClassesPage from './pages/classes';
import AttendancePage from './pages/attendance';

function App() {
  return (
    <ClassProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<ClassesPage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
        </Routes>
      </Layout>
    </ClassProvider>
  );
}

export default App;