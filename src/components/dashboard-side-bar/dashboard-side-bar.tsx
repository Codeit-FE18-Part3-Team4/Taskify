import { MouseEventHandler } from 'react'
import UserProfile from './user-profile'
import Header from './header'
import Main from './main'
import styles from './dashboard-side-bar.module.css'



export default function DashboardSideBar() {
  return (
    <div className={styles.sideBar}>
      <Header />
      <Main/>
      <UserProfile name={'박민영'} profileImageUrl='' />
    </div>
  )
}
