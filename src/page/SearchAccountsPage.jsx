import React, { useState } from "react";
import "../styles/SearchAccountsPage.css"; // 스타일 파일 경로 확인 후 수정

const SearchAccountsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [accounts] = useState([
    { id: 1, name: "홍길동", tag: "#1234" },
    { id: 2, name: "김길동", tag: "#5678" },
    { id: 3, name: "이순신", tag: "#4321" },
    { id: 4, name: "강감찬", tag: "#8765" },
  ]);
  const [filteredAccounts, setFilteredAccounts] = useState(accounts);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = accounts.filter((account) =>
      account.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAccounts(filtered);
  };

  return (
    <div className="search-accounts-page">
      <h2>계정 찾기</h2>
      <input
        type="text"
        placeholder="계정 이름을 검색하세요"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="search-input"
      />
      <ul className="accounts-list">
        {filteredAccounts.map((account) => (
          <li key={account.id} className="account-item">
            <span className="account-name">{account.name}</span>
            <span className="account-tag">{account.tag}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchAccountsPage;
