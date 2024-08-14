"use client";
import { AppRoot, Button, Card } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from "react";

const Home = () => {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [multiplierCost, setMultiplierCost] = useState(10);
  const [energy, setEnergy] = useState(982);
  const maxEnergy = 1000;

  const handleClick = () => {
    if (energy > 0) {
      setCount((prevCount) => prevCount + multiplier);
      setEnergy((prevEnergy) => prevEnergy - 1);
    }
  };

  const buyMultiplier = () => {
    if (count >= multiplierCost) {
      setCount((prevCount) => prevCount - multiplierCost);
      setMultiplier((prevMultiplier) => prevMultiplier + 1);
      setMultiplierCost((prevCost) => Math.floor(prevCost * 1.5));
    }
  };

  useEffect(() => {
    const replenishEnergy = () => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 3, maxEnergy));
    };

    const intervalId = setInterval(replenishEnergy, 3000);

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
        <div className="text-3xl font-bold">$ {count}</div>
      </div>
      <div className="flex-grow flex justify-center items-center mb-4">
        <div onClick={handleClick} className="rounded-full p-1 w-48 h-48">
          <img
            src="/api/placeholder/200/200"
            alt="Hamster"
            className="rounded-full w-full h-full object-cover"
          />
        </div>
      </div>
      <p className="text-sm">Current multiplier: x{multiplier}</p>
      <Button
        stretched
        mode="plain"
        onClick={buyMultiplier}
        disabled={count < multiplierCost}
      >
        Buy Multiplier (Cost: {multiplierCost})
      </Button>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="p-1 rounded mr-2">
            <img src="/api/placeholder/16/16" alt="Energy" />
          </div>
          <span>
            {energy} / {maxEnergy}
          </span>
        </div>
        <Button className="px-4 py-2 rounded-full">Boost</Button>
      </div>
      <div className="flex-grow" />
    </AppRoot>
  );
};

export default Home;
