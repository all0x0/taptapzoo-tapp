"use client";

import { useInitData, useMainButton, usePopup } from "@telegram-apps/sdk-react";
import { AppRoot, Card, Title } from "@telegram-apps/telegram-ui";
import { LockIcon } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { buySkinAction, fetchMarketplaceAction } from "../actions/skinActions";

interface SkinsData {
  name: string;
  bio: string;
  price: number;
  currency: string;
  locked: boolean;
}

export default function SkinSelectionPage() {
  const [skins, setSkins] = useState<SkinsData[]>([]);
  const [selectedSkin, setSelectedSkin] = useState<SkinsData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const mainBtn = useMainButton();
  const popup = usePopup();
  const initData = useInitData();
  const user = useMemo(() => initData?.user, [initData]);

  useEffect(() => {
    if (user?.id) {
      fetchMarketplaceData();
    }
  }, [user]);

  const fetchMarketplaceData = async () => {
    if (!user?.id) {
      setError("User ID is required");
      return;
    }

    try {
      const skins = await fetchMarketplaceAction(user.id);
      setSkins(skins);
      setSelectedSkin(skins[0]);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch marketplace data");
      setLoading(false);
    }
  };

  const handleMainBtn = () => {
    if (!selectedSkin) return;

    mainBtn.enable();
    mainBtn.setText("Purchase");
    mainBtn.setBgColor("#08F7AF");

    if (selectedSkin.locked) {
      mainBtn.show();
    } else {
      mainBtn.hide();
    }

    mainBtn.on("click", async () => {
      mainBtn.showLoader();

      if (!user?.id) {
        setError("User ID is required");
        return;
      }

      // try {
      await buySkinAction(user.id, selectedSkin.name);
      await fetchMarketplaceData();
      mainBtn.hideLoader();
      popup.open({
        title: "Success",
        message: `You've successfully purchased the ${selectedSkin.name} skin!`,
        buttons: [{ type: "close" }],
      });
      // } catch (err) {
      //   console.error("Purchase failed:", err);
      //   mainBtn.hideLoader();
      //   popup.open({
      //     title: "Error",
      //     message: "Failed to purchase skin. Please try again.",
      //     buttons: [{ type: "close" }],
      //   });
      // }
    });
  };

  useEffect(() => {
    handleMainBtn();
  }, [selectedSkin]);

  if (!user?.id) return <div>Loading user data...</div>;
  if (loading) return <div>Loading marketplace data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <AppRoot className="flex flex-col gap-2 px-2">
      <Title className="text-3xl font-bold pl-4">Skins</Title>
      <div className="flex h-[calc(100vh-120px)] justify-between">
        <div className="w-1/2 px-2 flex flex-col items-center h-full">
          {selectedSkin && (
            <Card className="p-4 w-full">
              <img
                alt={selectedSkin.name}
                src={`/skins/${selectedSkin.name}.webp`}
                className="rounded object-cover w-full h-full"
              />
            </Card>
          )}
          {selectedSkin && (
            <div className="text-start pt-4 pl-2">
              <h2 className="text-3xl font-bold mb-2">
                {selectedSkin.name.charAt(0).toUpperCase() +
                  selectedSkin.name.slice(1)}
              </h2>
              <p className="text-lg text-gray-500 mb-4">{selectedSkin.bio}</p>
              <p className="text-2xl font-bold mb-2">
                {selectedSkin.price} {selectedSkin.currency}
              </p>
            </div>
          )}
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
                    subtitle={
                      skin.locked
                        ? skin.price + " " + skin.currency
                        : "Unlocked"
                    }
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
