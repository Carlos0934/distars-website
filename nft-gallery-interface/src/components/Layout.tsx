import { Link, Outlet } from "react-router-dom";
import { useWeb3Context } from "../hooks/useWeb3Context";
import { Header } from "./Header";

export const Layout = () => {
  const { account, connect } = useWeb3Context();

  return (
    <>
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 mt-4">
        {account ? (
          <Outlet />
        ) : (
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-semibold">Connect Wallet</h1>
            <p className="text-gray-500 mt-4">
              Please connect your wallet to continue
            </p>

            <button
              onClick={connect}
              className="mt-10 px-5 text-white py-2 text-lg font-semibold  bg-green-500 hover:bg-green-400 transition rounded-lg"
            >
              Connect Wallet
            </button>
          </div>
        )}
      </main>
    </>
  );
};
