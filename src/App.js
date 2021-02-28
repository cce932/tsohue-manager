import React, { useEffect, useState } from "react"
import { Router, Link, NavLink, Switch, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import "shared/style/app.scss"

import { history } from "helpers/history"
import { clearMessage } from "actions/message"
// import Home from "pages/Home"
import Login from "pages/Login"
import ResetPwd from "pages/ResetPwd"
import MemberManager from "pages/MemberManager"
import EmployeeManager from "pages/EmployeeManager"
import Profile from "pages/Profile"
import IngredientsStock from "pages/IngredientsStock"
import IngredientDetail from "pages/IngredientDetail"
import { logout } from "actions/auth"
import {
  allPaths,
  allMember,
  allEmployee,
  orderManager,
  allRequest,
  wapperStop,
  ingredientsStock,
  ingredientDetail,
  ingredientPurchase,
  recipeManager,
  profile,
  pwdReset,
  login,
} from "shared/constants/pathname"
import { getMeunName } from "shared/utility/common"

const App = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth)
  const [hidden, setHidden] = useState(false)
  const [locating, setLocating] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage())
    })
  }, [dispatch]) // 只有dispatch變更的時候 才會再重呼叫一次此useEffect

  const toggleSideBar = () => {
    const nowAt = window.location.pathname
    // 使用setstate()時 state似乎不會馬上被改變 所以setLocating時 仍然要寫"!"hidden
    setHidden(!hidden)
    setLocating(!hidden ? getMeunName(allPaths, nowAt) : null)
  }

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <Router history={history}>
      <div className="wrapper">
        <div
          className={hidden ? "switcher mCustomScrollbar" : "mCustomScrollbar"}
          data-mcs-theme="minimal"
        >
          <nav id={`sidebar`}>
            <Link to={"/"} className="sidebar-header">
              <img src="/pic/logo.svg" alt="logo"></img>
              <div>
                Tsohue
                <br />
                Backstage
              </div>
            </Link>

            <ul className={`list-unstyled components`}>
              <li>
                <a
                  href="#user-submenu"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  className={`dropdown-toggle manager-title`}
                >
                  使用者管理
                </a>
                <ul className={`collapse`} id="user-submenu">
                  <li>
                    <NavLink
                      to={`${allPaths[allMember]}`}
                      activeClassName="selected"
                    >
                      {allMember}
                    </NavLink>
                    {/* 會員清單(基本資料 購買記錄) 會員查詢 會員新增(基本資料 角色權限) 會員刪除 會員編輯 */}
                  </li>
                  <li>
                    <NavLink
                      to={`${allPaths[allEmployee]}`}
                      activeClassName="selected"
                    >
                      {allEmployee}
                    </NavLink>
                    {/* 員工清單(基本資料) 員工查詢 員工新增(基本資料 角色權限) 員工刪除 員工編輯 */}
                  </li>
                </ul>
              </li>

              <li>
                <NavLink
                  to={`${allPaths[orderManager]}`}
                  className={` manager-title`}
                  activeClassName="selected"
                >
                  {orderManager}
                </NavLink>
                {/* 訂單總覽 編輯/刪除訂單 更新狀態 */}
              </li>

              <li>
                <a
                  href="#kitchen-submenu"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  className={`dropdown-toggle manager-title`}
                >
                  央廚管理
                </a>
                <ul className="collapse list-unstyled" id="kitchen-submenu">
                  <li>
                    <NavLink
                      to={`${allPaths[allRequest]}`}
                      activeClassName="selected"
                    >
                      {allRequest}
                    </NavLink>
                    {/* (確認過庫存的)訂單清單/可批次列印 訂單詳細/可單筆列印(食譜 食材) */}
                  </li>
                  <li>
                    <NavLink
                      to={`${allPaths[wapperStop]}`}
                      activeClassName="selected"
                    >
                      {wapperStop}
                    </NavLink>
                    {/* 蔬果站 肉站 其他站 */}
                  </li>
                </ul>
              </li>

              <li>
                <a
                  href="#ingredients-submenu"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  className={`dropdown-toggle manager-title`}
                >
                  食材管理
                </a>
                <ul className="collapse list-unstyled" id="ingredients-submenu">
                  <li>
                    <NavLink
                      to={`${allPaths[ingredientsStock]}`}
                      activeClassName="selected"
                    >
                      {ingredientsStock}
                    </NavLink>
                    {/* 食材清單 食材查詢 食材詳細(食材進銷貨紀錄) 新增食材 刪除食材 */}
                  </li>
                  <li>
                    <NavLink
                      to={`${allPaths[ingredientPurchase]}`}
                      activeClassName="selected"
                    >
                      {ingredientPurchase}
                    </NavLink>
                    {/* 進貨記錄 進貨紀錄查詢 進貨新增 刪除 */}
                  </li>
                </ul>
              </li>

              <li>
                <NavLink
                  to={`${allPaths[recipeManager]}`}
                  className={`manager-title`}
                  activeClassName="selected"
                >
                  {recipeManager}
                </NavLink>
                {/* 食譜總覽 新增/編輯/刪除食譜 (名稱 影片網址 分類 照片 食材 編輯影片標籤)  */}
              </li>
            </ul>

            {currentUser ? (
              <div className={`identity`}>
                <Link className="profile-bar" to="/profile">
                  你好, {currentUser.username}
                </Link>
                <NavLink to={"/home"} onClick={onLogout}>
                  登出
                </NavLink>
              </div>
            ) : (
              <div className={`identity`}>
                <NavLink to={`${allPaths[login]}`} activeClassName="selected">
                  {login}
                </NavLink>
              </div>
            )}
          </nav>
        </div>

        {/* 展開sidebar的按鈕 */}
        <div id="content">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
              <button
                type="button"
                id="sidebarCollapse"
                onClick={toggleSideBar} // 如果是直接寫togglesideBar() 那就會在render時直接call 就會出現Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
              >
                <i className="fas fa-bars"></i>
                {locating && <div>{locating}</div>}
              </button>
            </div>
          </nav>
        </div>
      </div>
      <div className={hidden ? "page switcher" : "page"}>
        <Switch>
          {/* <Route exact path={["/", "/home"]} component={Home} /> */}
          <Route exact path={`${allPaths[login]}`} component={Login} />
          <Route exact path={`${allPaths[profile]}`} component={Profile} />
          <Route exact path={`${allPaths[pwdReset]}`} component={ResetPwd} />
          <Route
            exact
            path={`${allPaths[allMember]}`}
            component={MemberManager}
          />
          <Route
            exact
            path={`${allPaths[allEmployee]}`}
            component={EmployeeManager}
          />
          <Route
            exact
            path={`${allPaths[ingredientsStock]}`}
            component={IngredientsStock}
          />
          <Route
            exact
            path={`${allPaths[ingredientDetail]}/:id`}
            component={IngredientDetail}
          />
        </Switch>
      </div>
    </Router>
  )
}

export default App
