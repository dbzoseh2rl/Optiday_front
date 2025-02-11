import { useState } from 'react';

function Todoslist({ selectedCategory }) {
  // 할 일 목록 데이터 (완료 여부 상태 추가)
  const [todos, setTodos] = useState([
    { title: '운동', startdate: '10:00', enddate: '11:30', category: '업무', completed: false },
    { title: '저녁 약속', startdate: '18:00', enddate: '20:00', category: '개인', completed: false },
    { title: '회의', startdate: '13:00', enddate: '14:00', category: '업무', completed: false },
    { title: '운동', startdate: '10:00', enddate: '11:30', category: '개인', completed: false },
    { title: '긴급 회의', startdate: '15:00', enddate: '16:00', category: '긴급', completed: false }, // 긴급 추가
  ]);

  // 카테고리별 색상 지정
  const categoryColors = {
    개인: '#d1e7dd', // 연한 초록색
    업무: '#f8d7da', // 연한 빨간색
    긴급: '#f44336', // 더 진한 빨간색
  };

  // 할 일을 완료 처리하는 함수
  const toggleComplete = (index) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 카테고리 필터링
  const filteredTodos = selectedCategory === 'All'
    ? todos
    : todos.filter(todo => todo.category === selectedCategory);

  return (
    <div className="Todoslist rounded">
      {/* 선택된 카테고리의 할 일 목록을 렌더링 */}
      {filteredTodos.map((todo, index) => {
        // 시작 시간 포맷 변환 (24시간 -> 12시간)
        const startTime = todo.startdate.split(':');
        const startHour = parseInt(startTime[0]);
        const startMinute = startTime[1];
        const startAmPm = startHour < 12 ? 'AM' : 'PM';
        const startHour12 = startHour % 12 === 0 ? 12 : startHour % 12;

        // 종료 시간 포맯 변환 (24시간 -> 12시간)
        const endTime = todo.enddate.split(':');
        const endHour = parseInt(endTime[0]);
        const endMinute = endTime[1];
        const endAmPm = endHour < 12 ? 'AM' : 'PM';
        const endHour12 = endHour % 12 === 0 ? 12 : endHour % 12;

        return (
          <div
            className="todoitem"
            key={index}
            style={{
              backgroundColor: categoryColors[todo.category] || '#ffffff',
              padding: '10px',
              margin: '5px 0',
              borderRadius: '5px',
            }}
          >
            {/* 체크박스와 제목을 flex로 정렬하여 체크박스가 제목 왼쪽에 위치하도록 */}
            <div className="flex items-center">
              {/* 체크박스 위치 조정 */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(index)}
                className="mr-2"
              />
              {/* 제목이 오른쪽으로 배치되도록 수정 */}
              <div className={todo.completed ? 'line-through' : ''}>{todo.title}</div>
            </div>
            {/* 시작 시간과 종료 시간 */}
            <div>
              {startAmPm} {startHour12}:{startMinute} ~ {endAmPm} {endHour12}:{endMinute}
            </div>
            {/* 카테고리 */}
            <div>{todo.category}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Todoslist;
