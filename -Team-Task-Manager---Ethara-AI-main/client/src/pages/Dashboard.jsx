import { useState, useEffect } from 'react';
import { Plus, Users, CalendarDays, CheckCircle2 } from 'lucide-react';  // ✅ CalendarDays instead of Calendar
import useAuth from '../hooks/useAuth';
import ProjectCard from '../components/ProjectCard';
import TaskList from '../components/TaskList';
import CreateProjectModal from '../components/CreateProjectModal';
import CreateTaskModal from '../components/CreateTaskModal';

const Dashboard = () => {
  const { user,users, projects, tasks, loading, refetchData } = useAuth();
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const overdueTasks = tasks.filter(task => 
    task.due_date && new Date(task.due_date) < new Date() && task.status !== 'completed'
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header + SINGLE New Project Button */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name || 'User'}!
            </h1>
            <p className="text-gray-600 mt-1">
              {user?.role === 'admin' ? 'Admin' : 'Member'} Dashboard
            </p>
          </div>
          {user?.role === 'admin' && (
            <button
              onClick={() => setShowProjectModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 font-medium"
            >
              <Plus size={20} />
              New Project
            </button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-all">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Projects</p>
                <p className="text-3xl font-bold text-gray-900">{projects.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-all">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-xl">
                <CalendarDays className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-3xl font-bold text-gray-900">{overdueTasks.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-all">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900">
                  {tasks.filter(t => t.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-all lg:col-span-1">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Team Members</p>
                <p className="text-3xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects - NO DUPLICATE BUTTON */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? (
            projects.map(project => (
              <ProjectCard
                key={project.id || project._id}
                project={project}
                onSelect={() => setSelectedProject(project)}
                userRole={user.role}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <Users className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-500 mb-6">Create your first project to get started</p>
              {user.role === 'admin' && (
                <button
                  onClick={() => setShowProjectModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Create First Project
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Tasks - Only show when project selected */}
      {selectedProject && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{selectedProject.name}</h2>
              <p className="text-xl text-gray-600 mt-2">{selectedProject.description}</p>
            </div>
            <button
              onClick={() => setShowTaskModal(true)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Plus size={20} />
              New Task
            </button>
          </div>
          
          <TaskList tasks={tasks.filter(t => t.project_id === selectedProject.id || t.project === selectedProject.id)} />
        </section>
      )}

      {/* Modals */}
      <CreateProjectModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        onSuccess={refetchData}
      />
      <CreateTaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
         projectId={selectedProject?._id || selectedProject?.id} 
        onSuccess={refetchData}
        users={users}  
      />
    </div>
  );
};

export default Dashboard;