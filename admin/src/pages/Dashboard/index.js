import React, { useState } from "react";

import { AuthGuard } from "../../shared";
import Timer from "../../shared/Timeer/Timer";
import ClickChart from "./BarChart/ClicksChart";
import SearchChart from "./BarChart/search";
import SignUpChart from "./BarChart/SignUpChart";
import UserBarChart from "./BarChart/UserBarChart";
import ViewsChart from "./BarChart/ViewsChart";
import "./style.scss";

function Dashboard() {
  document.title = "Dashboard";
  const [SelectChart, setSelectChart] = useState("User");

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="dashbordHeader"
      >
        <div>
          {/* <h2>Dashboard</h2>
          <p style={{ paddingTop: "10px", color: "#555" }}>
            Welcome to <span style={{ color: "salmon" }}>Micple</span> Dashboard
          </p> */}
        </div>
        <Timer />
      </div>
      <hr />
      <Audience SelectChart={SelectChart} setSelectChart={setSelectChart} />
      <div style={{ display: "flex" }}>
        <div className="chart">
          {SelectChart === "User" ? (
            <UserBarChart />
          ) : SelectChart === "View" ? (
            <ViewsChart />
          ) : SelectChart === "Clicks" ? (
            <ClickChart />
          ) : (
            <SignUpChart />
          )}
        </div>
        <hr />
        <div className="chart">
          <SearchChart />
        </div>
      </div>
    </div>
  );
}

export default AuthGuard(Dashboard);

// audiend component
function Audience({ SelectChart, setSelectChart }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 0px",
      }}
    >
      <button
        style={{ border: "none", padding: "10px", width: "50%" }}
        onClick={() => {
          setSelectChart("User");
        }}
      >
        <div
          style={{
            padding: "20px",
            borderRadius: "5px",
            backgroundColor:
              SelectChart === "User" ? "rgba(43,71,196,0.8)" : "",
            color: SelectChart === "User" ? "#fff" : "#000",
            boxShadow: "-7px 9px 11px -5px rgba(43,71,196,0.37)",
          }}
        >
          <p
            style={{
              paddingBottom: "5px",
              color: SelectChart === "User" ? "#fff" : "grey",
            }}
          >
            Total User
          </p>
          <h1>67,412</h1>
        </div>
      </button>
      <button
        style={{ border: "none", padding: "10px", width: "50%" }}
        onClick={() => {
          setSelectChart("View");
        }}
      >
        <div
          style={{
            padding: "20px",
            borderRadius: "5px",
            backgroundColor:
              SelectChart === "View" ? "rgba(43,71,196,0.8)" : "",
            color: SelectChart === "View" ? "#fff" : "#000",
            boxShadow: "-7px 9px 11px -5px rgba(43,71,196,0.37)",
          }}
        >
          <p
            style={{
              paddingBottom: "5px",
              color: SelectChart === "View" ? "#fff" : "grey",
            }}
          >
            Total View
          </p>
          <h1>104,412</h1>
        </div>
      </button>

      <button
        style={{ border: "none", padding: "10px", width: "50%" }}
        onClick={() => {
          setSelectChart("Clicks");
        }}
      >
        <div
          style={{
            padding: "20px",
            borderRadius: "5px",
            backgroundColor:
              SelectChart === "Clicks" ? "rgba(43,71,196,0.8)" : "",
            color: SelectChart === "Clicks" ? "#fff" : "#000",
            boxShadow: "-7px 9px 11px -5px rgba(43,71,196,0.37)",
          }}
        >
          <p
            style={{
              paddingBottom: "5px",
              color: SelectChart === "Clicks" ? "#fff" : "grey",
            }}
          >
            Clicks
          </p>
          <h1>107,412</h1>
        </div>
      </button>
      <button
        style={{ border: "none", padding: "10px", width: "50%" }}
        onClick={() => {
          setSelectChart("Signup");
        }}
      >
        <div
          style={{
            padding: "20px",
            borderRadius: "5px",
            backgroundColor:
              SelectChart === "Signup" ? "rgba(43,71,196,0.8)" : "",
            color: SelectChart === "Signup" ? "#fff" : "#000",
            boxShadow: "-7px 9px 11px -5px rgba(43,71,196,0.37)",
          }}
        >
          <p
            style={{
              paddingBottom: "5px",
              color: SelectChart === "Signup" ? "#fff" : "grey",
            }}
          >
            Sign up
          </p>
          <h1>107,412</h1>
        </div>
      </button>
    </div>
  );
}
