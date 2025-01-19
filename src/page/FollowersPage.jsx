import React, { useState } from "react";
import "../styles/FollowersPage.css";

const FollowersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [followers, setFollowers] = useState([
    { id: 1, name: "홍길동", tag: "#8888", status: "언팔로우", avatar: "avatar1.png" },
    { id: 2, name: "김길동", tag: "#7756", status: "언팔로우", avatar: "avatar2.png" },
    { id: 3, name: "김영희", tag: "#1010", status: "언팔로우", avatar: "avatar3.png" },
  ]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleButtonClick = (id) => {
    // 언팔로우 버튼 클릭 시 항목 삭제
    setFollowers((prevFollowers) => prevFollowers.filter((f) => f.id !== id));
  };

  const filteredFollowers = followers.filter(
    (follower) =>
      follower.name.includes(searchTerm) || follower.tag.includes(searchTerm)
  );

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>팔로워 13(나를 팔로우한 사람) 팔로잉 10(내가 한 사람) 계정 찾기</h1>
        <input
          type="text"
          placeholder="팔로우 계정 검색"
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </header>
      <section className="follow-list">
        <h2>모든 팔로워</h2>
        <ul>
          {filteredFollowers.map((follower) => (
            <li key={follower.id} className="follow-item">
              <div className="profile">
                <img
                  src={follower.avatar}
                  alt={`${follower.name} 프로필`}
                  className="profile-image"
                />
                <span className="profile-info">
                  {follower.name} {follower.tag}
                </span>
              </div>
              <button
                className="action-button"
                onClick={() => handleButtonClick(follower.id)}
              >
                {follower.status}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default FollowersPage;