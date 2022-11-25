import { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import { getLibrary } from "../config/web3";
import { useLocalStorage } from "./useLocalstorage";

const NETWORK_NAMES: Record<number, string> = {
  1: "Mainnet",
  1337: "Localhost",
};
export const useWeb3 = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [networkId, setNetworkId] = useState<number | null>(null);
  const [networkName, setNetworkName] = useState<string | null>(null);

  const [isConnected, setIsConnected] = useLocalStorage<boolean>(
    "isConnected",
    false
  );

  const connect = useCallback(async () => {
    if (!window.ethereum) return;

    const accounts =
      (await window.ethereum.request?.({ method: "eth_requestAccounts" })) ??
      [];

    setAccount(accounts[0]);

    const networkId = (await web3?.eth.getChainId()) ?? 0;

    setNetworkId(networkId);
    setNetworkName(NETWORK_NAMES[networkId]);
    setIsConnected(true);
  }, [web3]);

  const disconnect = useCallback(async () => {
    if (!window.ethereum) return;

    await window.ethereum.request?.({ method: "eth_requestAccounts" });
    setAccount(null);
    setNetworkId(null);
    setNetworkName(null);
    setIsConnected(false);
  }, []);

  useEffect(() => {
    if (!window.ethereum) {
      return;
    }

    const library = getLibrary(window.ethereum);

    setWeb3(library);

    const onAccountsChanged = (accounts: string[]) => {
      setAccount(accounts[0]);
    };

    const onNetworkChanged = (networkId: number) => {
      setNetworkId(networkId);
      setNetworkName(NETWORK_NAMES[networkId]);
    };

    window.ethereum.on("accountsChanged", onAccountsChanged);

    window.ethereum.on("chainChanged", onNetworkChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", onAccountsChanged);
      window.ethereum.removeListener("chainChanged", onNetworkChanged);
    };
  }, []);

  useEffect(() => {
    if (!web3 || !isConnected) {
      return;
    }

    connect();
  }, [connect, isConnected, web3]);

  return { web3, account, networkId, networkName, connect, disconnect };
};
