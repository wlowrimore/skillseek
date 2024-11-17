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
  return (
    <div className="mt-3">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full h-[3.2rem] rounded-xl border-[3px] px-5 text-[1.1rem] text-black-300 border-black font-semibold">
          <SelectValue placeholder="Select a Service Category" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectGroup className="text-cyan-700 font-semibold">
            <SelectItem value="Home Improvement">Home Improvement</SelectItem>
            <SelectItem value="Lawn & Garden">Lawn & Garden</SelectItem>
            <SelectItem value="Automotive Maintenance & Repair">
              Automotive Maintenance & Repair
            </SelectItem>
            <SelectItem value="Small Engine Maintenance & Repair">
              Small Engine Maintenance & Repair
            </SelectItem>
            <SelectItem value="Child Care">Child Care</SelectItem>
            <SelectItem value="Pet Care">Pet Care</SelectItem>
            <SelectItem value="Education & Tutoring">
              Education & Tutoring
            </SelectItem>
            <SelectItem value="Music & Arts Lessons">
              Music & Arts Lessons
            </SelectItem>
            <SelectItem value="Music Services">Music Services</SelectItem>
            <SelectItem value="Wedding | Party Planning">
              Wedding | Party Planning
            </SelectItem>
            <SelectItem value="Legal Services">Legal Services</SelectItem>
            <SelectItem value="Financial Advice">Financial Advice</SelectItem>
            <SelectItem value="Electronics Repair">
              Electronics Repair
            </SelectItem>
            <SelectItem value="Transportation | Carpool">
              Transportation | Carpool
            </SelectItem>
            <SelectItem value="Housekeeping">Housekeeping</SelectItem>
            <SelectItem value="Website & Software Services">
              Website & Software Services
            </SelectItem>
            <SelectItem value="Plumbing">Plumbing</SelectItem>
            <SelectItem value="Electrical Maintenance & Repair">
              Electrical Maintenance & Repair
            </SelectItem>
            <SelectItem value="HVAC Heating & Cooling">
              HVAC Heating & Cooling
            </SelectItem>
            <SelectItem value="Pool Maintenance">Pool Maintenance</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
