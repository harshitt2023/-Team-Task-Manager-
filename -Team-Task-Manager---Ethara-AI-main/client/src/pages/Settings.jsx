import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Lock, Bell, Globe, Moon, User, 
  Save, Eye, EyeOff, CheckCircle, AlertCircle, 
  Edit3
} from 'lucide-react';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false
  });
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    activityPublic: false,
    emailPublic: false
  });

  const tabs = [
    { id: 'account', name: 'Account', icon: User },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy', icon: Globe }
  ];

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    toast.success('Password updated successfully!');
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyToggle = (key) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Settings</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Customize your preferences and manage your account security
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600 border-2 border-blue-200 shadow-sm'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-sm border border-transparent'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3 flex-shrink-0 group-hover:text-blue-600" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              {activeTab === 'account' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">Account Settings</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
                      <div className="space-y-4 text-sm">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div>
                            <p className="font-medium text-gray-900">Name</p>
                            <p className="text-gray-500">{user.name}</p>
                          </div>
                          <Link to="/profile" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                            Edit <Edit3 className="w-4 h-4" />
                          </Link>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div>
                            <p className="font-medium text-gray-900">Email</p>
                            <p className="text-gray-500">{user.email}</p>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            <CheckCircle className="w-3 h-3 inline mr-1" />
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
                      <div className="space-y-3">
                        <button className="w-full flex items-center justify-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all duration-200">
                          <Lock className="w-5 h-5 text-gray-400" />
                          Change Password
                        </button>
                        <button className="w-full p-4 border border-orange-200 bg-orange-50 rounded-xl text-orange-800 hover:bg-orange-100 transition-all duration-200">
                          <AlertCircle className="w-5 h-5 inline mr-2" />
                          <span>Delete Account</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">Security</h2>
                  <form onSubmit={handlePasswordChange} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="New password (min 8 chars)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                    >
                      <Save className="w-5 h-5 inline mr-2" />
                      Update Password
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">Notifications</h2>
                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <label key={key} className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all duration-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => handleNotificationToggle(key)}
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <div className="ml-4">
                          <p className="font-medium text-gray-900 capitalize">{key}</p>
                          <p className="text-sm text-gray-500">Get notified when some events occur.</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">Privacy Settings</h2>
                  <div className="space-y-4">
                    {Object.entries(privacy).map(([key, value]) => (
                      <label key={key} className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all duration-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => handlePrivacyToggle(key)}
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <div className="ml-4">
                          <p className="font-medium text-gray-900 capitalize">{key.replace('Public', '')}</p>
                          <p className="text-sm text-gray-500">
                            {key === 'profilePublic' 
                              ? 'Anyone can see your profile details' 
                              : key === 'activityPublic' 
                              ? 'Your task activity will be visible to team members' 
                              : 'Your email will be visible in project settings'
                            }
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;