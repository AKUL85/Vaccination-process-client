import React from "react";
import {
  User,
  Syringe,
  Calendar,
  Shield,
  ChevronRight,
  LogOut,
} from "lucide-react";

const Sidebar = ({ user, activeTab, setActiveTab }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
    {/* User Profile Summary */}
    <div className="text-center mb-8">
      <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-white text-xl font-bold">
          {user.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
      </div>
      <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
      <p className="text-sm text-gray-600">{user.email}</p>
      <p className="text-xs text-gray-500 mt-1">Age: {user.age} years</p>
    </div>

    {/* Navigation */}
    <nav className="space-y-2">
      {[
        { id: "overview", label: "Overview", icon: User },
        { id: "vaccinations", label: "My Vaccinations", icon: Syringe },
        { id: "appointments", label: "Appointments", icon: Calendar },
        { id: "recommendations", label: "Recommendations", icon: Shield },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
            activeTab === item.id
              ? "bg-blue-50 text-blue-600 border border-blue-200"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center space-x-3">
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </div>
          <ChevronRight className="w-4 h-4" />
        </button>
      ))}
    </nav>

    {/* Logout Button */}
    <button className="w-full flex items-center space-x-3 p-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 mt-8">
      <LogOut className="w-5 h-5" />
      <span className="font-medium">Log Out</span>
    </button>
  </div>
);

export default Sidebar;
