"use client";
import React, { useState } from "react";
import { AppRoot, Card, Button, Placeholder } from "@telegram-apps/telegram-ui";
import "@telegram-apps/telegram-ui/dist/styles.css";

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
    <AppRoot>
      <Card>
        <Placeholder
          header="Clicker Game"
          description={
            <>
              <div className="text-center mb-4">
                <p className="text-4xl font-bold mb-2">{count}</p>
                <p className="text-sm text-gray-500">
                  Current multiplier: x{multiplier}
                </p>
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
      </Card>
    </AppRoot>
  );
};

export default Home;
