import { Link } from "react-router-dom";
import { useDistarInfo, useMintDistar } from "../../hooks/useDistars";
import { MintButton } from "../MintButton";

const numberFormater = new Intl.NumberFormat("en-US");
export const HomePage = () => {
  const { supply, minted } = useDistarInfo();
  return (
    <div className="grid items-center mt-20 grid-cols-2">
      <div>
        <h1 className="text-3xl font-semibold">Distars</h1>
        <p className="font-sans text-gray-700">
          Distars is a collection of 10,000 unique digital collectibles on the
          Ethereum blockchain. Each Distar is a unique combination of 4
          attributes: Color, Pattern, Eyes, Mouth, and Background. There are 20
          possible colors, 20 possible patterns, 20 possible eyes, 20 possible
          mouths. This means there are 20^4 = 160,000 possible Distars. Only
          10,000 Distars will be minted, so each Distar is unique.
        </p>

        <div className="mt-10 text-white">
          <Link
            to="/my-distars"
            className="ml-5 px-5 py-2 text-lg font-semibold  bg-yellow-500 hover:bg-yellow-400 transition rounded-lg"
          >
            My Distars
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <img
          src="https://avatars.dicebear.com/api/avataaars/232.svg"
          alt="distars"
          className="max-w-xs "
        />

        <MintButton className="mt-10" />

        <div className="mt-10 flex-wrap text-gray-700 flex gap-5">
          <p className="text-lg font-semibold">
            Total Supply:{numberFormater.format(supply)}
          </p>
          <p className="text-lg font-semibold">
            Total Available:{numberFormater.format(supply - minted)}
          </p>
          <p className="text-lg font-semibold">
            Total Minted:{numberFormater.format(minted)}
          </p>
        </div>
      </div>
    </div>
  );
};
