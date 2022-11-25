import Web3 from "web3";
import { AbiItem } from "web3-utils";
export const getLibrary = (provider: any) => {
  const library = new Web3(provider);

  return library;
};

export interface ContractConfig {
  address: Record<string, string>;
  abi: AbiItem[];
  hashes: Record<string, string>;
}
