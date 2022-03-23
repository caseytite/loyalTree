import { useState, useEffect } from "react";
import axios from "axios";

import Scanner from "../components/Scanner";

const Dashboard = (props) => {
  const [storeInfo, setStoreInfo] = useState({});

  useEffect(() => {
    axios.get("/dashboard").then((response) => {
      setStoreInfo(response.data);
    });
  }, []);

  // while building dashboard
  console.log(storeInfo);

  return (
    <div className="dashboard">
      <h2>{`Dashboard » ${storeInfo.name}`}</h2>
      <Scanner />
    </div>
  );
};

export default Dashboard;
