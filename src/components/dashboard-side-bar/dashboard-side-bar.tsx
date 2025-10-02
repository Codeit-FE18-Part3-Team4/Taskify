import { MouseEventHandler } from 'react'
import UserProfile from './user-profile'
import Header from './header'
import Main from './main'
import styles from './dashboard-side-bar.module.css'

interface DashboardSideBarProps {
  dashboardAdd: MouseEventHandler<HTMLButtonElement>;
}

export default function DashboardSideBar({ dashboardAdd } : DashboardSideBarProps) {
  return (
    <div className={styles.sideBar}>
      <Header />
      <Main dashboardAdd={dashboardAdd}/>
      <UserProfile name={'박민영'} profileImageUrl='' />
    </div>
  )
}
