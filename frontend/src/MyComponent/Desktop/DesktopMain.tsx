import Desktophome from "./HomePage/Desktophome"
import {BrowserRouter} from "react-router-dom"
import { Route ,Routes } from "react-router-dom"
import Home from "./DesktopComponent/Home"
import Collection from "./DesktopComponent/Collection"
import Landing from "../Landing/Landing"

function Desktop() {
  return (
   <>
   <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Desktophome MainElement = {<Home />} />} />
      <Route path="/" element={<Landing />} />
      <Route path="/collection" element={<Desktophome MainElement = {<Collection />} />} />
    </Routes>







   </BrowserRouter>
   
   </>
  )
}

export default Desktop