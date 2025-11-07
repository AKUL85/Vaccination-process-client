import { motion } from "framer-motion";
import { Calendar as CalendarIcon, MapPin } from "lucide-react";
import { Calendar } from "../ui/Calender"; // Make sure this path is correct
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";

const CalendarSection = ({ selectedDate, setSelectedDate }) => {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 14);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Calendar Card */}
      <Card className="border-2 shadow-sm bg-background/60 backdrop-blur-sm">
        <CardHeader className="pb-3 border-b">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <CalendarIcon className="w-5 h-5 text-primary" />
            Select Date
          </CardTitle>
          <CardDescription>
            Choose your preferred vaccination date
          </CardDescription>
        </CardHeader>

        {/* --- THIS IS THE CORRECTED PART --- */}
        <CardContent className="flex justify-center items-center p-6">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < minDate || date > maxDate}
            className="w-full max-w-sm"
          />
        </CardContent>
      </Card>

      {/* Vaccination Center Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-2 border-primary/20 bg-background/60 backdrop-blur-sm shadow-sm">
          <CardHeader className="pb-1">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <MapPin className="w-5 h-5 text-primary" />
              Vaccination Center
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5 text-sm leading-relaxed">
            <p className="font-semibold text-foreground">City Medical Center</p>
            <p className="text-muted-foreground">123 Healthcare Avenue</p>
            <p className="text-muted-foreground">
              Open: Mon–Sat, 9:00 AM – 6:00 PM
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default CalendarSection;