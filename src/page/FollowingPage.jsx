import React, { useState } from "react";
import "../styles/FollowingPage.css";

const FollowingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [following, setFollowing] = useState([
    { id: 1, name: "홍길동", tag: "#1120", status: "맞팔중", avatar: "avatar1.png" },
    { id: 2, name: "김길동", tag: "#0548", status: "맞팔중", avatar: "avatar2.png" },
    { id: 3, name: "이순신", tag: "#1874", status: "맞팔하기", avatar: "avatar3.png" },
    { id: 4, name: "문익점", tag: "#2A47", status: "맞팔하기", avatar: "avatar4.png" },
  ]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleButtonClick = (id) => {
    setFollowing((prevFollowing) =>
      prevFollowing.map((f) =>
        f.id === id
          ? { ...f, status: f.status === "맞팔하기" ? "맞팔중" : "맞팔하기" }
          : f
      )
    );
  };

  const filteredFollowing = following.filter(
    (user) => user.name.includes(searchTerm) || user.tag.includes(searchTerm)
  );

  return (
    <div className="page-container">
      <header className="page-header">
        
        <input
          type="text"
          placeholder="팔로우 계정 검색"
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </header>
      <section className="follow-list">
        <h2>모든 팔로잉</h2>
        <ul>
          {filteredFollowing.map((user) => (
            <li key={user.id} className="follow-item">
              <div className="profile">
                <img
                  src={user.avatar}
                  alt={`${user.name} 프로필`}
                  className="profile-image"
                />
                <span className="profile-info">
                  {user.name} {user.tag}
                </span>
              </div>
              <button
                className="action-button"
                onClick={() => handleButtonClick(user.id)}
              >
                {user.status}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default FollowingPage;