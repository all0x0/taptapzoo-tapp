"use client";
import { useReadContract } from "wagmi";
import { tokenAbi } from "@/constants/abi";
import { counterAddress } from "@/constants";

export function ReadContract() {
  const {
    data: counter,
    status,
    isLoading,
    error,
  } = useReadContract({
    abi: tokenAbi,
    address: counterAddress,
    functionName: "totalSupply",
  });

  console.log(counter, status, isLoading, error);

  return (
    <div className="text-left my-8">
      {isLoading ? (
        <div>Loading</div>
      ) : error ? (
        <div className="text-red-500">Error</div>
      ) : (
        <div className="text-2xl">
          Current Number:{" "}
          <span className="text-rabble">{counter?.toString()}</span>
        </div>
      )}
    </div>
  );
}
