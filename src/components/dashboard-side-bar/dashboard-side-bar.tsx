import { MouseEventHandler } from 'react'
import UserProfile from './components/user-profile'
import Header from './components/header'
import Main from './components/main'
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
