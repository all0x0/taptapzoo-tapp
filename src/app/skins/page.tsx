"use client";

import { useMainButton } from "@telegram-apps/sdk-react";
import { AppRoot, Card, Title } from "@telegram-apps/telegram-ui";
import { LockIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const skins = [
  {
    name: "penguin",
    bio: "Waddle into the spotlight with this charming and tuxedo-clad penguin skin, perfect for formal occasions.",
    price: 100,
    locked: false,
  },
  {
    name: "redpanda",
    bio: "Get cozy with this adorable and laid-back red panda skin, always ready for a nap.",
    price: 200,
    locked: true,
  },
  {
    name: "cat",
    bio: "Furry and agile, this cat skin is purr-fect for any occasion.",
    price: 1000,
    locked: true,
  },
  {
    name: "dog",
    bio: "Faithful and friendly, this dog skin is the perfect companion for any adventure.",
    price: 150000,
    locked: true,
  },
  {
    name: "unicorn",
    bio: "Add a touch of magic to your wardrobe with this mythical and enchanting unicorn skin.",
    price: 200000,
    locked: true,
  },
  {
    name: "sloth",
    bio: "Hang loose with this chill and relaxed sloth skin, taking it easy in style.",
    price: 400000,
    locked: true,
  },
  {
    name: "chimpanzee",
    bio: "Get ready to swing into action with this intelligent and charming chimpanzee skin.",
    price: 500000,
    locked: true,
  },
  {
    name: "giraffe",
    bio: "Reach new heights with this tall and charming giraffe skin, perfect for standing out.",
    price: 800000,
    locked: true,
  },
  {
    name: "kangaroo",
    bio: "Hop into action with this energetic and playful kangaroo skin, full of Aussie charm.",
    price: 900000,
    locked: true,
  },
  {
    name: "meerkat",
    bio: "Stand watch with this curious and social meerkat skin, always on the lookout for fun.",
    price: 1100000,
    locked: true,
  },
  {
    name: "elephant",
    bio: "Wise and gentle, this elephant skin is a majestic addition to any collection.",
    price: 1200000,
    locked: true,
  },
  {
    name: "toucan",
    bio: "Brighten up your day with this colorful and playful toucan skin, full of tropical flair.",
    price: 1400000,
    locked: true,
  },
  {
    name: "zebra",
    bio: "Stripe up your style with this bold and striking zebra skin, black and white and ready to go.",
    price: 1600000,
    locked: true,
  },
  {
    name: "godfather",
    bio: "Make an offer you can't refuse with this sleek and sophisticated godfather skin.",
    price: 1800000,
    locked: true,
  },
  {
    name: "lion",
    bio: "Roar with pride with this regal and fearless lion skin, the king of the jungle.",
    price: 2200000,
    locked: true,
  },
  {
    name: "dino",
    bio: "Unleash your inner beast with this prehistoric dino skin, roaring with excitement.",
    price: 2000000,
    locked: true,
  },
  {
    name: "dragon",
    bio: "Breathe fire into your wardrobe with this mythical dragon skin, symbolizing power and strength.",
    price: 2500000,
    locked: true,
  },
];

export default function SkinSelectionPage() {
  const [selectedSkin, setSelectedSkin] = useState(skins[0]);
  const mainBtn = useMainButton();

  const handleMainBtn = () => {
    mainBtn.enable();
    mainBtn.setText(selectedSkin.locked ? "Unlock to Purchase" : "Purchase");
    mainBtn.setBgColor("#08F7AF");
    mainBtn.show();

    mainBtn.on("click", () => {
      mainBtn.showLoader();
      setTimeout(() => {
        console.log("Purchase action for", selectedSkin.name);
        mainBtn.hideLoader();
        // Add purchase logic here
      }, 2000);
    });
  };

  useEffect(() => {
    handleMainBtn();
  }, [selectedSkin]);

  return (
    <AppRoot className="flex flex-col gap-2 px-2">
      <Title className="text-3xl font-bold pl-4">Skins</Title>
      <div className="flex h-[calc(100vh-120px)] justify-between">
        <div className="w-1/2 px-2 flex flex-col items-center h-full">
          <Card className="p-4 w-full">
            <img
              alt={selectedSkin.name}
              src={`/skins/${selectedSkin.name}.webp`}
              className="rounded object-cover w-full h-full"
            />
          </Card>
          <div className="text-start pt-4 pl-2">
            <h2 className="text-3xl font-bold mb-2">
              {selectedSkin.name.charAt(0).toUpperCase() +
                selectedSkin.name.slice(1)}
            </h2>
            <p className="text-lg text-gray-500 mb-4">{selectedSkin.bio}</p>
            <p className="text-2xl font-bold mb-2">${selectedSkin.price}</p>
          </div>
        </div>
        <div className="w-1/2 overflow-y-auto h-[calc(100vh-120px)]">
          <div className="flex flex-col gap-2 px-2">
            {skins.map((skin) => (
              <Card
                key={skin.name}
                onClick={() => setSelectedSkin(skin)}
                className="cursor-pointer relative"
              >
                <React.Fragment>
                  <Card.Chip readOnly>
                    {skin.name.charAt(0).toUpperCase() + skin.name.slice(1)}
                  </Card.Chip>
                  <img
                    alt={skin.name}
                    src={`/skins/${skin.name}.webp`}
                    style={{
                      display: "block",
                      objectFit: "cover",
                      filter: skin.locked ? "brightness(0.5)" : "none",
                    }}
                  />
                  {skin.locked && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <LockIcon size={48} />
                    </div>
                  )}
                  <Card.Cell
                    readOnly
                    subtitle={skin.locked ? skin.price : "Unlocked"}
                  >
                    {skin.locked ? skin.bio : skin.bio}
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
