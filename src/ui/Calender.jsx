import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "../lib/utils";
import { buttonVariants } from "./Button";
import "./day-picker.css"

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      components={{
        IconLeft: (props) =>
          React.createElement(ChevronLeft, { className: "h-4 w-4", ...props }),
        IconRight: (props) =>
          React.createElement(ChevronRight, { className: "h-4 w-4", ...props }),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
