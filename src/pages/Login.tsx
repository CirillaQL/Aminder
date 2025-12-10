import { motion } from 'framer-motion';

const Login = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: '100vh' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100vh' }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen flex items-center justify-center bg-gray-50"
    >
      <div className="p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <p className="text-gray-600">Please log in to continue.</p>
        {/* Placeholder for login form */}
      </div>
    </motion.div>
  );
};

export default Login;
