import { motion } from 'framer-motion';
import { IconMail } from '@douyinfe/semi-icons';
import googleIcon from '../assets/google-icon.svg';
import '../App.css'; // Ensure mesh-bg is available

const Login = () => {
  const handleGoogleLogin = () => {
    // Redirect to Google OAuth
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; 
    const redirectUri = 'http://localhost:5173/auth/callback'; // Example redirect URI
    const scope = 'email profile';
    const responseType = 'token'; // or 'code'
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;
    
    window.location.href = authUrl;
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden mesh-bg">
      {/* Overlay with blur effect */}
      <div className="absolute inset-0 backdrop-blur-sm z-0" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 flex min-h-screen items-center justify-center p-4"
      >
        <div className="w-full max-w-[33vw] min-w-[320px] max-h-[33vh] min-h-[350px] bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 space-y-4 border border-white/20 flex flex-col justify-center overflow-auto">
          <div className="text-center shrink-0">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome Back</h1>
            <p className="mt-1 text-xs text-gray-600">Sign in to continue to Aminder</p>
          </div>

          <div className="space-y-3 shrink-0">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium text-sm"
            >
              <img src={googleIcon} alt="Google" className="w-5 h-5" style={{ width: '20px', height: '20px' }} />
              <span>Continue with Google</span>
            </button>

            <button
              disabled
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm bg-gray-50 text-gray-400 cursor-not-allowed font-medium opacity-70 text-sm"
            >
              <IconMail className="text-lg" />
              <span>Continue with Email</span>
            </button>
          </div>

          <div className="text-center text-[10px] text-gray-500 mt-4 shrink-0">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
