"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import { treasuryAddress } from "@/constants";
import { tokenAbi } from "@/constants/abi";
import { parseEther } from "viem";

export default function SendTokens() {
  const { data: hash, isPending, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const amountInEther = formData.get("amount") as string;
    const amountInWei = parseEther(amountInEther);
    console.log(amountInWei);
    writeContract({
      address: "0x3055913c90Fcc1A6CE9a358911721eEb942013A1",
      abi: tokenAbi,
      functionName: "transfer",
      args: [treasuryAddress, amountInWei],
    });
  }

  const {
    isLoading: isConfirming,
    error,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirmed) {
      toast.success("Transaction Successful");
    }
    if (error) {
      toast.error("Transaction Failed");
    }
  }, [isConfirmed, error]);

  return (
    <form onSubmit={submit}>
      <p className="text-sm text-gray-500">
        Enter the amount of CAKE tokens to send
      </p>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          name="amount"
          placeholder="Amount"
          type="number"
          required
          className="bg-black text-white rounded-full "
        />
        <Button
          disabled={isPending || isConfirming}
          type="submit"
          variant={"default"}
          size={"one-third"}
        >
          {isPending ? "Confirming..." : "Send Tokens"}
        </Button>
      </div>
    </form>
  );
}
