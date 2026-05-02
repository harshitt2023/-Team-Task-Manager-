import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);  // ✅ State OK
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async () => {
    try {
      // ✅ FIXED - Destructure ALL 4 responses
      const [userRes, projectsRes, tasksRes, usersRes] = await Promise.all([
        axios.get(`${API_URL}/auth/me`).catch(() => null),
        axios.get(`${API_URL}/projects`).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/tasks`).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/users`).catch(() => ({ data: [] }))  // ✅ 4th response
      ]);
      
      if (userRes?.data?.user) {
        setUser(userRes.data.user);
      }
      setProjects(projectsRes.data || []);
      setTasks(tasksRes.data || []);
      setUsers(usersRes.data || []);  // ✅ FIXED - Set users state
    } catch (error) {
      console.error('Auth error:', error);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user);
      await fetchUserData();  // ✅ Fetches users too
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
      throw error;
    }
  };

  const signup = async (userData) => {
    try {
      const res = await axios.post(`${API_URL}/auth/signup`, userData);
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user);
      await fetchUserData();  // ✅ Fetches users too
      toast.success('Account created!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Signup failed');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setProjects([]);
    setTasks([]);
    setUsers([]);  // ✅ Clear users
    navigate('/login');
    toast.success('Logged out!');
  };

  const refetchData = fetchUserData;

  return {
    user,
    projects,
    tasks,
    users,        // ✅ FIXED - Export users
    loading,
    login,
    signup,
    logout,
    refetchData
  };
};

export default useAuth;