import { useDistars } from "../../hooks/useDistars";

import { DistarCards } from "../DistarCards";

export const GalleryPage = () => {
  const { distars, isLoading } = useDistars();
  return (
    <div>
      <h1 className="text-3xl font-semibold">Gallery</h1>
      <p className="font-sans text-gray-700">
        This is a list of all the Distars minted. You can click on a Distar to
        view it on OpenSea.
      </p>
      <DistarCards distars={distars} isLoading={isLoading} />
    </div>
  );
};
