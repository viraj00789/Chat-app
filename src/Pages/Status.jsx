import React from "react";
import "./Status.sass";
import StatusSideBar from "../Components/Status/StatusSideBar";
import StatusSideScreen from "../Components/Status/StatusSideScreen";
import { useTheme } from "../store/ThemeContext";

const Status = () => {
  const {isDark} = useTheme();
  return (
    <>
     <div className="status-div">
        <div className={`status-side-bar ${isDark ? "active" : "inactive"}`}>
           <StatusSideBar/>
        </div>
        <div className={`status-bar ${isDark ? "active" : "inactive"} `}>
          <StatusSideScreen/>
        </div>
     </div>
    </>
  );
};

export default Status;
