import { motion, AnimatePresence } from "framer-motion";
import { Clock, Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

import { Card,CardContent, CardDescription, CardHeader, CardTitle  } from "../ui/Card";
import { Badge } from "../ui/Badge";


const TimeSlotsSection = ({ selectedDate, selectedDateSlots, selectedSlot, setSelectedSlot }) => {
  const getSlotStatus = (slot) => {
    const percentFull = ((slot.capacity - slot.available) / slot.capacity) * 100;
    if (percentFull >= 100) return { status: "full", color: "destructive" };
    if (percentFull >= 70) return { status: "limited", color: "secondary" };
    return { status: "available", color: "default" };
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Select Time Slot
          </CardTitle>
          <CardDescription>
            {selectedDate
              ? `Available slots for ${format(selectedDate, "PPP")}`
              : "Please select a date first"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {!selectedDate ? (
              <motion.div
                key="no-date"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-64 text-muted-foreground"
              >
                <div className="text-center">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Select a date to view available slots</p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="slots" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-2 max-h-96 overflow-y-auto pr-2">
                {selectedDateSlots?.slots.map((slot, index) => {
                  const { status, color } = getSlotStatus(slot);
                  const isSelected = selectedSlot?.id === slot.id;
                  const isFull = slot.available === 0;

                  return (
                    <motion.button
                      key={slot.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: isFull ? 1 : 1.02 }}
                      whileTap={{ scale: isFull ? 1 : 0.98 }}
                      onClick={() => !isFull && setSelectedSlot(slot)}
                      disabled={isFull}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : isFull
                          ? "border-border bg-muted/50 opacity-50 cursor-not-allowed"
                          : "border-border hover:border-primary/50 hover:bg-accent/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              isFull
                                ? "bg-destructive/20"
                                : isSelected
                                ? "bg-primary"
                                : "bg-primary/20"
                            }`}
                          >
                            <Clock
                              className={`w-5 h-5 ${
                                isFull
                                  ? "text-destructive"
                                  : isSelected
                                  ? "text-primary-foreground"
                                  : "text-primary"
                              }`}
                            />
                          </div>
                          <div>
                            <p className="font-semibold">{slot.time}</p>
                            <p className="text-xs text-muted-foreground">
                              {isFull ? "Fully Booked" : `${slot.available} slots available`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={color}>{status}</Badge>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-primary" />}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TimeSlotsSection;
