import React from "react";

function Timer() {
  var date = new Date().toString().split(" ").splice(1, 3).join(" ");
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }
  return (
    <div>
      <div style={{ paddingRight: "10px", color: "#555" }}>
        <h4>{formatAMPM(new Date())}</h4>
        <p>{date}</p>
      </div>
    </div>
  );
}

export default Timer;
