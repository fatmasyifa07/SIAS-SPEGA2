import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { StudentData } from './data/students';

export default function App() {
  const [currentStudent, setCurrentStudent] = useState<StudentData | null>(null);

  const handleLogin = (student: StudentData) => {
    setCurrentStudent(student);
  };

  const handleLogout = () => {
    setCurrentStudent(null);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans antialiased text-slate-900">
      <AnimatePresence mode="wait">
        {!currentStudent ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Login onLogin={handleLogin} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Dashboard student={currentStudent} onLogout={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
