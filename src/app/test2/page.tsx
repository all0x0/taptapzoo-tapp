"use client";

import { useState } from "react";
import { useAccount, useConnect, useDisconnect, useWriteContract } from "wagmi";
import { base } from "wagmi/chains";
import { parseEther } from "viem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const UNISWAP_V3_ROUTER_ADDRESS = "0x2626664c2603336E57B271c5C0b26F421741e481"; // Base mainnet router
const TOKEN_ADDRESS = "0x5145Dc366F25f96f219850F5aCaD50DF76eE424D";

const SWAP_ABI = [
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMinimum", type: "uint256" },
      { internalType: "uint160", name: "sqrtPriceLimitX96", type: "uint160" },
    ],
    name: "exactInputSingle",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
];

export default function SwapPage() {
  const [inputAmount, setInputAmount] = useState("0.1");

  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const { writeContract, isError, isPending } = useWriteContract();

  const handleConnect = async () => {
    if (isConnected) {
      disconnect();
    } else {
      // connect();
    }
  };

  const handleSwap = async () => {
    if (!isConnected) return;

    writeContract({
      address: UNISWAP_V3_ROUTER_ADDRESS,
      abi: SWAP_ABI,
      functionName: "exactInputSingle",
      args: [
        address ?? "0x0000000000000000000000000000000000000000",
        parseEther(inputAmount),
        0, // Set a minimum amount out if desired
        0, // No price limit
      ],
      value: parseEther(inputAmount),
      chainId: base.id,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Uniswap V3 Swap on Base</h1>

      <Button onClick={handleConnect} className="mb-4">
        {isConnected
          ? `Disconnect ${address?.slice(0, 6)}...${address?.slice(-4)}`
          : "Connect Wallet"}
      </Button>

      <div className="w-full max-w-md space-y-4">
        <Input
          type="number"
          placeholder="Input Amount (ETH)"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
          disabled={!isConnected}
        />
        <Button
          onClick={handleSwap}
          disabled={!isConnected || !inputAmount || isPending}
        >
          {isPending ? "Swapping..." : `Swap ${inputAmount} ETH for Token`}
        </Button>
        {isError && <p className="text-red-500">Error occurred during swap</p>}
      </div>
    </div>
  );
}
