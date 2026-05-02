import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Menu, X, User, LogOut, ChevronDown, Bell,
    LayoutDashboard as DashboardIcon,
    Calendar as CalendarIcon,
    Users as TeamIcon
} from 'lucide-react';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const { user, logout, loading } = useAuth();
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
        { name: 'Calendar', href: '/calendar', icon: CalendarIcon },
        { name: 'Team', href: '/team', icon: TeamIcon }
    ];

    const handleLogout = () => {
        logout();
        setMobileMenuOpen(false);
        setProfileOpen(false);
        toast.success('Logged out successfully!');
    };

    useEffect(() => {
        setMobileMenuOpen(false);
        setProfileOpen(false);
    }, [location]);

    if (loading || !user) {
        return (
            <div className="bg-white border-b border-gray-200 h-16 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">

                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/dashboard" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-gray-900 hidden sm:block">
                                TaskManager
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition ${location.pathname === item.href
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                        }`}
                                >
                                    <Icon className="w-4 h-4 mr-2" />
                                    {item.name}
                                </Link>
                            );
                        })}

                        <button className="relative p-2 text-gray-400 hover:text-gray-600">
                            <Bell className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-400 rounded-full"></span>
                        </button>

                        {/* Profile */}
                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
                            >
                                <User className="w-5 h-5" />
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg z-50">
                                    <div className="p-3 border-b">
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>

                                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                                        Profile
                                    </Link>
                                    <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">
                                        Settings
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t py-2">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="flex items-center px-3 py-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Icon className="w-5 h-5 mr-2" />
                                    {item.name}
                                </Link>
                            );
                        })}

                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-3 py-2"
                        >
                            Sign out
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;