// 스타일 시트를 가져옵니다.
import '../styles/Login.css';
// 페이지 이동을 위한 Link 컴포넌트를 가져옵니다.
import { Link } from 'react-router-dom';

// Login 컴포넌트를 정의합니다.
function Login() {
    return (
        // 전체 화면을 덮는 컨테이너로, 중앙 정렬을 위한 flexbox 스타일을 적용합니다.
        <div className="d-flex justify-content-center align-items-center vh-100 background vw-100" style={{ backgroundColor: '#333' }}>
            <div className="login-container text-center text-white" style={{ borderRadius: '20px', padding: '40px', backgroundColor: '#000' }}>
                {/* 페이지 제목 */}
                <h1 className="mb-4">OptiDay</h1>
                {/* 로그인 폼 */}
                <form>
                    <div className="mb-3">
                        {/* 아이디 입력 필드 */}
                        <input type="text" className="form-control form-control-lg" placeholder="ID" style={{ borderRadius: '10px' }}/>
                    </div>
                    <div className="mb-3">
                        {/* 비밀번호 입력 필드 */}
                        <input type="password" className="form-control form-control-lg" placeholder="비밀번호" style={{ borderRadius: '10px' }}/>
                    </div>
                    <div className="d-flex justify-content-end text-white mb-3" style={{ fontSize: '0.8rem' }}>
                        <span>아이디 찾기</span>
                        <span className="ms-2">비밀번호 찾기</span>
                    </div>
                </form>
                <div className="d-flex justify-content-center gap-3 mb-4">
                    {/* 소셜 로그인 아이콘 */}
                    <a href="/" className="icon-button" style={{ backgroundColor: 'white', borderRadius: '50%', padding: '8px' }}>
                        {/* Google 아이콘 */}
                        <img src="https://www.gstatic.com/images/branding/product/1x/gsa_24dp.png" alt="Google icon" width="24" height="24"/>
                    </a>
                    <a href="/" className="icon-button" style={{ backgroundColor: '#03C75A', borderRadius: '50%', padding: '8px' }}>
                        {/* Naver 아이콘 */}
                        <img src="/naver.png" alt="Naver icon" width="24" height="24"/>
                    </a>
                    <a href="/" className="icon-button" style={{ backgroundColor: '#FEE500', borderRadius: '50%', padding: '8px' }}>
                        {/* KakaoTalk 아이콘 */}
                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg" alt="KakaoTalk icon" width="24" height="24"/>
                    </a>
                </div>
                {/* 로그인 버튼 */}
                <Link to={'/'} className="btn login-button w-100 py-2 mb-3" style={{ backgroundColor: '#666', borderRadius: '10px' }}>Log in</Link>
                {/* 회원 가입 버튼 */}
                <Link to={'/signup'} className="btn text-white">회원 가입</Link>
                
            </div>
        </div>
    );
}

// Login 컴포넌트를 기본 내보내기로 설정합니다.
export default Login;

