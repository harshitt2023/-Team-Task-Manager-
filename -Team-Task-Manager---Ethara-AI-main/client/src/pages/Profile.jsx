import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Shield, Calendar, MapPin, Phone, 
  Camera, Edit3, Save, X, Upload 
} from 'lucide-react';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, refetchData } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'member',
    phone: '',
    location: '',
    bio: '',
    avatar: null
  });
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData(prev => ({ ...prev, avatar: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      toast.success('Profile updated successfully!');
      await refetchData();
      setEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Profile</h1>
          <p className="text-xl text-gray-600">Manage your account information</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl border-4 border-white">
                    {avatarPreview ? (
                      <img 
                        src={avatarPreview} 
                        alt="Avatar" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <User className="w-16 h-16 text-white" />
                    )}
                  </div>
                  {editing && (
                    <label className="absolute -bottom-2 -right-2 bg-white p-3 rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200 border-4 border-gray-100">
                      <Camera className="w-5 h-5 text-gray-600" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  )}
                </div>
                
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500 capitalize">
                    <Shield className="w-4 h-4" />
                    <span>{profileData.role} Role</span>
                  </div>
                </div>

                <div className="w-full pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setEditing(!editing)}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                      editing
                        ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                    }`}
                  >
                    {editing ? (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-4 h-4" />
                        Edit Profile
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Info */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <User className="w-6 h-6 text-blue-600" />
                    Personal Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        disabled={!editing}
                        className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          editing 
                            ? 'border-gray-300 focus:outline-none shadow-sm' 
                            : 'bg-gray-50 border-gray-200 cursor-not-allowed'
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        disabled={!editing}
                        className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          editing 
                            ? 'border-gray-300 focus:outline-none shadow-sm' 
                            : 'bg-gray-50 border-gray-200 cursor-not-allowed'
                        }`}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        disabled={!editing}
                        className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          editing 
                            ? 'border-gray-300 focus:outline-none shadow-sm' 
                            : 'bg-gray-50 border-gray-200 cursor-not-allowed'
                        }`}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={profileData.location}
                        onChange={handleInputChange}
                        disabled={!editing}
                        className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          editing 
                            ? 'border-gray-300 focus:outline-none shadow-sm' 
                            : 'bg-gray-50 border-gray-200 cursor-not-allowed'
                        }`}
                        placeholder="City, Country"
                      />
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Bio</label>
                  <textarea
                    name="bio"
                    rows={4}
                    value={profileData.bio}
                    onChange={handleInputChange}
                    disabled={!editing}
                    className={`w-full px-4 py-3 border rounded-xl resize-vertical transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      editing 
                        ? 'border-gray-300 focus:outline-none shadow-sm' 
                        : 'bg-gray-50 border-gray-200 cursor-not-allowed'
                    }`}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                {/* Actions */}
                {editing && (
                  <div className="flex gap-4 pt-6 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(false);
                        setAvatarPreview(null);
                      }}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                    >
                      <X className="w-4 h-4 inline mr-2" />
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;