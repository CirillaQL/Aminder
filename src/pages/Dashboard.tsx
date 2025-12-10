import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-8 bg-gray-100"
    >
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to your Aminder dashboard.</p>
    </motion.div>
  );
};

export default Dashboard;
