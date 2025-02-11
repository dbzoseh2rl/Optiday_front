import { useEffect, useState } from "react";
import Todoslist from "./Todoslist"
import Calendar from "./Calendar"


function Main(){
    // 카테고리 선택 상태 추가
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    // 사용자 프로필 상태
    const [user] = useState({
        name: '사용자',
        profileImage: 'https://via.placeholder.com/50', // 기본 프로필 이미지
    });

    return (
        <div className="main contents">
            {/* 카테고리 선택 드롭다운: 테두리 바깥에 위치 */}
            <div className=""> 
              <div className="p-3">         
                  <select
                      value={selectedCategory} // 현재 선택된 카테고리 값
                      onChange={(e) => setSelectedCategory(e.target.value)} // 카테고리 변경 시 상태 업데이트
                      className="p-2 border rounded"
                  >
                      <option value="All">모든 카테고리</option>
                      <option value="업무">업무</option>
                      <option value="개인">개인</option>
                      <option value="긴급">긴급</option> {/* '긴급' 카테고리 추가 */}
                  </select>
              </div>
            

              {/* 할 일 목록 컴포넌트 렌더링 */}
              <div className="p-3">
                  <Todoslist selectedCategory={selectedCategory} />
              </div>
            </div>
            {/* 캘린더 컴포넌트 */}
            <div className="w-100 p-3">
                <Calendar />
                <div className="feedback p-3 rounded bg-gray-200 mt-4">피드백</div>
            </div>
        </div>
    );
}
export default Main