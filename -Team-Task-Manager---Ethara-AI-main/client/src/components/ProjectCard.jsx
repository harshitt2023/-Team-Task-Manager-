import React from 'react';
import { Eye, Users, MoreVertical } from 'lucide-react';

const ProjectCard = ({ project, onSelect, userRole = 'member' }) => {
  return (
    <div 
      className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1" 
      onClick={onSelect}
    >
      <div className="p-6 hover:bg-gray-50 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-2">
              {project.name}
            </h3>
            {project.description && (
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {project.description}
              </p>
            )}
          </div>
          <div className="ml-3 flex-shrink-0">
            <div className="flex items-center gap-2 text-xs bg-gray-100 px-3 py-1 rounded-full group-hover:bg-blue-100 transition-colors">
              <Users className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
              <span className="font-medium text-gray-800 group-hover:text-blue-700">
                {project.members?.length || 1} members
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            Created {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'Today'}
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
            {userRole === 'admin' && (
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                <MoreVertical className="w-4 h-4" />
              </button>
            )}
            <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-sm hover:shadow-md flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span className="text-xs font-medium hidden sm:inline">View</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;