import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";

import CalendarSection from "../component/CalendarSection";
import TimeSlotsSection from "../component/TimeSlotsSection";
import BookingSummary from "../component/BookingSummary";
import {
  mockVaccines,
  generateAppointmentSlots,
  bookAppointment,
  currentUser,
} from "../data/MockData";
import { useToast } from "../hooks/use-toast";
import { Button } from "../ui/Button";

const AppointmentBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedDate, setSelectedDate] = useState();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [booking, setBooking] = useState(false);

  const vaccine = mockVaccines.find((v) => v.id === id);
  const appointmentSlots = useMemo(() => generateAppointmentSlots(), []);

  if (!vaccine) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Vaccine not found</p>
      </div>
    );
  }

  const selectedDateSlots = selectedDate
    ? appointmentSlots.find(
        (slot) =>
          new Date(slot.date).toDateString() === selectedDate.toDateString()
      )
    : null;

  const handleBooking = async () => {
    if (!currentUser) {
      toast({
        title: "Please login",
        description: "You need to be logged in to book appointments",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!selectedDate || !selectedSlot) {
      toast({
        title: "Incomplete selection",
        description: "Please select both date and time slot",
        variant: "destructive",
      });
      return;
    }

    setBooking(true);
    try {
      await bookAppointment(vaccine, selectedDate.toISOString(), selectedSlot);
      toast({
        title: "Appointment booked!",
        description: `Your vaccination is scheduled for ${format(
          selectedDate,
          "PPP"
        )} at ${selectedSlot.time}`,
      });
      navigate("/vaccine-card");
    } catch {
      toast({
        title: "Booking failed",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => navigate(`/vaccine/${id}`)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Vaccine Details
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Book Your Appointment</h1>
            <p className="text-muted-foreground">
              Schedule your vaccination for{" "}
              <span className="font-semibold text-foreground">
                {vaccine.name}
              </span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <CalendarSection
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <TimeSlotsSection
              selectedDate={selectedDate}
              selectedDateSlots={selectedDateSlots}
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
            />
          </div>

          {selectedDate && selectedSlot && (
            <BookingSummary
              vaccine={vaccine}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              booking={booking}
              handleBooking={handleBooking}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
