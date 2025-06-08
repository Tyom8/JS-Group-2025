import React from "react";
import DashBoardUsers from "../components/DashboardUsers/DashboardUsers";
import ProjectsList from "../components/ProjectList/ProjectsList";
const DashboardPage: React.FC = () => {
  return (
    <>
      <ProjectsList />
      <DashBoardUsers />
    </>
  );
};

export default DashboardPage;
