import React, { useState, useEffect } from 'react';
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

const TaskDetailContainer = styled.div`
  background-color: ${props => {
    switch (props.category) {
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
        return '#fff';
    }
  }};
  border-radius: 8px;
  padding: 20px;
  width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  transition: background-color 0.3s ease;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
  padding: 5px;
  z-index: 1;

  &:hover {
    color: #000;
  }
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TaskTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

const CategoryBadge = styled.span`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  background-color: ${props => {
    switch (props.category) {
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
  }};
`;

const CategorySelect = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => {
    switch (props.value) {
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
  }};
  color: #000;
  font-weight: bold;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.delete ? '#ff4d4d' : '#f0f0f0'};
  color: ${props => props.delete ? 'white' : 'black'};
`;

const TaskInfo = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: center;
`;

const TimeInfo = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const VisibilityBadge = styled.span`
  background-color: #e0e0e0;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const TaskContent = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  white-space: pre-line;
`;

const CommentSection = styled.div`
  margin-top: 20px;
`;

const CommentInput = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const CommentButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CommentItem = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 4px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const CommentContent = styled.div`
  flex: 1;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 10px;
`;

const EditInput = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const EditTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  white-space: pre-line;
`;

const EditTimeContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const TimeSelect = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
`;

const VisibilityToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;

  label {
    cursor: pointer;
  }

  input[type="checkbox"] {
    cursor: pointer;
  }
`;

const TaskDetail = ({ task, onUpdate, onClose }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(task?.comments || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task?.title);
  const [editedContent, setEditedContent] = useState(task?.content);
  const [editedTime, setEditedTime] = useState(task?.time || 'PM 10:00 - PM 11:00');
  const [editedDate, setEditedDate] = useState(task?.date || new Date().toISOString().split('T')[0]);
  const [editedIsPublic, setEditedIsPublic] = useState(task?.isPublic);
  const [editedIsUrgent, setEditedIsUrgent] = useState(task?.urgent || false);
  const [editedCategory, setEditedCategory] = useState(task?.category || '운동');

  useEffect(() => {
    setComments(task?.comments || []);
    setEditedTitle(task?.title);
    setEditedContent(task?.content);
    setEditedTime(task?.time || 'PM 10:00 - PM 11:00');
    setEditedDate(task?.date || new Date().toISOString().split('T')[0]);
    setEditedIsPublic(task?.isPublic);
    setEditedIsUrgent(task?.urgent || false);
    setEditedCategory(task?.category);
  }, [task]);

  const timeOptions = [
    'AM 12:00 - AM 1:00', 'AM 1:00 - AM 2:00', 'AM 2:00 - AM 3:00',
    'AM 3:00 - AM 4:00', 'AM 4:00 - AM 5:00', 'AM 5:00 - AM 6:00',
    'AM 6:00 - AM 7:00', 'AM 7:00 - AM 8:00', 'AM 8:00 - AM 9:00',
    'AM 9:00 - AM 10:00', 'AM 10:00 - AM 11:00', 'AM 11:00 - PM 12:00',
    'PM 12:00 - PM 1:00', 'PM 1:00 - PM 2:00', 'PM 2:00 - PM 3:00',
    'PM 3:00 - PM 4:00', 'PM 4:00 - PM 5:00', 'PM 5:00 - PM 6:00',
    'PM 6:00 - PM 7:00', 'PM 7:00 - PM 8:00', 'PM 8:00 - PM 9:00',
    'PM 9:00 - PM 10:00', 'PM 10:00 - PM 11:00', 'PM 11:00 - AM 12:00'
  ];

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;

    const newCommentObj = {
      author: 'hyun5940',
      profileImage: 'https://via.placeholder.com/40',
      content: newComment,
      isAuthor: true
    };

    const updatedComments = [newCommentObj, ...comments];
    setComments(updatedComments);
    onUpdate({
      ...task,
      comments: updatedComments
    });
    setNewComment('');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedTask = {
      ...task,
      title: editedTitle,
      content: editedContent,
      time: editedTime,
      date: editedDate,
      isPublic: editedIsPublic,
      urgent: editedIsUrgent,
      category: editedCategory
    };
    onUpdate(updatedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(task?.title);
    setEditedContent(task?.content);
    setEditedTime(task?.time);
    setEditedDate(task?.date);
    setEditedIsPublic(task?.isPublic);
    setEditedIsUrgent(task?.urgent || false);
    setEditedCategory(task?.category);
    setIsEditing(false);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <TaskDetailContainer 
        onClick={e => e.stopPropagation()}
        category={task?.category}
      >
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <TaskHeader>
          {isEditing ? (
            <>
              <EditInput
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                placeholder="제목을 입력하세요"
              />
              <CategorySelect
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
              >
                <option value="운동">운동</option>
                <option value="공부">공부</option>
                <option value="업무">업무</option>
                <option value="취미">취미</option>
                <option value="약속">약속</option>
              </CategorySelect>
            </>
          ) : (
            <>
              <TaskTitle>{task?.title}</TaskTitle>
              <CategoryBadge category={task?.category}>{task?.category}</CategoryBadge>
            </>
          )}
        </TaskHeader>
        
        <TaskActions>
          {isEditing ? (
            <>
              <ActionButton onClick={handleSave}>저장</ActionButton>
              <ActionButton onClick={handleCancel}>취소</ActionButton>
            </>
          ) : (
            <>
              <ActionButton onClick={handleEdit}>수정</ActionButton>
              <ActionButton delete>삭제</ActionButton>
            </>
          )}
        </TaskActions>

        <TaskInfo>
          {isEditing ? (
            <>
              <EditTimeContainer>
                <input
                  type="date"
                  value={editedDate}
                  onChange={(e) => setEditedDate(e.target.value)}
                  style={{ marginRight: '10px' }}
                />
                <TimeSelect
                  value={editedTime}
                  onChange={(e) => setEditedTime(e.target.value)}
                >
                  {timeOptions.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </TimeSelect>
              </EditTimeContainer>
              <VisibilityToggle>
                <input
                  type="checkbox"
                  id="visibility"
                  checked={editedIsPublic}
                  onChange={(e) => setEditedIsPublic(e.target.checked)}
                />
                <label htmlFor="visibility">공개</label>
                <input
                  type="checkbox"
                  id="urgent"
                  checked={editedIsUrgent}
                  onChange={(e) => setEditedIsUrgent(e.target.checked)}
                  style={{ marginLeft: '10px' }}
                />
                <label htmlFor="urgent">긴급</label>
              </VisibilityToggle>
            </>
          ) : (
            <>
              <TimeInfo>{task?.date} {task?.time}</TimeInfo>
              <VisibilityBadge>{task?.isPublic ? '공개' : '비공개'}</VisibilityBadge>
            </>
          )}
        </TaskInfo>

        <TaskContent>
          {isEditing ? (
            <EditTextarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              placeholder="내용을 입력하세요"
            />
          ) : (
            task?.content
          )}
        </TaskContent>

        <CommentSection>
          <CommentInput>
            <ProfileImage src="https://via.placeholder.com/40" alt="my profile" />
            <Input 
              placeholder="댓글을 입력하세요..." 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleCommentSubmit();
                }
              }}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
            />
            <CommentButton onClick={handleCommentSubmit}>등록</CommentButton>
          </CommentInput>

          <CommentList>
            {comments.map((comment, index) => (
              <CommentItem key={index}>
                <ProfileImage src={comment.profileImage} alt="profile" />
                <CommentContent>
                  <CommentHeader>
                    <span>{comment.author}</span>
                    {comment.isAuthor && (
                      <CommentActions>
                        <ActionButton>수정</ActionButton>
                        <ActionButton delete>삭제</ActionButton>
                      </CommentActions>
                    )}
                  </CommentHeader>
                  <p>{comment.content}</p>
                </CommentContent>
              </CommentItem>
            ))}
          </CommentList>
        </CommentSection>
      </TaskDetailContainer>
    </ModalOverlay>
  );
};

export default TaskDetail;
