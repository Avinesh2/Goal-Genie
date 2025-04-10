import { useState } from 'react';
import { motion } from 'framer-motion';
import { createGoal } from '../api/goal';

const GoalSetup = () => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState('');
  const [ytLink, setYtLink] = useState('');
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState({});

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getTaskDate = (startDate, dayNumber) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + (dayNumber - 1));
    return formatDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createGoal({ 
        title, 
        startDate,
        numberOfDays,
        hoursPerDay, 
        ytLink 
      });
  
      if (result.dailyPlan) {
        setPlan(result.dailyPlan);
        
        // Initialize checkboxes
        const initialChecks = {};
        result.dailyPlan.forEach((dayPlan, dayIndex) => {
          initialChecks[dayIndex] = {};
        });
        setCheckedTasks(initialChecks);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const parseTasks = (taskString) => {
    if (!taskString) return [];
    
    const sections = [];
    const lines = taskString.split('\n');
    let currentSection = null;
    
    for (const line of lines) {
      if (line.startsWith('**') && line.endsWith('**')) {
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          title: line.slice(2, -2).trim(),
          tasks: []
        };
      } else if (line.startsWith('*')) {
        const taskLine = line.slice(1).trim();
        const [mainTask, subtasksStr] = taskLine.split(':').map(s => s.trim());
        const subtasks = subtasksStr ? subtasksStr.split('•').map(s => s.trim()) : [];
        
        currentSection.tasks.push({
          mainTask,
          subtasks
        });
      }
    }
    
    if (currentSection) {
      sections.push(currentSection);
    }
    
    return sections;
  };

  const handleCheckboxChange = (dayIndex, sectionIndex, taskIndex, subtaskIndex) => {
    setCheckedTasks(prev => {
      const newChecks = { ...prev };
      const key = subtaskIndex !== undefined 
        ? `${dayIndex}-${sectionIndex}-${taskIndex}-${subtaskIndex}`
        : `${dayIndex}-${sectionIndex}-${taskIndex}`;
      
      newChecks[key] = !prev[key];
      return newChecks;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-3">🎯</span> Create Your Goal Plan
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  What's your goal?
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g., Learn Python Programming"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Number of Days
                  </label>
                  <input
                    type="number"
                    value={numberOfDays}
                    onChange={e => setNumberOfDays(e.target.value)}
                    min="1"
                    placeholder="e.g., 30"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Hours per day
                  </label>
                  <input
                    type="number"
                    value={hoursPerDay}
                    onChange={e => setHoursPerDay(e.target.value)}
                    min="1"
                    max="24"
                    placeholder="e.g., 2"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div className='hidden'>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    YouTube Playlist (optional)
                  </label>
                  <input
                    type="text"
                    value={ytLink}
                    onChange={e => setYtLink(e.target.value)}
                    placeholder="Paste your YouTube playlist link"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors ${
                loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-indigo-700'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Your Plan...
                </span>
              ) : (
                'Generate Plan'
              )}
            </motion.button>
          </form>
        </motion.div>

        {plan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {plan.map((dayPlan, dayIndex) => {
              const sections = parseTasks(dayPlan.task || '');
              const taskDate = getTaskDate(startDate, dayPlan.day);
              
              return (
                <motion.div
                  key={dayIndex}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                >
                  <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                    <span className="mr-2">📅</span> Day {dayPlan.day} - {taskDate}
                  </h3>
                  
                  <div className="space-y-6">
                    {sections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="space-y-3">
                        <h4 className="text-lg font-medium text-blue-600">{section.title}</h4>
                        <div className="pl-4 space-y-4">
                          {section.tasks.map((task, taskIndex) => (
                            <div key={taskIndex} className="space-y-2 bg-gray-50 p-4 rounded-lg">
                              <div className="flex items-start space-x-2">
                                <input
                                  type="checkbox"
                                  checked={checkedTasks[`${dayPlan.day}-${sectionIndex}-${taskIndex}`] || false}
                                  onChange={() => handleCheckboxChange(dayPlan.day, sectionIndex, taskIndex)}
                                  className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                                <div className="flex-1">
                                  <span className="text-gray-700 font-medium">{task.mainTask}</span>
                                  {task.subtasks.length > 0 && (
                                    <div className="mt-2 pl-6 space-y-2">
                                      {task.subtasks.map((subtask, subtaskIndex) => (
                                        <div key={subtaskIndex} className="flex items-start space-x-2">
                                          <input
                                            type="checkbox"
                                            checked={checkedTasks[`${dayPlan.day}-${sectionIndex}-${taskIndex}-${subtaskIndex}`] || false}
                                            onChange={() => handleCheckboxChange(dayPlan.day, sectionIndex, taskIndex, subtaskIndex)}
                                            className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                          />
                                          <span className="text-gray-600 text-sm">{subtask}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GoalSetup;
