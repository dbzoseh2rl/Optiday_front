import React, { useState } from 'react';
import styled from 'styled-components';
import TaskDetail from '../components/TaskDetail';
import TaskCreateModal from '../components/TaskCreateModal';

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  margin-left: 70px;
  
`;

const TaskList = styled.div`
  width: 250px;
  background-color: #f0f0f0;
  padding: 20px;
  overflow-y: auto;
  max-height: 100vh;
  border-right: 1px solid #ddd;
  position: relative;
`;

const AddButton = styled.button`
  position: absolute;
  left: 50%;
  bottom: 40px;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #4CAF50;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: all 0.3s ease;

  &:hover {
    background-color: #45a049;
    transform: translateX(-50%) scale(1.1);
  }

  &:active {
    transform: translateX(-50%) scale(0.95);
  }
`;

const getCategoryColor = (category) => {
  switch (category) {
    case '운동':
      return '#FFD700';
    case '공부':
      return '#98FB98';
    case '업무':
      return '#87CEEB';
    case '취미':
      return '#DDA0DD';
    case '약속':
      return '#FFA07A';
    default:
      return '#e0e0e0';
  }
};

const TaskItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${props => props.selected ? getCategoryColor(props.category) : 'white'};
  border-left: 4px solid ${props => getCategoryColor(props.category)};
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => {
      const color = getCategoryColor(props.category);
      return props.selected ? color : `${color}40`;
    }};
  }
  
  ${props => props.selected && `
    color: ${props.category === '운동' ? 'black' : 'white'};
  `}
`;

const TaskTitle = styled.div`
  font-size: 1rem;
  margin-bottom: 5px;
  color: ${props => props.urgent ? '#FF0000' : 'inherit'};
  font-weight: ${props => props.urgent ? 'bold' : 'normal'};
`;

const TaskTime = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const DetailContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #fff;
  overflow-y: auto;
`;

const MainPage = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: '운동 루틴',
      category: '운동',
      date: '2025-01-14',
      time: 'PM 10:00 - PM 11:00',
      isPublic: true,
      urgent: false,
      content: '1. 케이블 앞풀다운\n2. 렛풀다운\n3. 원암 덤벨 로우\n4. 시티드 케이블로우',
      comments: [
        {
          author: 'hyun5940',
          profileImage: 'https://via.placeholder.com/40',
          content: '오늘 운동 수고하셨습니다',
          isAuthor: true
        }
      ]
    },
    {
      id: 2,
      title: '알고리즘 공부',
      category: '공부',
      date: '2025-01-14',
      time: 'AM 6:00 - AM 7:00',
      isPublic: true,
      urgent: true,
      content: '1. 그리디 알고리즘 개념 정리\n2. 백준 문제 풀이\n3. 코드 리뷰',
      comments: []
    },
    {
      id: 3,
      title: '프로젝트 회의',
      category: '공부',
      date: '2025-01-15',
      time: 'PM 2:00 - PM 3:00',
      isPublic: false,
      urgent: false,
      content: '1. 프로젝트 진행상황 공유\n2. 이슈 논의\n3. 다음 주 계획 수립',
      comments: []
    },
    {
      id: 4,
      title: '기타 연습',
      category: '취미',
      date: '2025-01-14',
      time: 'PM 7:00 - PM 8:00',
      isPublic: true,
      urgent: false,
      content: '1. 기본 코드 연습\n2. 새로운 곡 배우기\n3. 녹음하기',
      comments: []
    },
    {
      id: 5,
      title: '친구 만나기',
      category: '약속',
      date: '2025-01-14',
      time: 'PM 6:00 - PM 7:00',
      isPublic: true,
      urgent: false,
      content: '1. 강남역에서 만나기\n2. 저녁 식사\n3. 카페에서 담소',
      comments: []
    }
  ]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleTaskUpdate = (updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setSelectedTask(updatedTask);
  };

  const handleCreateTask = (newTask) => {
    const task = {
      id: tasks.length + 1,
      ...newTask,
      comments: []
    };
    
    // Add the new task and sort
    const updatedTasks = [...tasks, task].sort((a, b) => {
      // First sort by urgency
      if (a.urgent && !b.urgent) return -1;
      if (!a.urgent && b.urgent) return 1;
      return 0;
    });
    
    setTasks(updatedTasks);
    setSelectedTask(task);  // Select the newly created task
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Filter tasks for today and sort by urgency
  const todayTasks = tasks
    .filter(task => task.date === today)
    .sort((a, b) => {
      if (a.urgent && !b.urgent) return -1;
      if (!a.urgent && b.urgent) return 1;
      return 0;
    });

  return (
    <PageContainer>
      <TaskList>
        {todayTasks.map(task => (
          <TaskItem
            key={task.id}
            selected={selectedTask?.id === task.id}
            category={task.category}
            urgent={task.urgent}
            onClick={() => setSelectedTask(task)}
          >
            <TaskTitle className="task-title" urgent={task.urgent}>{task.title}</TaskTitle>
            <TaskTime>{task.time}</TaskTime>
          </TaskItem>
        ))}
        <AddButton onClick={() => setShowCreateModal(true)}>+</AddButton>
      </TaskList>
      {selectedTask && (
        <TaskDetail
          task={selectedTask}
          onUpdate={handleTaskUpdate}
          onClose={() => setSelectedTask(null)}
        />
      )}
      {showCreateModal && (
        <TaskCreateModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateTask}
        />
      )}
    </PageContainer>
  );
};

export default MainPage;
