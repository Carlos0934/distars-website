import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { GalleryPage } from "./components/pages/GalleryPage";
import { HomePage } from "./components/pages/HomePage";
import { MyDistarsPage } from "./components/pages/MyDistarsPage";
import { useWeb3Context } from "./hooks/useWeb3Context";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<HomePage />} path="/" />

        <Route element={<MyDistarsPage />} path="/my-distars" />
      </Route>
    </Routes>
  );
}

export default App;
