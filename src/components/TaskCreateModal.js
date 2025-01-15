import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
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

const ModalContent = styled.div`
  background-color: ${props => props.category ? getCategoryColor(props.category) : '#FFD700'};
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  position: relative;
  transition: background-color 0.3s ease;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  transition: background-color 0.3s ease;

  &:focus {
    background-color: white;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  background-color: rgba(255, 255, 255, 0.9);
  transition: background-color 0.3s ease;

  &:focus {
    background-color: white;
    outline: none;
  }
`;

const DateTimeContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`;

const TimeSelect = styled.select`
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 100px;
  background-color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:focus {
    background-color: white;
    outline: none;
  }
`;

const TimeSelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const TimeSpan = styled.span`
  color: #333;
`;

const ToggleContainer = styled.div`
  display: flex;
  gap: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 5px;
`;

const ToggleLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  background-color: ${props => props.primary ? '#4CAF50' : 'rgba(255, 255, 255, 0.9)'};
  color: ${props => props.primary ? 'white' : 'black'};
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CategorySelect = styled.select`
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
`;

const TaskCreateModal = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');
  const [isPublic, setIsPublic] = useState(true);
  const [isUrgent, setIsUrgent] = useState(false);
  const [category, setCategory] = useState('운동');

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return [`${hour}:00`, `${hour}:30`];
  }).flat();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      content,
      date,
      time: `${startTime} ~ ${endTime}`,
      isPublic,
      urgent: isUrgent,
      category,
    });
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()} category={category}>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextArea
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <DateTimeContainer>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <TimeSelectContainer>
              <TimeSelect
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </TimeSelect>
              <TimeSpan>~</TimeSpan>
              <TimeSelect
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                }}
                required
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </TimeSelect>
            </TimeSelectContainer>
          </DateTimeContainer>
          <CategorySelect
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              backgroundColor: getCategoryColor(category),
              color: category === '운동' ? 'black' : 'white',
              fontWeight: 'bold'
            }}
          >
            <option value="운동">운동</option>
            <option value="공부">공부</option>
            <option value="업무">업무</option>
            <option value="취미">취미</option>
            <option value="약속">약속</option>
          </CategorySelect>
          <ToggleContainer>
            <ToggleLabel>
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              공개
            </ToggleLabel>
            <ToggleLabel>
              <input
                type="checkbox"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
              />
              긴급
            </ToggleLabel>
          </ToggleContainer>
          <ButtonContainer>
            <Button type="button" onClick={onClose}>취소</Button>
            <Button type="submit" primary>등록</Button>
          </ButtonContainer>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TaskCreateModal;
