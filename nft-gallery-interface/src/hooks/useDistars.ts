import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { DistarService } from "../services/distar.service";
import { DistarDTO } from "../types/distar.dto";
import { useWeb3Context } from "./useWeb3Context";
import { useWeb3 } from "./useWeb3";
export const useDistarService = () => {
  const { web3, networkId } = useWeb3Context();
  const distarService = useMemo(
    () =>
      web3 && networkId ? new DistarService(web3, networkId?.toString()) : null,
    [web3, networkId]
  );

  return distarService;
};

export const useMintDistar = () => {
  const distarService = useDistarService();
  const { account } = useWeb3Context();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    async () => {
      if (distarService && account) {
        await distarService.mint(account);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["distars"]);
      },
    }
  );

  return {
    mint: () => mutate(),
    isLoading,
  };
};

export const useDistarInfo = () => {
  const distarService = useDistarService();
  const {
    data: maxSupply,
    isLoading: maxSupplyLoading,
    error: maxSupplyError,
  } = useQuery(
    ["distars", "supply"],
    () => distarService?.getMaxSupply() ?? 0,
    {
      enabled: !!distarService,
    }
  );
  const {
    data: minted,
    isLoading: mintedLoading,
    error: mintedError,
  } = useQuery(
    ["distars", "minted"],
    () => distarService?.getTotalMinted() ?? 0,
    {
      enabled: !!distarService,
    }
  );

  return { supply: maxSupply ?? 0, minted: minted ?? 0 };
};

export const useDistarsOfOwner = () => {
  const distarService = useDistarService();
  const { account } = useWeb3Context();
  const { data, isLoading, error } = useQuery(
    ["distarsOfOwner", account],
    () =>
      account && distarService ? distarService.getDistarsOfOwner(account) : [],
    {
      enabled: !!distarService && !!account,
    }
  );
  return { distars: data ?? [], isLoading, error };
};
