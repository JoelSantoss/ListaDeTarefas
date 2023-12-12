
import { Routes, Route } from "react-router-dom"


import Home from '../pages/Home'
import Register from "../pages/Register"
import Adimin from "../pages/Adimin"

import Private from "./Private"

function RoutesApp(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>

            <Route path="/adimin" element={<Private> <Adimin/> </Private>}/>
        </Routes>
    )
}

export default RoutesApp