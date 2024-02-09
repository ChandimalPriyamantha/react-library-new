import { Carousel } from "./HomPage/components/Carousel";
import { ExploreTopBooks } from "./HomPage/components/ExploreTopBooks";
import { Heros } from "./HomPage/components/Heros";
import { LibraryServices } from "./HomPage/components/LibraryServices";

export const HomePage = () => {
  return (
    <>
      <ExploreTopBooks />
      <Carousel />
      <Heros />
      <LibraryServices />
    </>
  );
};
