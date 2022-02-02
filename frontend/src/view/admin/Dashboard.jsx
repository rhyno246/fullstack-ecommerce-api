import React from "react";
import { listItemsDashBoard } from "../../component/listItems";
import Layout from "./Layout";
const Dashboard = () => {
  return (
    <Layout title="Dashboard">
      <div className="top-items">{listItemsDashBoard}</div>
    </Layout>
  );
};

export default Dashboard;
