"use client";

import { US_STATES, isValidStateCode } from "@/data/us-states";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { ShieldAlert } from "lucide-react";

interface StateInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidityChange?: (isValid: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export function StateInput({
  value,
  onChange,
  onValidityChange,
  disabled = false,
  required = false,
  className = "",
}: StateInputProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(false);

  const validateAndUpdateState = (stateCode: string) => {
    const isValidState = stateCode ? isValidStateCode(stateCode) : !required;
    setIsValid(isValidState);
    onValidityChange?.(isValidState);

    if (stateCode && !isValidState) {
      setErrorMessage("Please enter a valid U.S. state code");
    } else {
      setErrorMessage("");
    }
  };

  useEffect(() => {
    validateAndUpdateState(value);
  }, [value, required]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toUpperCase();
    onChange(newValue);
    validateAndUpdateState(newValue);
  };

  const getFullStateName = () => {
    return isValid && value
      ? US_STATES[value as keyof typeof US_STATES]
      : "Enter valid state code";
  };

  return (
    <TooltipProvider>
      <div className="relative left-2 min-w-20">
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Input
                name="licensingState"
                value={value}
                onChange={handleChange}
                className={`text-center min-w-20 max-w-20 uppercase ${className} ${
                  errorMessage ? "border-red-500 focus:border-red-500" : ""
                }`}
                maxLength={2}
                minLength={2}
                pattern="[A-Za-z]{2}"
                aria-label="State"
                aria-invalid={!isValid}
                placeholder="TN"
                disabled={disabled}
                required={required}
                title="Please enter a valid 2-letter state code"
                // Custom validation
                onInvalid={(e) => {
                  e.preventDefault();
                  validateAndUpdateState(value);
                }}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-center -mb-2 text-xs max-w-[5rem] text-slate-800 leading-none">
              {getFullStateName()}
            </p>
          </TooltipContent>
        </Tooltip>
        {errorMessage && (
          <>
            <div className="absolute right-11 top-[3.5rem] tracking-wider mt-1 text-xs text-red-800 whitespace-nowrap">
              {errorMessage}
            </div>
            <span>
              <ShieldAlert className="absolute top-[-6rem] left-4 h-8 w-8 text-red-800" />
            </span>
          </>
        )}
      </div>
    </TooltipProvider>
  );
}
