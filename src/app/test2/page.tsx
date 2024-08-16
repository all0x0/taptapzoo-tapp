"use client";

import { useState, useMemo } from "react";
import { useInitData, useLaunchParams } from "@telegram-apps/sdk-react";
import { List, Placeholder } from "@telegram-apps/telegram-ui";
import {
  addOrUpdateUser,
  claimDailyReward,
  getUserInfo,
} from "../actions/userActions";

export default function Home() {
  const initData = useInitData();
  const { initDataRaw } = useLaunchParams();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [message, setMessage] = useState("");

  const user = useMemo(() => initData?.user, [initData]);

  const handleAddOrUpdateUser = async () => {
    if (user) {
      const result = await addOrUpdateUser(user.id, user.username || "");
      setMessage(result.message);
    }
  };

  const handleGetUserInfo = async () => {
    if (user) {
      const info = await getUserInfo(user.id);
      setUserInfo(info);
      setMessage("");
    }
  };

  const handleClaimReward = async () => {
    if (user) {
      const result = await claimDailyReward(user.id);
      setMessage(result.message || result.error);
    }
  };

  if (!initData || !initDataRaw) {
    return (
      <Placeholder
        header="Oops"
        description="Application was launched with missing init data"
      >
        <img
          alt="Telegram sticker"
          src="https://xelene.me/telegram.gif"
          style={{ display: "block", width: "144px", height: "144px" }}
        />
      </Placeholder>
    );
  }

  return (
    <List>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Telegram User Actions</h1>

        <div className="space-y-4">
          <button
            onClick={handleAddOrUpdateUser}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add/Update User
          </button>

          <button
            onClick={handleGetUserInfo}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Get User Info
          </button>

          <button
            onClick={handleClaimReward}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Claim Daily Reward
          </button>
        </div>

        {message && (
          <div className="mt-4 p-2 bg-gray-100 rounded">
            <p>{message}</p>
          </div>
        )}

        {userInfo && (
          <div className="mt-4 p-2 bg-gray-100 rounded">
            <h2 className="text-xl font-semibold">User Info:</h2>
            <pre>{JSON.stringify(userInfo, null, 2)}</pre>
          </div>
        )}

        <div className="mt-4">
          <h2 className="text-xl font-semibold">Init Data:</h2>
          <pre className="bg-gray-100 p-2 rounded mt-2 overflow-x-auto">
            {JSON.stringify(initData, null, 2)}
          </pre>
        </div>
      </div>
    </List>
  );
}
