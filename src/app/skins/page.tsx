"use client";

import {
  AppRoot,
  Button,
  Card,
  Image,
  LargeTitle,
  Section,
  TabsList,
  Text,
  Title,
} from "@telegram-apps/telegram-ui";
import React, { useState } from "react";

const skins = [
  {
    name: "cat",
    bio: "Furry and agile, this cat skin is purr-fect for any occasion.",
    price: 100000,
    locked: true,
  },
  {
    name: "chimpanzee",
    bio: "Get ready to swing into action with this intelligent and charming chimpanzee skin.",
    price: 500000,
    locked: true,
  },
  {
    name: "dino",
    bio: "Unleash your inner beast with this prehistoric dino skin, roaring with excitement.",
    price: 2000000,
    locked: true,
  },
  {
    name: "dog",
    bio: "Faithful and friendly, this dog skin is the perfect companion for any adventure.",
    price: 150000,
    locked: true,
  },
  {
    name: "dragon",
    bio: "Breathe fire into your wardrobe with this mythical dragon skin, symbolizing power and strength.",
    price: 2500000,
    locked: true,
  },
  {
    name: "elephant",
    bio: "Wise and gentle, this elephant skin is a majestic addition to any collection.",
    price: 1200000,
    locked: true,
  },
  {
    name: "giraffe",
    bio: "Reach new heights with this tall and charming giraffe skin, perfect for standing out.",
    price: 800000,
    locked: true,
  },
  {
    name: "godfather",
    bio: "Make an offer you can't refuse with this sleek and sophisticated godfather skin.",
    price: 1800000,
    locked: true,
  },
  {
    name: "kangaroo",
    bio: "Hop into action with this energetic and playful kangaroo skin, full of Aussie charm.",
    price: 900000,
    locked: true,
  },
  {
    name: "lion",
    bio: "Roar with pride with this regal and fearless lion skin, the king of the jungle.",
    price: 2200000,
    locked: true,
  },
  {
    name: "meerkat",
    bio: "Stand watch with this curious and social meerkat skin, always on the lookout for fun.",
    price: 1100000,
    locked: true,
  },
  {
    name: "penguin",
    bio: "Waddle into the spotlight with this charming and tuxedo-clad penguin skin, perfect for formal occasions.",
    price: 600000,
    locked: true,
  },
  {
    name: "redpanda",
    bio: "Get cozy with this adorable and laid-back red panda skin, always ready for a nap.",
    price: 1000,
    locked: true,
  },
  {
    name: "sloth",
    bio: "Hang loose with this chill and relaxed sloth skin, taking it easy in style.",
    price: 400000,
    locked: true,
  },
  {
    name: "toucan",
    bio: "Brighten up your day with this colorful and playful toucan skin, full of tropical flair.",
    price: 1400000,
    locked: true,
  },
  {
    name: "unicorn",
    bio: "Add a touch of magic to your wardrobe with this mythical and enchanting unicorn skin.",
    price: 200000,
    locked: true,
  },
  {
    name: "zebra",
    bio: "Stripe up your style with this bold and striking zebra skin, black and white and ready to go.",
    price: 1600000,
    locked: true,
  },
];

export default function SkinSelectionPage() {
  const [activeTab, setActiveTab] = useState("featured");
  const [selectedSkin, setSelectedSkin] = useState(skins[0]);

  return (
    <AppRoot className="flex flex-col">
      <LargeTitle className="text-3xl font-bold">Skin</LargeTitle>
      <div className="flex h-[calc(100vh-120px)] justify-between">
        <div className="w-1/2 p-2 flex flex-col items-center">
          <Card className="p-4 w-full">
            <img
              alt={selectedSkin.name}
              src={`/skins/${selectedSkin.name}.webp`}
              style={{
                display: "block",
                objectFit: "cover",
              }}
            />
            <Title className="text-2xl text-center">
              {selectedSkin.name.charAt(0).toUpperCase() +
                selectedSkin.name.slice(1)}
            </Title>
            <Text className="text-center">{selectedSkin.bio}</Text>
            <Title className="text-xl my-4 text-center">
              $ {selectedSkin.price}
            </Title>
            <Button size="l" stretched className="w-full">
              {selectedSkin.locked ? "Unlock to Purchase" : "Purchase"}
            </Button>
          </Card>
        </div>
        <div className="w-1/2 overflow-y-auto h-[calc(100vh-120px)]">
          <div className=" flex flex-col gap-2 p-2 ">
            {skins.map((skin) => (
              <Card
                key={skin.name}
                onClick={() => setSelectedSkin(skin)}
                className="cursor-pointer"
              >
                <React.Fragment key={skin.name}>
                  <Card.Chip readOnly>
                    {skin.name.charAt(0).toUpperCase() + skin.name.slice(1)}
                  </Card.Chip>
                  <img
                    alt={skin.name}
                    src={`/skins/${skin.name}.webp`}
                    style={{
                      display: "block",
                      objectFit: "cover",
                    }}
                  />
                  <Card.Cell
                    readOnly
                    subtitle={skin.locked ? "Locked" : "Unlocked"}
                  >
                    {skin.locked ? "Locked" : "Unlocked"}
                  </Card.Cell>
                </React.Fragment>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppRoot>
  );
}
