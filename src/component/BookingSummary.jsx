import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { format } from "date-fns";

import { Button } from "../ui/Button";
import { Card, CardContent, CardHeader, CardTitle  } from "../ui/Card";


const BookingSummary = ({ vaccine, selectedDate, selectedSlot, booking, handleBooking }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, height: 0 }}
    animate={{ opacity: 1, y: 0, height: "auto" }}
    exit={{ opacity: 0, y: 20, height: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="mt-6 border-2 border-accent/50 bg-accent/5">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-accent" />
          Booking Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Vaccine</span>
          <span className="font-semibold">{vaccine.name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Date</span>
          <span className="font-semibold">{format(selectedDate, "PPP")}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Time</span>
          <span className="font-semibold">{selectedSlot.time}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Location</span>
          <span className="font-semibold">City Medical Center</span>
        </div>

        <Button
          onClick={handleBooking}
          disabled={booking}
          className="w-full mt-4 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70"
          size="lg"
        >
          {booking ? "Booking..." : "Confirm Appointment"}
        </Button>

        <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>
            You will receive a confirmation email with your appointment details and a reminder 24 hours before your scheduled time.
          </p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default BookingSummary;
