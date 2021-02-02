import React, { useEffect } from "react";
import { Router, Link, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { history } from "helpers/history";
import { clearMessage } from "actions/message";
import "shared/style/app.scss";

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  return (
    <Router history={history}>
      <header></header>
      <div className="wrapper">
        <nav id="sidebar">
          <div className="sidebar-header">
            <h3>Tsohue Manager</h3>
          </div>

          <ul className="list-unstyled components">
            <p>Dummy Heading</p>

            <li className="active">
              <a
                herf="#"
                data-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle"
              >
                使用者管理
              </a>
              <ul className="collapse list-unstyled" id="userSubmenu">
                <li>
                  <Link to={"/member-manager"}>會員管理</Link>
                  {/* 會員清單(基本資料 購買記錄) 會員查詢 會員新增(基本資料 角色權限) 會員刪除 會員編輯 */}
                </li>
                <li>
                  <Link to={"/employee-manager"}>員工管理</Link>
                  {/* 員工清單(基本資料) 員工查詢 員工新增(基本資料 角色權限) 員工刪除 員工編輯 */}
                </li>
              </ul>
            </li>

            <li>
              <a
                herf="#"
                data-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle"
              >
                食材管理
              </a>
              <ul className="collapse list-unstyled" id="ingredients-submenu">
                <li>
                  <Link to={"/ingredients-stock"}>食材庫存</Link>
                  {/* 食材清單 食材查詢 食材詳細(食材進銷貨紀錄) 新增食材 刪除食材 */}
                </li>
                <li>
                  <Link to={"/ingredients-purchase"}>進貨管理</Link>
                  {/* 進貨記錄 進貨紀錄查詢 進貨新增 刪除 */}
                </li>
              </ul>
            </li>

            <li>
              <a href="#">央廚管理</a>
            </li>
          </ul>
        </nav>

        {/* 展開sidebar的按鈕 */}
        <div id="content">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <button
                type="button"
                id="sidebarCollapse"
                className="btn btn-info"
              >
                <i className="fas fa-align-left"></i>
                <span>Toggle Sidebar</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </Router>
  );
};

export default App;
