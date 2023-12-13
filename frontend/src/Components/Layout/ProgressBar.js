import React from "react";

import LinearProgress from "@mui/material/LinearProgress";

export default function ProgressBar({ value }) {
  return (
    
     
      <div className="progress-bar">
        <LinearProgress variant="buffer" value={value} />
      </div>
    
  );
}
