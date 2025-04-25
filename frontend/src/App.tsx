// import CollectionPage from "./Component/Mobile/Collection/CollectionPage"
// import HomePage from "./Component/Mobile/HomePage/HomePage"
// import Landing from "./Component/Landing/Landing"
// // import MusicPlayer from "./Component/Mobile/MusicPlay/MusicPlayer"

// function App() {
//   return (
//     <>
//     <Landing />
//     {/* <HomePage /> */}
//     {/* <CollectionPage /> */}
//     {/* <MusicPlayer /> */}
//     </>
//   )
// }

// export default App






import { useEffect, useState } from "react";
import Mobile from "./Component/Mobile/Mobile";
import Desktop from "./Component/Desktop/Desktop";



const useViewport = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { width };
};

function App() {
  const { width } = useViewport();
  const isMobile = width < 768;

  return isMobile ? <Mobile /> : <Desktop />
}

export default App;
