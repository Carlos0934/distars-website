import { getNetwork } from "@ethersproject/providers";
import { FC, useMemo } from "react";
import { distarsConfing } from "../config/distarts.abi";
import { useMintDistar } from "../hooks/useDistars";
import { useWeb3 } from "../hooks/useWeb3";
import { DistarDTO } from "../types/distar.dto";
import { MintButton } from "./MintButton";

interface DistarCardProps {
  distars: DistarDTO[];
  isLoading?: boolean;
}
export const DistarCards: FC<DistarCardProps> = ({ distars, isLoading }) => {
  const { networkId } = useWeb3();
  const contractAddress = useMemo(
    () => (networkId ? distarsConfing.address[networkId?.toString()] : ""),
    [networkId]
  );

  if (isLoading)
    return (
      isLoading && (
        <div className="grid grid-cols-1 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-100 rounded-lg shadow-lg"
            >
              <div className="h-40 bg-gray-200 rounded-t-lg"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      )
    );

  if (distars.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-semibold">No Distars Found</h1>
        <p className="text-gray-500 mt-4">
          Mint your first Distar today to get started 🙌
        </p>
        <MintButton className="mt-5" />
      </div>
    );

  return (
    <div className="grid grid-cols-1 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {distars.map((distar) => (
        <div key={distar.id} className="border border-gray-200 rounded-lg p-4">
          <img
            src={distar.uri}
            alt="distar"
            className="max-w-full rounded-lg"
          />
          <div className="mt-4 flex justify-between">
            <p className="text-gray-700 font-semibold">#{distar.id}</p>
            <a
              href={`https://opensea.io/assets/${
                getNetwork(networkId || 1).name
              }/${contractAddress}/${distar.id}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 font-semibold"
            >
              View on OpenSea
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
