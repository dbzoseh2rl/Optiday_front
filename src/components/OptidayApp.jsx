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


function OptidayApp(){
  const location = useLocation();

  const isLoginPage = location.pathname === "/login"; //로그인 페이지일때 bar렌더링안함.
  
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
        </Routes>
        </div>
    </div>
  )
}
export default OptidayApp