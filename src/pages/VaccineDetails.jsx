"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Syringe,
  Calendar,
  Users,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { mockVaccines } from "../data/MockData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { useToast } from "../hooks/use-toast";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const sideEffectItem = {
  hidden: { opacity: 0, x: -15 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export default function VaccineDetails() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [vaccine, setVaccine] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  useEffect(() => {
    const fetchVaccine = async () => {
      try {
        console.log("hello ", _id);
        const response = await fetch(
          `http://localhost:5000/api/vaccine/${_id}`
        );
        if (!response.ok) throw new Error("nFailed to fetch vaccine details");

        const data = await response.json();
        setVaccine(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching vaccine:", error);
        toast({
          title: "Error",
          description:
            "Failed to load vaccine details. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchVaccine();
  }, [_id, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">Loading vaccine details...</p>
      </div>
    );
  }

  const handleApply = async () => {
    setApplying(true);
    try {
      // Simulate API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast({
        title: "Application Successful!",
        description: "Your vaccination has been scheduled.",
      });

      navigate(`/appointment/${vaccine._id}`);
    } catch {
      toast({
        title: "Error",
        description: "Failed to apply. Please try again.",
        variant: "destructive",
      });
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Vaccines
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* === MAIN CARD === */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-2"
          >
            <Card className="overflow-hidden border border-emerald-200 shadow-lg hover:shadow-xl transition-shadow duration-500">
              {/* Gradient Top Bar */}
              <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-600" />

              <CardHeader className="pb-5">
                <div className="flex items-start justify-between">
                  <div>
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="flex items-center gap-3 mb-2"
                    >
                      <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md">
                        <Syringe className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-3xl font-bold text-gray-900">
                          {vaccine.name}
                        </CardTitle>
                        <CardDescription className="text-lg text-gray-600">
                          by {vaccine.produced_by}
                        </CardDescription>
                      </div>
                    </motion.div>
                  </div>

                  <Badge
                    className={`
                      text-sm px-4 py-1.5 font-medium
                      ${
                        vaccine.availabilityCount > 1000
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                          : "bg-amber-100 text-amber-800 border-amber-300"
                      }
                    `}
                  >
                    {vaccine.avalable === true ? "In Stock" : "Limited"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-7">
                <motion.p
                  variants={item}
                  className="text-gray-700 leading-relaxed text-base"
                >
                  {vaccine.details}
                </motion.p>

                {/* Stats Grid */}
                <motion.div
                  variants={container}
                  className="grid grid-cols-2 gap-5"
                >
                  {[
                    {
                      icon: Syringe,
                      label: "Doses Required",
                      value: vaccine.dosesRequired,
                      color: "emerald",
                    },
                    {
                      icon: Users,
                      label: "Age Eligibility",
                      value: vaccine.ageEligibility,
                      color: "teal",
                    },
                    {
                      icon: CheckCircle,
                      label: "Efficacy Rate",
                      value: vaccine.efficacy,
                      color: "cyan",
                    },
                    {
                      icon: Calendar,
                      label: "Available Doses",
                      value: vaccine.available,
                      color: "green",
                    },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      variants={item}
                      whileHover={{ scale: 1.03 }}
                      className="group"
                    >
                      <div
                        className={`p-5 rounded-xl bg-gradient-to-br from-${stat.color}-50 to-white border border-${stat.color}-200 shadow-sm transition-all group-hover:shadow-md`}
                      >
                        <div className="flex items-start gap-3">
                          <stat.icon
                            className={`w-6 h-6 text-${stat.color}-600 mt-0.5`}
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-600">
                              {stat.label}
                            </p>
                            <p
                              className={`text-2xl font-bold text-${stat.color}-700`}
                            >
                              {stat.value}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div variants={item} className="space-y-3">
                  <h3 className="flex items-center gap-2 font-semibold text-gray-800">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    Common Side Effects
                  </h3>
                  <ul className="space-y-2">
                    <AnimatePresence>
                      {vaccine.sideEffects.map((effect, index) => (
                        <motion.li
                          key={index}
                          variants={sideEffectItem}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 text-gray-600"
                        >
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>{effect}</span>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-8 overflow-hidden border-2 border-emerald-300 shadow-xl bg-gradient-to-br from-white to-emerald-50">
              <div className="absolute top-0 right-0 -mt-4 -mr-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="w-12 h-12 text-emerald-400 opacity-30" />
                </motion.div>
              </div>

              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Apply for Vaccine
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Secure your dose in under 2 minutes
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Availability</span>
                    <span className="font-bold text-emerald-700">
                      {vaccine.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Time</span>
                    <span className="font-bold text-emerald-700">Instant</span>
                  </div>
                </div>

                <Button
                  onClick={handleApply}
                  disabled={applying || vaccine.availabilityCount === 0}
                  className={`
                    w-full text-lg py-6 font-semibold rounded-xl
                    bg-gradient-to-r from-emerald-600 to-teal-600
                    hover:from-emerald-700 hover:to-teal-700
                    text-white shadow-lg
                    disabled:opacity-50 disabled:cursor-not-allowed
                    relative overflow-hidden
                    transition-all duration-300
                    ${applying ? "animate-pulse" : ""}
                  `}
                  size="lg"
                >
                  <span className="relative z-10">
                    {applying ? "Processing..." : "Apply Now"}
                  </span>
                  {!applying && (
                    <motion.div
                      className="absolute inset-0 bg-white opacity-0"
                      whileHover={{ opacity: 0.2 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Button>

                <p className="text-xs text-center text-gray-500">
                  By applying, you agree to our{" "}
                  <span className="text-emerald-600 underline cursor-pointer hover:text-emerald-700">
                    vaccination terms
                  </span>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
