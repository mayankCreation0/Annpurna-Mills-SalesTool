import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Paper } from "@mui/material";

export default function Layout () {
    return (
          <Paper component={'section'} sx={{bgcolor:"applicationTheme.bgColor"}} className="h-screen w-full flex flex-col justify-start items-start gap-2 overflow-hidden p-2 ">     
                       <Navbar/>
                       <Paper component={'div'} className="w-full flex-grow overflow-y-auto !shadow-none">
                         <Outlet/> 
                       </Paper>   
          </Paper>
    )
}