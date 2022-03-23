import { useEffect } from "react";
import axios from "axios";

import Scanner from "../components/Scanner";

const Dashboard = (props) => {

  useEffect(() => {
    axios.get("/dashboard", (response) => {
      console.log("Welcome, store owner")
      console.log(response.data )
    })
  })

  return (
    <div className="dashboard">
      <Scanner />
    </div>
  );
};

export default Dashboard;
