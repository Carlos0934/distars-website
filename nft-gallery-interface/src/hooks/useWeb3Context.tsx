import { createContext, useContext } from "react";
import Web3 from "web3";
import { useWeb3 } from "./useWeb3";

type Web3ContextType = {
    account: string | null
    web3: Web3 | null
    networkId: number | null
    connect: () => Promise<void>
    disconnect: () => Promise<void>
    
}
const Web3Context = createContext<Web3ContextType | null>(null);

export const  Web3Provider = ({children}: {children: React.ReactNode}) => {
    const value = useWeb3()
    return (
        <Web3Context.Provider value={value}>
            {children}
        </Web3Context.Provider>
    )
}

export const useWeb3Context = () => {
    const context = useContext(Web3Context)
    if (context === undefined || context === null) {
        throw new Error("useWeb3Context must be used within a Web3Provider")
    }
    
    return context
}