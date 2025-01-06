"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectFormProps {
  value: string;
  onChange: (value: string) => void;
}

export function SelectForm({ value, onChange }: SelectFormProps) {
  const serviceCategories = [
    "Automotive Maintenance",
    "Child Care",
    "Education & Tutoring",
    "Electrical Maintenance",
    "Electronics Repair",
    "Financial Advice",
    "Home Improvement",
    "Housekeeping",
    "HVAC Service",
    "Lawn & Garden",
    "Legal Services",
    "Music & Arts",
    "Music Services",
    "Other",
    "Party Planning",
    "Pet Care",
    "Plumbing",
    "Pool Maintenance",
    "Rideshare",
    "Small Engine Maintenance",
    "Website & Software",
  ];

  return (
    <div className="mt-3">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full h-[3.2rem] rounded-xl border-[3px] px-5 text-[1.1rem] text-black-300 border-black font-semibold">
          <SelectValue placeholder="Select a Service Category" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectGroup className="text-cyan-700 font-semibold">
            {serviceCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
