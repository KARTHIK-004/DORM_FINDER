import React from "react";
import { Label } from "@/components/ui/label";

export function RadioGroup({ options, value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((option) => (
        <div key={option.value} className="relative">
          <input
            type="radio"
            id={option.value}
            name="userType"
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="sr-only peer"
          />
          <Label
            htmlFor={option.value}
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary cursor-pointer transition-all"
          >
            {option.icon}
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  );
}
