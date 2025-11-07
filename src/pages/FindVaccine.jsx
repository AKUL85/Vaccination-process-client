"use client";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Syringe, CheckCircle, XCircle } from "lucide-react";
import { Button } from "../ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Badge } from "../ui/Badge";
import { mockVaccines } from "../data/MockData";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function FindVaccine() {
  const navigate = useNavigate();
  const [vaccines, setVaccines] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setVaccines(mockVaccines);
  //       setIsLoading(false);
  //     }, 800);
  //     return () => clearTimeout(timer);
  //   }, []);

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/vaccine");
        if (!response.ok) throw new Error("Failed to fetch vaccine data");

        const data = await response.json();
        setVaccines(data);
      } catch (error) {
        console.error("Error fetching vaccines:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVaccines();
  }, []);

  const formatAge = (age) => {
    if (age === null || age === undefined) return "N/A";

    // newborn
    if (age === 0) return "Newborn";

    // less than 1 year → convert to months
    if (age < 1) {
      const months = Math.round(age * 12);
      return `${months} month${months > 1 ? "s" : ""}`;
    }

    // less than 2 years → convert to months or years
    if (age < 2) {
      const months = Math.round(age * 12);
      return `${months} months`;
    }

    // 2 years or more
    return `${age} year${age > 1 ? "s" : ""}`;
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gray-100 h-48" />
        <div className="container mx-auto px-6 -mt-16">
          <div className="h-10 bg-white rounded-lg w-96 mx-auto mb-8 shadow-sm animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded" />
                  <div className="h-6 w-20 bg-gray-200 rounded-full" />
                </div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white border-b border-gray-200"
      >
        <div className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-semibold text-green-500 mb-3">
              Explore Available Vaccines
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Browse through our comprehensive collection of vaccines and
              protect yourself and your loved ones
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {vaccines?.map((vaccine) => (
            <motion.div
              key={vaccine._id}
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="group relative h-full"
            >
              <div className="relative p-1 rounded-2xl h-full">
                <div
                  className={`
            absolute inset-0 rounded-2xl 
            bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20
            opacity-0 group-hover:opacity-100 
            transition-opacity duration-700 ease-out 
            blur-xl
          `}
                ></div>

                <div
                  className={`
            relative h-full min-h-[320px]
            bg-white/95 backdrop-blur-xl
            border border-gray-200/60
            rounded-2xl p-7
            shadow-lg
            transition-all duration-500 ease-out
            group-hover:shadow-2xl
            group-hover:border-transparent
            flex flex-col
          `}
                >
                  <div className="flex items-start justify-between mb-6">
                    <motion.div
                      className="flex justify-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                        <Syringe
                          className="w-7 h-7 text-white"
                          strokeWidth={2.5}
                        />
                      </div>
                    </motion.div>

                    <Badge
                      variant="outline"
                      className={`
                text-sm font-semibold border-2 px-3 py-1.5
                ${
                  vaccine.availabilityCount > 0
                    ? "border-green-200 text-green-700 bg-green-50/80 hover:bg-green-100"
                    : "border-gray-300 text-gray-600 bg-gray-50/80 hover:bg-gray-100"
                }
                transition-colors backdrop-blur-sm
              `}
                > 
                      {vaccine.available === true ? (
                        <> 
                          <CheckCircle className="w-4 h-4 mr-1.5" />
                          Available
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 mr-1.5" />
                          Out of Stock
                        </>
                      )}
                    </Badge>
                  </div>

                  <div className="flex flex-col flex-grow">
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                      {vaccine.name}
                    </CardTitle>
                    <CardDescription className="text-base text-gray-600 mb-4 font-medium">
                      by {vaccine.produced_by}
                    </CardDescription>

                    <p className="text-lg text-gray-700 leading-relaxed mb-6 flex-grow">
                      {vaccine.details}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-6">
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl font-semibold text-sm border border-blue-200">
                        <Syringe className="w-4 h-4" />
                        {vaccine.doses} dose
                        {vaccine.doses > 1 ? "s" : ""}
                      </span>
                      <span className="px-4 py-2 bg-gray-50 text-gray-700 rounded-xl font-semibold text-sm border border-gray-200">
                        {formatAge(vaccine.min_age)}
                      </span>
                      {/* <span className="px-4 py-2 bg-green-50 text-green-700 rounded-xl font-semibold text-sm border border-green-200">
                        {vaccine.efficacy}
                      </span> */}
                    </div>

                    <div className="pt-4 border-t border-gray-200/60">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            Available Doses
                          </p>
                          <p className="text-2xl font-bold text-gray-900">
                            {vaccine.status}
                          </p>
                        </div>
                        <Button
                          size="lg"
                          variant="outline"
                          className="
                    border-2 border-blue-600 text-blue-600 
                    hover:bg-blue-600 hover:text-white
                    font-semibold text-base px-6 py-2
                    transition-all duration-300
                    rounded-xl
                  "
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/vaccine/${vaccine._id}`);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
