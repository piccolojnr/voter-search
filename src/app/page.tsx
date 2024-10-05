import SearchPage from "@/components/SearchPage";
import { Suspense } from "react";

const Home = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchPage />
      </Suspense>
    </div>
  );
};

export default Home;
