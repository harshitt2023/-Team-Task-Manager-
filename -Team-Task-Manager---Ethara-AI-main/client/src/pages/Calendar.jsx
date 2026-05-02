import React from 'react';
import { Calendar as CalendarIcon, CheckCircle, Clock } from 'lucide-react';  // ✅ Renamed icon

const Calendar = () => {  // ✅ Component name stays Calendar
  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-4 mx-auto">
          <CalendarIcon className="w-12 h-12 text-blue-600" />  {/* ✅ Use renamed icon */}
          Calendar
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          View all tasks and deadlines in calendar view
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Upcoming Tasks */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Tasks</h2>
          <div className="space-y-4">
            <div className="flex items-center p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Design landing page</h3>
                <p className="text-sm text-gray-600">Due Jan 25</p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-500 ml-4" />
            </div>
            {/* Add more tasks... */}
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-xl">
            <div className="text-3xl font-bold">3</div>
            <div className="text-sm opacity-90">Overdue</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white p-6 rounded-2xl shadow-xl">
            <div className="text-3xl font-bold">12</div>
            <div className="text-sm opacity-90">This Week</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-yellow-600 text-white p-6 rounded-2xl shadow-xl">
            <div className="text-3xl font-bold">5</div>
            <div className="text-sm opacity-90">Today</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;