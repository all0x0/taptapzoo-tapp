"use client";
import { AppRoot, Button, Card, Placeholder } from "@telegram-apps/telegram-ui";
import { DollarSign, LucideSwitchCamera, Settings, Users } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [multiplierCost, setMultiplierCost] = useState(10);

  const handleClick = () => {
    setCount((prevCount) => prevCount + multiplier);
  };

  const buyMultiplier = () => {
    if (count >= multiplierCost) {
      setCount((prevCount) => prevCount - multiplierCost);
      setMultiplier((prevMultiplier) => prevMultiplier + 1);
      setMultiplierCost((prevCost) => Math.floor(prevCost * 1.5));
    }
  };

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
          <div className="flex items-center">
            <p className="mr-2">Giovanni Fu Lin (CEO)</p>
            <span className="ml-1">{count}</span>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <p className="mr-2">Bronze</p>
          <div className="h-2 flex-grow rounded-full">
            <div className="h-full w-1/12 rounded-full"></div>
          </div>
          <p className="ml-2">1/11</p>
        </div>
        <div className="flex items-center justify-between mt-2 rounded-full px-3 py-1">
          <div className="flex items-center">
            <img
              src="/api/placeholder/24/24"
              alt="Hamster icon"
              className="rounded-full mr-2"
            />
            <span>$ {count}</span>
          </div>
          <Settings size={16} />
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
              <p className="text-xs">00:00</p>
            </Card>
          )
        )}
      </div>
      <div className="text-center mb-4">
        <div className="text-3xl font-bold">$ {count}</div>
      </div>
      <div className="flex-grow flex justify-center items-center mb-4">
        <div className="rounded-full p-1 w-48 h-48">
          <img
            src="/api/placeholder/200/200"
            alt="Hamster"
            className="rounded-full w-full h-full object-cover"
          />
        </div>
      </div>
      <Placeholder
        header="Clicker Game"
        description={
          <>
            <div className="text-center mb-4">
              <p className="text-4xl font-bold mb-2">{count}</p>
              <p className="text-sm">Current multiplier: x{multiplier}</p>
            </div>
            <div className="space-y-4">
              <Button stretched size="l" onClick={handleClick}>
                Click me!
              </Button>
              <Button
                stretched
                mode="plain"
                onClick={buyMultiplier}
                disabled={count < multiplierCost}
              >
                Buy Multiplier (Cost: {multiplierCost})
              </Button>
            </div>
          </>
        }
      />
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="p-1 rounded mr-2">
            <img src="/api/placeholder/16/16" alt="Energy" />
          </div>
          <span>982 / 1000</span>
        </div>
        <Button className="px-4 py-2 rounded-full">Boost</Button>
      </div>
      <div className="flex-grow" />
    </AppRoot>
  );
};

export default Home;
