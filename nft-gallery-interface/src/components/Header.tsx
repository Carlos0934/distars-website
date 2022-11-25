import { Link } from "react-router-dom";
import { useWeb3Context } from "../hooks/useWeb3Context";

export const Header = () => {
  const { connect, disconnect, account } = useWeb3Context();
  return (
    <header className=" text-white flex  h-20 bg-blue-600 shadow">
      <nav className="max-w-screen-xl mx-auto w-full px-4 flex items-center   ">
        <Link to="/">
          <h1 className="text-3xl font-semibold">Distars</h1>
        </Link>

        <ul className="flex ml-10 text-gray-100 gap-5 text-xl  ">
          <li>
            <Link to="/my-distars">My Distars</Link>
          </li>
        </ul>

        <div className=" ml-auto ">
          {account ? (
            <div className="flex  bg-blue-500 pl-4 rounded-full ">
              <span className="mr-3">
                {account.slice(0, 6)}...{account.slice(-4)}
              </span>
              <button
                onClick={disconnect}
                className="bg-red-400 text-gray-100 rounded-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <button
              onClick={connect}
              className="px-5 py-2 text-lg font-semibold  bg-blue-500 hover:bg-blue-400 transition rounded-lg"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};
