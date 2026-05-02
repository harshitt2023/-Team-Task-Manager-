

import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
    ArrowLeftIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    CheckIcon,
    ClockIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

const ProjectPage = ({ user }) => {
    const { projectId } = useParams()
    const navigate = useNavigate()
    const [project, setProject] = useState(null)
    const [tasks, setTasks] = useState([])
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        assignedTo: '',
        dueDate: ''
    })
    const [editingTask, setEditingTask] = useState(null)
    const [creatingTask, setCreatingTask] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState([])
    useEffect(() => {
        loadProjectData()
    }, [projectId])

    const loadProjectData = async () => {
        setLoading(true)
        setError(null)

        try {
            await Promise.all([
                fetchProject(),
                fetchUsers(),
                fetchTasks()
            ])
        } catch (err) {
            console.error("❌ Load error:", err)
            setError(err.response?.data?.message || 'Failed to load project')
        } finally {
            setLoading(false)
        }
    }

    // 🔥 FIXED: fetchProject - Better error handling + logging
    const fetchProject = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.get(`http://localhost:5000/api/projects/${projectId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            console.log("✅ Project loaded:", res.data.title)
            console.log("🔍 Project members:", res.data.members)
            console.log("👤 Current user:", { id: user.id, role: user.role })

            setProject(res.data)
        } catch (err) {
            console.error('❌ fetchProject error:', err.response?.data || err)
            throw err
        }
    }

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.get('http://localhost:5000/api/auth/users', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setUsers(res.data)
        } catch (err) {
            console.error('❌ fetchUsers error:', err)
        }
    }

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.get(`http://localhost:5000/api/tasks/project/${projectId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setTasks(res.data)
        } catch (err) {
            console.error('❌ fetchTasks error:', err)
            setTasks([])
        }
    }

    // 🔥 FIXED: isProjectMember - ROBUST CHECK
    const isProjectMember = () => {
        if (!project || !user?.id) return false

        const userId = user.id.toString()

        // ✅ FIX: admin check (case-insensitive)
        if (user.role?.toLowerCase() === 'admin') {
            return true
        }

        // ✅ member check
        return project.members?.some(member => {
            const memberId =
                member._id?.toString() ||
                member.toString() ||
                member.userId?.toString()

            return memberId === userId
        })
    }

    // 🔥 Rest of your functions (unchanged)
    const handleTaskSubmit = async (e) => {
        e.preventDefault()
        setCreatingTask(true)

        try {
            const token = localStorage.getItem('token')
            const taskData = {
                ...newTask,
                projectId,
                status: editingTask ? editingTask.status : 'Todo'
            }

            if (editingTask) {
                await axios.put(`http://localhost:5000/api/tasks/${editingTask._id}`, taskData, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            } else {
                await axios.post('http://localhost:5000/api/tasks', taskData, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            }

            setNewTask({ title: '', description: '', assignedTo: '', dueDate: '' })
            setEditingTask(null)
            await fetchTasks()

        } catch (err) {
            console.error('❌ Task error:', err.response?.data || err)
            alert(err.response?.data?.message || 'Failed to save task')
        } finally {
            setCreatingTask(false)
        }
    }

    const deleteTask = async (taskId) => {
        if (!confirm('Delete this task?')) return

        try {
            const token = localStorage.getItem('token')
            await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            await fetchTasks()
        } catch (err) {
            console.error('❌ Delete error:', err)
            alert('Failed to delete task')
        }
    }

    const editTask = (task) => {
        setEditingTask(task)
        setNewTask({
            title: task.title,
            description: task.description || '',
            assignedTo: task.assignedTo?._id || task.assignedTo || '',
            dueDate: task.dueDate || ''
        })
    }

    const getStatusColor = (status) => {
        const colors = {
            'todo': 'bg-gray-100 text-gray-800 border-gray-200',
            'in progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'done': 'bg-green-100 text-green-800 border-green-200'
        }
        return colors[(status || 'todo').toLowerCase()] || colors.todo
    }

    const canEdit = (task) => {
        return user.role === 'admin' ||
            (task.assignedTo?._id && task.assignedTo._id === user.id) ||
            task.assignedTo === user.id
    }

    // 🔥 Loading, Error, No Project states (unchanged)
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-lg text-gray-600">Loading project...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-8">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto text-center">
                    <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-red-900 mb-2">Error</h2>
                    <p className="text-red-700 mb-6">{error}</p>
                    <div className="space-x-3">
                        <button
                            onClick={loadProjectData}
                            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
                        >
                            Retry
                        </button>
                        <Link to="/dashboard" className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all">
                            Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-8">
                <div className="text-center p-8 max-w-md">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Not Found</h1>
                    <p className="text-gray-600 mb-8">The project doesn't exist or you don't have access.</p>
                    <Link to="/dashboard" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl hover:bg-blue-700 transition-all font-semibold shadow-lg hover:shadow-xl">
                        <ArrowLeftIcon className="h-5 w-5" />
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        )
    }

    // 🔥 FIXED ACCESS CHECK - Now works for Admin + Members
    if (!isProjectMember()) {
        console.log("🚫 Access denied - not a member")
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-8">
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-12 max-w-2xl text-center">
                    <ExclamationTriangleIcon className="h-20 w-20 text-yellow-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">No Access</h2>
                    <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                        You're not a member of <span className="font-bold text-blue-600">"{project.title}"</span>.
                    </p>
                    <Link to="/dashboard" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all font-bold shadow-2xl hover:shadow-3xl">
                        <ArrowLeftIcon className="h-5 w-5" />
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        )
    }

    // 🔥 MAIN UI (unchanged - your beautiful design)
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
            </div>

           
            {process.env.NODE_ENV === 'development' && (
                <div className="mt-12 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-2xl text-xs mx-4 sm:mx-6 lg:mx-8">
                    <details className="cursor-pointer">
                        <summary className="font-bold text-yellow-800 mb-2">🔍 Debug Info</summary>
                        <pre className="text-xs bg-white p-4 rounded-xl overflow-auto">
                            {JSON.stringify({
                                projectId,
                                user: { id: user.id, role: user.role, email: user.email },
                                projectMembers: project.members?.map(m => ({
                                    id: m._id || m,
                                    type: typeof m
                                })),
                                isMember: isProjectMember(),
                                tasksCount: tasks.length
                            }, null, 2)}
                        </pre>
                    </details>
                </div>
            )}
        </div>
    )
}

export default ProjectPage 
