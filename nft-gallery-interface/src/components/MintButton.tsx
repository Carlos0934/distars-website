import { FC } from "react";
import { useMintDistar } from "../hooks/useDistars";

interface MintButtonProps {
  className?: string;
}
export const MintButton: FC<MintButtonProps> = ({ className }) => {
  const { mint, isLoading } = useMintDistar();

  return (
    <>
      <button
        onClick={mint}
        disabled={isLoading}
        className={`px-5 text-white py-2 text-lg font-semibold  bg-green-500 hover:bg-green-400 transition rounded-lg disabled:opacity-50 ${className} `}
      >
        Get your Distar today!
      </button>

      {isLoading && (
        <div className="flex flex-col mt-5 items-center justify-center w-full h-full">
          <div className="animate-spin rounded-[50%] h-10 w-10  border-[8px] border-gray-200 border-t-gray-400"></div>
          <p className="text-sm mt-4 text-gray-400">
            Minting your Distar, please wait... (this may take a few minutes)
          </p>
        </div>
      )}
    </>
  );
};
