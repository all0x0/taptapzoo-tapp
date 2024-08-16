"use client";
import { NumberAnimation } from "@/components/NumberAnimation";
import TextUp from "@/components/TextUp";
import {
  AppRoot,
  Badge,
  Button,
  Card,
  Subheadline,
  Title,
} from "@telegram-apps/telegram-ui";
import { ZapIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [multiplierCost, setMultiplierCost] = useState(10);
  const [energy, setEnergy] = useState(982);
  const [lastBoostTime, setLastBoostTime] = useState<number>(0);
  const maxEnergy = 1000;
  const cooldownDuration = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
  const [animationTrigger, setAnimationTrigger] = useState(0);
  const router = useRouter();

  const animateTextUp = useCallback(() => {
    setAnimationTrigger((prev) => prev + 1);
  }, []);

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
      <Card className="rounded-lg p-2 mb-2">
        <div className="flex justify-between items-center">
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-row gap-2">
              <img
                src="/emoji.jpeg"
                alt="user avatar"
                className="rounded-full mr-2 w-10 h-10 object-cover outline outline-1 outline-offset-1 outline-gradient-to-r from-purple-400 to-pink-600"
              />
              <div className="flex flex-col">
                <Badge type={"number"} className="text-sm">
                  Explorer
                </Badge>
                <Title className="text-lg">John Lin</Title>
                {/* <Subheadline></Subheadline> */}
              </div>
            </div>
            <Button
              className="text-xs px-2 py-1 rounded"
              onClick={() => router.push("/skins")}
            >
              Buy skin
            </Button>
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { name: "Daily reward", img: "/actions/calendar.webp" },
          { name: "Earn", img: "/actions/coins.webp" },
          { name: "Share", img: "/actions/announce.webp" },
        ].map((item, index) => (
          <Card key={index} className="p-2 rounded-lg text-center">
            <img src={item.img} alt={item.name} className="mx-auto" />
            <p className="text-xs">{item.name}</p>
          </Card>
        ))}
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
              alt="clicker"
              className="rounded-full w-full h-full object-cover"
            />
            <div className="absolute -top-8 left-0 flex justify-center items-center w-full h-full">
              <TextUp animationTrigger={animationTrigger} points={multiplier} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center pt-2">
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
