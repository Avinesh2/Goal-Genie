import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/goal-setup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome to GoalGenie <span className="text-indigo-600">🎯</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your AI-powered goal planner that helps you achieve your dreams
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">Smart Planning</h3>
              <p className="text-gray-600">Create and track your goals with AI assistance</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-600">Monitor your achievements and stay motivated</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">AI Insights</h3>
              <p className="text-gray-600">Get personalized recommendations and tips</p>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
            className="mt-12 bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
  