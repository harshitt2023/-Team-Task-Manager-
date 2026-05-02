import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Plus, X, User, Calendar } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const CreateTaskModal = ({
  isOpen,
  onClose,
  projectId,
  onSuccess,
  users = [],
  currentUser
}) => {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: '',
    status: 'pending'
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: '',
        description: '',
        assignedTo: '',
        dueDate: '',
        status: 'pending'
      });
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectId) return toast.error('No project selected');

    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      await axios.post(`${API_URL}/tasks`, {
        ...formData,
        project: projectId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Task created successfully!');
      onSuccess?.();
      onClose();

    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">

      <div className="fixed inset-0 bg-black/40" />

      <div className="fixed inset-0 flex items-center justify-center p-4">

        <Dialog.Panel className="bg-white w-full max-w-md rounded-2xl p-6">

          {/* Header */}
          <div className="flex justify-between mb-4">
            <Dialog.Title className="text-xl font-bold flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create Task
            </Dialog.Title>

            <button onClick={onClose}>
              <X />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="title"
              placeholder="Task title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full border p-3 rounded-lg"
              required
              disabled={loading}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border p-3 rounded-lg"
              disabled={loading}
            />

            {/* Assigned Users FIXED */}
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleInputChange}
              className="w-full border p-3 rounded-lg"
              disabled={loading}
            >
              <option value="">Unassigned</option>

              <option value={currentUser?._id}>
                Me ({currentUser?.name})
              </option>

              {users.map(user => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              className="w-full border p-3 rounded-lg"
              disabled={loading}
            />

            {/* Buttons */}
            <button
              type="submit"
              disabled={loading || !formData.title}
              className="w-full bg-purple-600 text-white py-3 rounded-lg"
            >
              {loading ? "Creating..." : "Create Task"}
            </button>

          </form>

        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CreateTaskModal;