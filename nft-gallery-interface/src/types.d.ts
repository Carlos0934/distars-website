export {};

declare global {
  interface Window  {
    // pick one
    ethereum: EthereumProvider
    // ethereum: ExternalProvider
    // ethereum: AbstractProvider
  }
}


// ExternalProvider seems to be the official ethersproject type for the window.ethereum object, however, `new Web3(ethereum)` does not like it so we must improvise.
declare type ExternalProvider = import('@ethersproject/providers').ExternalProvider
declare type AbstractProvider = import('../node_modules/web3-core/types').AbstractProvider
interface EthereumProvider extends ExternalProvider {
  _state: any
  sendAsync: AbstractProvider['sendAsync']
  on: (event: string, listener: (...args: any[]) => void) => void
  removeListener: (event: string, listener: (...args: any[]) => void) => void
}