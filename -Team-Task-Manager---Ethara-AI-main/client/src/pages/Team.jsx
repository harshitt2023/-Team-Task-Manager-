import React, { useState } from 'react';
import { Users, User, Mail, UserPlus, X, Trash2 } from 'lucide-react';

const Team = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const teamMembers = [
    { id: 1, name: 'John Doe', role: 'Admin', email: 'john@team.com' },
    { id: 2, name: 'Jane Smith', role: 'Member', email: 'jane@team.com' },
    { id: 3, name: 'Bob Johnson', role: 'Member', email: 'bob@team.com' },
    { id: 4, name: 'Alice Brown', role: 'Member', email: 'alice@team.com' }
  ];

  const getInitial = (name) => name?.charAt(0).toUpperCase();

  const handleInvite = (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    console.log('Invite sent to:', inviteEmail);
    alert(`Invite sent to ${inviteEmail}!`);

    setInviteEmail('');
    setShowInviteModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
          <Users className="w-10 h-10 text-purple-600" />
          Team
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your team members and permissions
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition group"
          >
            <div className="flex items-center gap-4 mb-4">

              {/* Avatar */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                {getInitial(member.name)}
              </div>

              <div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Mail className="w-4 h-4" />
              {member.email}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between border-t pt-3">
              <span className={`text-xs px-3 py-1 rounded-full ${
                member.role === 'Admin'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {member.role}
              </span>

              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <User className="w-4 h-4" />
                </button>

                <button className="p-2 hover:bg-red-100 text-red-500 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Invite Button */}
      <div className="text-center">
        <button
          onClick={() => setShowInviteModal(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition"
        >
          <UserPlus className="inline w-5 h-5 mr-2" />
          Invite Member
        </button>
      </div>

      {/* Modal */}
      {showInviteModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowInviteModal(false)}
        >
          <div
            className="bg-white p-6 rounded-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Invite Member</h2>
              <button onClick={() => setShowInviteModal(false)}>
                <X />
              </button>
            </div>

            <form onSubmit={handleInvite}>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full border p-3 rounded-lg mb-4"
                required
              />

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg"
              >
                Send Invite
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Team;