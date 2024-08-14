"use client";

import { useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TextUp from "@/components/TextUp";

interface NumberAnimationProps {
  value: number;
}

const NumberAnimation: React.FC<NumberAnimationProps> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [currentValue, setCurrentValue] = useState(0);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      const duration = 1000; // Animation duration in milliseconds
      const steps = 60; // Number of steps in the animation
      const stepDuration = duration / steps;
      const increment = (value - currentValue) / steps;

      let step = 0;
      const interval = setInterval(() => {
        if (step < steps) {
          setCurrentValue((prevValue) => {
            const newValue = prevValue + increment;
            return newValue > value ? value : newValue;
          });
          step++;
        } else {
          setCurrentValue(value);
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [value, isInView, currentValue]);

  return (
    <span ref={ref}>
      {Intl.NumberFormat("en-US").format(Math.floor(currentValue))}
    </span>
  );
};

export default function Home() {
  const [count, setCount] = useState(1000);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Super Mario Life-Up</h1>
        <TextUp />
      </div>
    </main>
  );
}
