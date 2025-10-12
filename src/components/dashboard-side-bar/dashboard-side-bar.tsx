import styles from './dashboard-side-bar.module.css'
import Header from './header'
import Main from './main'
import UserProfile from './user-profile'

type DashboardSideBarProps = {
  dashboards: any[];
}

export default function DashboardSideBar({dashboards}: DashboardSideBarProps) {
  return (
    <div className={styles.sideBar}>
      <Header />
      <Main dashboards={dashboards}/>
      <UserProfile name={'박민영'} profileImageUrl='' />
    </div>
  )
}
