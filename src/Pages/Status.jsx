import React from "react";
import "./Status.sass";
import StatusSideBar from "../Components/Status/StatusSideBar";
import StatusSideScreen from "../Components/Status/StatusSideScreen";

const Status = () => {
  return (
    <>
     <div className="status-div">
        <div className="status-side-bar">
           <StatusSideBar/>
        </div>
        <div className="status-bar">
          <StatusSideScreen/>
        </div>
     </div>
    </>
  );
};

export default Status;
