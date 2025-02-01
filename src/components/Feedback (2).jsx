// React 컴포넌트와 필요 모듈 임포트
import React, { useState, useEffect } from "react";
import "react-day-picker/dist/style.css";
import "../styles/FeedbackPage.css"

// 카테고리 목록 정의
const categories = ["Work", "Personal", "Fitness", "Learning", "Meeting"];

// 할 일 목록 생성 함수
// 120일 간의 랜덤 데이터를 생성
const generateTodos = () => {
  const todos = [];
  const endDate = new Date(); // 오늘 날짜
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 119); // 오늘부터 120일 전 시작

  const totalDays = 120;

  for (let i = 0; i < totalDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i); // 날짜를 하나씩 증가

    const todoCount = Math.floor(Math.random() * 5) + 1; // 하루에 1~5개의 Todo 생성
    for (let j = 0; j < todoCount; j++) {
      todos.push({
        id: `${currentDate.toISOString().slice(0, 10)}-${j}`, // 고유 ID
        date: currentDate.toISOString().slice(0, 10), // 날짜 포맷
        title: `Todo ${currentDate.toISOString().slice(0, 10)}-${j}`, // 제목
        category: categories[Math.floor(Math.random() * categories.length)], // 카테고리 랜덤 할당
        completed: Math.random() > 0.5, // 완료 여부 50% 확률로 결정
      });
    }
  }

  return todos;
};

// Feedback 컴포넌트
function Feedback() {
  // 상태 변수 정의
  const [todos] = useState(generateTodos()); // 생성된 할 일 목록 저장
  const [achievements, setAchievements] = useState([]); // 달성도 저장
  const [selectedRange, setSelectedRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 9)) // 10일 전 시작
      .toISOString()
      .slice(0, 10),
    to: new Date().toISOString().slice(0, 10), // 오늘 날짜
  });

  const [contributionData, setContributionData] = useState([]); // 기여도 데이터 저장

  // 선택된 날짜 범위에 따라 데이터를 계산
  useEffect(() => {
    const calculateAchievements = () => {
      const { from, to } = selectedRange;
      if (!from || !to) return;

      // 선택된 범위의 할 일 필터링
      const filteredTodos = todos.filter((todo) => {
        const todoDate = new Date(todo.date);
        return todoDate >= new Date(from) && todoDate <= new Date(to);
      });

      // 카테고리별 달성도 계산
      const categoryData = categories.map((category) => {
        const categoryTodos = filteredTodos.filter(
          (todo) => todo.category === category
        );
        const completedTodos = categoryTodos.filter((todo) => todo.completed);
        const percentage =
          categoryTodos.length > 0
            ? (completedTodos.length / categoryTodos.length) * 100
            : 0;

        return {
          category,
          total: categoryTodos.length,
          completed: completedTodos.length,
          percentage: percentage.toFixed(1), // 소수점 한 자리로 표시
        };
      });

      setAchievements(categoryData);
    };

    const generateContributionData = () => {
      const rows = 4; // 세로 4줄
      const columns = 30; // 가로 30칸
      const totalDays = rows * columns;

      const endDate = new Date(); // 오늘 날짜
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 119); // 120일 전 시작

      const data = Array.from({ length: rows }, () =>
        Array.from({ length: columns }, () => 0)
      );

      // 완료된 할 일을 기여도 데이터에 반영
      todos.forEach((todo) => {
        const todoDate = new Date(todo.date);
        const dayIndex = Math.floor(
          (todoDate - startDate) / (1000 * 60 * 60 * 24)
        ); // 시작 날짜로부터 몇 번째 날인지 계산

        if (dayIndex >= 0 && dayIndex < totalDays) {
          const rowIndex = Math.floor(dayIndex / columns);
          const colIndex = dayIndex % columns;

          if (todo.completed) {
            data[rowIndex][colIndex] += 1;
          }
        }
      });

      setContributionData(data);
    };

    calculateAchievements(); // 달성도 계산 실행
    generateContributionData(); // 기여도 데이터 생성 실행
  }, [selectedRange, todos]);

  // 완료된 할 일의 수에 따라 색상 조정
  const getColor = (todoCount) => {
    const opacity = Math.min(todoCount / 5, 1); // 최대 1까지
    return `rgba(0, 128, 0, ${opacity})`; // 초록색 농도
  };

  return (
    <div className="feedback">
      <h1>Feedback</h1>

      {/* 날짜 선택 영역 */}
      <div className="date-picker-container">
        <div className="date-inputs">
          <input
            type="date"
            value={selectedRange.from}
            onChange={(e) =>
              setSelectedRange((prev) => ({ ...prev, from: e.target.value }))
            }
          />
          <span style={{ margin: "0 10px" }}>-</span>
          <input
            type="date"
            value={selectedRange.to}
            onChange={(e) =>
              setSelectedRange((prev) => ({ ...prev, to: e.target.value }))
            }
          />
              📅
        </div>
       
      </div>

      {/* 달성도 영역 */}
      <div className="achievements">
        <h2>Achievements</h2>
        {achievements.map((achievement, index) => (
          <div key={index} className="achievement-item">
            <p>
              {achievement.category} ({achievement.percentage}%)
            </p>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{
                  width: `${achievement.percentage}%`,
                  backgroundColor: "#87CEEB",
                }}
              ></div>
            </div>
            <span>
              {achievement.completed}/{achievement.total}
            </span>
          </div>
        ))}
      </div>

      {/* 기여도 그래프 */}
      <div className="contribution-graph-container">
        <h2>Contribution Graph</h2>
        <div className="contribution-graph">
          {contributionData.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: "flex",
                gap: "5px",
              }}
            >
              {row.map((todoCount, colIndex) => (
                <div
                  key={colIndex}
                  style={{
                    width: "15px",
                    height: "15px",
                    backgroundColor: getColor(todoCount),
                    border: "1px solid #ddd",
                  }}
                  title={`Todos: ${todoCount}`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feedback;
