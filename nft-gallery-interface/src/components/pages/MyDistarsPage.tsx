import { useDistarsOfOwner } from "../../hooks/useDistars";
import { DistarCards } from "../DistarCards";

export const MyDistarsPage = () => {
  const { distars, isLoading } = useDistarsOfOwner();
  return (
    <div>
      <h1 className="text-3xl font-semibold">My Distars</h1>
      <p className="font-sans text-gray-700">
        This is a list of all the Distars you own. You can click on a Distar to
        view it on OpenSea.
      </p>
      <DistarCards distars={distars} isLoading={isLoading} />
    </div>
  );
};
