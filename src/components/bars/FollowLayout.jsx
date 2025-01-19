import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../styles/FollowLayout.css"; // FollowLayout.jsx에서

function FollowLayout() {
  return (
    <div className="follow-layout">
      <nav className="follow-tabs">
        <NavLink
          to="/follow/followers"
          className={({ isActive }) => (isActive ? "active-tab" : "tab")}
        >
          팔로워
        </NavLink>
        <NavLink
          to="/follow/following"
          className={({ isActive }) => (isActive ? "active-tab" : "tab")}
        >
          팔로잉
        </NavLink>
        <NavLink
          to="/follow/search-accounts"
          className={({ isActive }) => (isActive ? "active-tab" : "tab")}
        >
          계정 찾기
        </NavLink>
      </nav>
      <div className="follow-content">
        <Outlet />
      </div>
    </div>
  );
}

export default FollowLayout;
