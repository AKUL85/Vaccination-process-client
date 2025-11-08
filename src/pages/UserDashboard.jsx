"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Calendar,
  Syringe,
  Shield,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import Swal from "sweetalert2";

import { currentUser, mockVaccines } from "../data/MockData";
import NextVaccinationAlert from "../component/NextVaccinationAlert";
import StatsGrid from "../component/StatsGrid";
import VaccinationCard from "../component/VaccinationCard";
import AppointmentCard from "../component/AppointmentCard";
import RecommendationCard from "../component/RecommendationCard";
import Sidebar from "../component/Sidebar";
import { useAuth } from "../context/AuthContext";

const UserDashboard = () => {
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState(null);

  // console.log(user.email);
  const [mockUser, setUser] = useState(currentUser);
  const [activeTab, setActiveTab] = useState("overview");
  const [nextVaccine, setNextVaccine] = useState(null);

  // useEffect(() => {
  //   if (!user?.email) return; // wait until Firebase user with email is loaded

  //   const fetchUserData = async () => {
  //     try {
  //       console.log("Fetching user data for:", user.email);

  //       const res = await fetch(
  //         `/api/users?email=${encodeURIComponent(user.email)}`
  //       );

  //       if (!res.ok) {
  //         throw new Error(`HTTP error! status: ${res.status}`);
  //       }

  //       const data = await res.json();
  //       console.log("User data received:", data);
  //       setUserData(data);
  //     } catch (err) {
  //       console.error("Error fetching user data:", err);
  //     }
  //   };

  //   fetchUserData();
  // }, [user]);

  useEffect(() => {
    if (mockUser.vaccinations && mockUser.vaccinations.length > 0) {
      const lastVaccination =
        mockUser.vaccinations[mockUser.vaccinations.length - 1];
      const lastDate = new Date(lastVaccination.dateAdministered);
      const nextDate = new Date(lastDate);
      nextDate.setMonth(nextDate.getMonth() + 6); // Next dose in 6 months

      setNextVaccine({
        vaccineName: lastVaccination.vaccineName,
        nextDate: nextDate.toISOString(),
        daysRemaining: Math.ceil(
          (nextDate - new Date()) / (1000 * 60 * 60 * 24)
        ),
      });
    }
  }, [mockUser]);

  const getUpcomingAppointments = () => [
    {
      id: 1,
      vaccineName: "COVID-19 Booster",
      date: "2025-01-15T10:00:00.000Z",
      center: "City Medical Center",
      status: "scheduled",
    },
    {
      id: 2,
      vaccineName: "Annual Flu Shot",
      date: "2025-03-20T14:30:00.000Z",
      center: "Community Health Clinic",
      status: "pending",
    },
  ];

  const getVaccineRecommendations = () => {
    const takenVaccineIds = mockUser.vaccinations.map((v) => v.vaccineId);
    return mockVaccines.filter(
      (vaccine) => !takenVaccineIds.includes(vaccine.id)
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <Sidebar
          user={mockUser}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-3 space-y-8"
        >
          {activeTab === "overview" && (
            <>
              <StatsGrid
                user={mockUser}
                nextVaccine={nextVaccine}
                upcomingAppointments={getUpcomingAppointments()}
              />
              {nextVaccine && (
                <NextVaccinationAlert nextVaccine={nextVaccine} />
              )}

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Recent Vaccinations
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {mockUser.vaccinations.slice(-2).map((vaccination, idx) => (
                    <VaccinationCard key={idx} vaccination={vaccination} />
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Upcoming Appointments
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {getUpcomingAppointments().map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                    />
                  ))}
                </div>
              </section>
            </>
          )}

          {activeTab === "vaccinations" && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Vaccination History
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {mockUser.vaccinations.map((vaccination, idx) => (
                  <VaccinationCard key={idx} vaccination={vaccination} />
                ))}
              </div>
            </section>
          )}

          {activeTab === "appointments" && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                My Appointments
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {getUpcomingAppointments().map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))}
              </div>
            </section>
          )}

          {activeTab === "recommendations" && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Recommended Vaccines
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {getVaccineRecommendations().map((vaccine) => (
                  <RecommendationCard key={vaccine.id} vaccine={vaccine} />
                ))}
              </div>
            </section>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;
