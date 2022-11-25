import { Contract } from "web3-eth-contract";
import Web3 from "web3";

import { distarsConfing } from "../config/distarts.abi";
import { DistarDTO } from "../types/distar.dto";
export class DistarService {
  private contract: Contract;

  constructor(private web3: Web3, private chainId: string) {
    const contractAddress = distarsConfing.address[chainId];
    if (!contractAddress) {
      throw new Error(`No contract address for chainId ${chainId}`);
    }
    this.contract = new web3.eth.Contract(distarsConfing.abi, contractAddress);
  }

  public async getDistarsOfOwner(account: string): Promise<DistarDTO[]> {
    const birthBlock = await this.getBirthBlock();
    const events = await this.contract.getPastEvents("Transfer", {
      fromBlock: birthBlock,
      toBlock: "latest",
      filter: { to: account },
    });
    const distars = await Promise.all(
      events.map(async (event) => {
        const { tokenId } = event.returnValues;
        const uri = await this.contract.methods.tokenURI(tokenId).call();
        return {
          id: tokenId,
          uri,
          owner: account,
        };
      })
    );
    return distars;
  }

  public async mint(account: string): Promise<void> {
    await this.contract.methods.mint().send({ from: account, value: 0 });
  }

  public async getMaxSupply(): Promise<number> {
    const supply = await this.contract.methods.maxSupply().call();
    return supply;
  }

  public async getTotalMinted(): Promise<number> {
    const minted = await this.contract.methods.totalSupply().call();
    return minted;
  }
  private async getBirthBlock(): Promise<number> {
    const hash = distarsConfing.hashes[this.chainId];
    const recipt = await this.web3.eth.getTransactionReceipt(hash);
    return recipt.blockNumber;
  }
}
