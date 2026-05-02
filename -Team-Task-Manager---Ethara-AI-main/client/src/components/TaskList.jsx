import React from 'react';
import { CheckCircle, Clock, Play, XCircle } from 'lucide-react';

const TaskList = ({ tasks = [] }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Play className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <XCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
        <p className="text-gray-500">Tasks will appear here when created.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id || task._id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h4 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                {task.title}
              </h4>
              {task.description && (
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{task.description}</p>
              )}
              <div className="flex items-center gap-4 text-xs text-gray-500">
                {task.assigned_to && (
                  <span className="flex items-center gap-1">
                    👤 Assigned to you
                  </span>
                )}
                {task.due_date && (
                  <span className="flex items-center gap-1">
                    📅 {new Date(task.due_date).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            <div className={`ml-4 flex-shrink-0 px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(task.status)}`}>
              {getStatusIcon(task.status)}
              <span className="ml-1 capitalize">{task.status}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;