import { ReactElement } from "react";
import styles from "./index.module.css";
import NavigationBar from "@/components/navigationBar/navigation-bar";
import DashboardSideBar from "@/components/dashboard-side-bar/dashboard-side-bar";
import Column from "@/components/dashboard/column/column";
export default function DashboardPage() {
  return (
    <div className="DashboardContainer">
      <Column />
    </div>
  );
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <NavigationBar />
      <div className={styles.layoutContainer}>
        <DashboardSideBar />
        <main className={styles.main}>{page}</main>
      </div>
    </>
  );
};
