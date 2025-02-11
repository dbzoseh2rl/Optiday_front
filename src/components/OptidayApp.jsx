import { Route, Routes, useLocation } from "react-router-dom"
import Sidebar from "./bars/Sidebar"
import '../styles/OptidayApp.css'
import Headerbar from "./bars/Headerbar"
import Feedback from "./Feedback"
import Main from "./Main"
import Todo from "./todo/Todo"
import Login from "../page/Login"

import Mypage from "./Mypage"
import MainPage from "../page/MainPage"
import FollowLayout from "./bars/FollowLayout"
import FollowersPage from "../page/FollowersPage"
import FollowingPage from "../page/FollowingPage"
import SearchAccountsPage from "../page/SearchAccountsPage"
import Signup from "../page/Signup"
import MonthCalendar from "../page/MonthCalendar"

function OptidayApp(){
  const location = useLocation();

  const isLoginPage = location.pathname === "/login" || location.pathname === "/signup";
  
  return(
    <div className="OptidayApp">
      {!isLoginPage&&<Headerbar/>}
      <div className="center">
      {!isLoginPage&&<Sidebar/>}
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/todo' element={<Todo/>}/>
          <Route path='/mypage' element={<Mypage/>}/>
          <Route path='/feedback' element={<Feedback/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/mainpage' element={<MainPage/>}/>
          <Route path="/follow" element={<FollowLayout />}>
            <Route path="followers" element={<FollowersPage />} />
            <Route path="following" element={<FollowingPage />} />
            <Route path="search-accounts" element={<SearchAccountsPage />} />
          </Route>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/feedback' element={<Feedback/>}/>
          <Route path='/month' element={<MonthCalendar/>}/>
        </Routes>
        </div>
    </div>
  )
}

export default OptidayApp;