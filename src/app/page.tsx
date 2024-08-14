"use client";
import { NumberAnimation } from "@/components/NumberAnimation";
import TextUp from "@/components/TextUp";
import { AppRoot, Button, Card } from "@telegram-apps/telegram-ui";
import { ZapIcon } from "lucide-react";
import { useEffect, useState } from "react";

const Home = () => {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [multiplierCost, setMultiplierCost] = useState(10);
  const [energy, setEnergy] = useState(982);
  const [lastBoostTime, setLastBoostTime] = useState<number>(0);
  const maxEnergy = 1000;
  const cooldownDuration = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
  const [animate, setAnimate] = useState(false);

  const animateTextUp = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 400);
  };

  const handleClick = () => {
    if (energy > 0) {
      setCount((prevCount) => prevCount + multiplier);
      setEnergy((prevEnergy) => prevEnergy - 1);

      animateTextUp();
    }
  };

  const buyMultiplier = () => {
    if (count >= multiplierCost) {
      setCount((prevCount) => prevCount - multiplierCost);
      setMultiplier((prevMultiplier) => prevMultiplier + 1);
      setMultiplierCost((prevCost) => Math.floor(prevCost * 1.5));
    }
  };

  const boost = () => {
    const currentTime = new Date().getTime();
    if (
      lastBoostTime === null ||
      currentTime >= lastBoostTime + cooldownDuration
    ) {
      setEnergy(maxEnergy);
      setLastBoostTime(currentTime);
      return `Energy boosted to ${maxEnergy}. Boost used.`;
    } else {
      const remainingTime = Math.ceil(
        (lastBoostTime + cooldownDuration - currentTime) / (60 * 1000)
      );
      return `Boost is on cooldown. Try again in ${remainingTime} minutes.`;
    }
  };

  useEffect(() => {
    const replenishEnergy = () => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 3, maxEnergy));
    };

    const intervalId = setInterval(replenishEnergy, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <AppRoot className="h-screen font-sans flex flex-col mx-3 my-4">
      <Card className="rounded-lg p-3 mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/api/placeholder/40/40"
              alt="Hamster avatar"
              className="rounded-full mr-2"
            />
            <div className="text-xs px-2 py-1 rounded">Buy skin</div>
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {["Daily reward", "Daily cipher", "Daily combo", "Mini game"].map(
          (item, index) => (
            <Card key={index} className="p-3 rounded-lg text-center">
              <img
                src="/api/placeholder/40/40"
                alt={item}
                className="mx-auto mb-2"
              />
              <p className="text-xs">{item}</p>
            </Card>
          )
        )}
      </div>
      <div className="text-center mb-4">
        <NumberAnimation value={count} />
      </div>

      <div className="flex justify-center items-center relative">
        <div>
          <div
            onClick={handleClick}
            className="rounded-full p-1 w-48 h-48 transform transition-transform duration-150 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <img
              src="skins/penguin.webp"
              alt="Hamster"
              className="rounded-full w-full h-full object-cover"
            />
            <div className="absolute -top-8 left-0 flex justify-center items-center w-full h-full">
              <TextUp animate={animate} points={multiplier} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-sm">Current multiplier: x{multiplier}</p>
        <Button
          stretched
          mode="plain"
          onClick={buyMultiplier}
          disabled={count < multiplierCost}
        >
          Buy Multiplier (Cost: {multiplierCost})
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="pr-2">
            <ZapIcon />
          </div>
          <span>
            {energy} / {maxEnergy}
          </span>
        </div>
        <Button
          className="px-4 py-2 rounded-full"
          onClick={() => {
            const result = boost();
            // You can use this result to show a notification or alert to the user
            console.log(result);
          }}
          disabled={lastBoostTime !== 0}
        >
          Boost
        </Button>
      </div>
      <div className="flex-grow" />
    </AppRoot>
  );
};

export default Home;
