import { ReactElement } from "react";
import styles from "./index.module.css";
import NavigationBar from "@/components/navigationBar/navigation-bar";
import DashboardSideBar from "@/components/dashboard-side-bar/dashboard-side-bar";
import Column from "@/components/dashboard/column/column";
import { MemberInfo } from "@/type/member-info";

export default function DashboardPage() {
  return <div className="DashboardContainer"></div>;
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <NavigationBar />
      <div style={{ display: "flex" }}>
        <DashboardSideBar />
        <main style={{ flex: 1, padding: "20px" }}>{page}</main>
      </div>
    </>
  );
};
