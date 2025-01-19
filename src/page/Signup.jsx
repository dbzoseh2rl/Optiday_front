import React, { useState } from "react";
import "../styles/Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    backupEmail: '',
    isRobot: false,
    verificationCode: ''
  });

  const [errors, setErrors] = useState({});
  const [showVerification, setShowVerification] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // 이메일 검사
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }

    // 비밀번호 검사
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (formData.password.length < 6 || formData.password.length > 20) {
      newErrors.password = '비밀번호는 6~20자 사이여야 합니다';
    }

    // 비밀번호 확인 검사
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
    }

    // 이름 검사
    if (!formData.name) {
      newErrors.name = '이름을 입력해주세요';
    } else if (formData.name.length < 2 || formData.name.length > 10) {
      newErrors.name = '이름은 2~10자 사이여야 합니다';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const numbers = value.replace(/[^0-9]/g, '');
      if (numbers.length <= 11) {
        let formattedNumber = '';
        if (numbers.length <= 3) {
          formattedNumber = numbers;
        } else if (numbers.length <= 7) {
          formattedNumber = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        } else {
          formattedNumber = `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
        }
        setFormData(prev => ({
          ...prev,
          [name]: formattedNumber
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      // 에러 메시지 초기화
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    }
  };

  const handleVerificationRequest = () => {
    if (!formData.email) {
      setErrors(prev => ({
        ...prev,
        email: '이메일을 입력해주세요'
      }));
      return;
    }
    setShowVerification(true);
    // TODO: 실제 이메일 인증 요청 로직 구현
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // 폼 제출 로직
      console.log('폼 제출 성공:', formData);
    } else {
      console.log('폼 검증 실패');
    }
  };

  return (
    <div className="signup-page">
      <h1>OptiDay</h1>
      <h2 className="signup-title">회원 가입</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-layout">
          <div className="form-sections">
            <div className="section-title">로그인 정보</div>
            <div className="section-title personal-info">개인 정보</div>
          </div>
          
          <div className="form-fields">
            <div className="login-info-fields">
              <div className="form-row">
                <label className="form-label">이메일 주소<span className="required">*</span></label>
                <div className="form-input-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="이메일"
                    className={errors.email ? 'error' : ''}
                  />
                  <button 
                    type="button" 
                    className="verification-button"
                    onClick={handleVerificationRequest}
                  >
                    인증 요청
                  </button>
                  {showVerification && (
                    <>
                      <input
                        type="text"
                        name="verificationCode"
                        value={formData.verificationCode}
                        onChange={handleChange}
                        placeholder="인증번호"
                        maxLength="6"
                        className="verification-input"
                      />
                      <button type="button" className="verification-button">
                        확인
                      </button>
                    </>
                  )}
                  {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
              </div>

              <div className="form-row">
                <label className="form-label">비밀번호<span className="required">*</span></label>
                <div className="form-input-group">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="비밀번호"
                    className={errors.password ? 'error' : ''}
                  />
                  <span className="input-hint">6~20자</span>
                  {errors.password && <div className="error-message">{errors.password}</div>}
                </div>
              </div>

              <div className="form-row">
                <label className="form-label">비밀번호확인<span className="required">*</span></label>
                <div className="form-input-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="비밀번호 확인"
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                </div>
              </div>
            </div>

            <div className="personal-info-fields">
              <div className="form-row">
                <label className="form-label">이름<span className="required">*</span></label>
                <div className="form-input-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="이름"
                    className={errors.name ? 'error' : ''}
                  />
                  <span className="input-hint">2~10자</span>
                  {errors.name && <div className="error-message">{errors.name}</div>}
                </div>
              </div>

              <div className="form-row">
                <label className="form-label">전화번호</label>
                <div className="form-input-group">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="000-0000-0000"
                    maxLength="13"
                  />
                </div>
              </div>

              <div className="form-row">
                <label className="form-label">보조 이메일</label>
                <div className="form-input-group">
                  <input
                    type="email"
                    name="backupEmail"
                    value={formData.backupEmail}
                    onChange={handleChange}
                  />
                  <span className="input-hint">주 이메일 계정에 문제가 생겼을 경우 필요할 수 있습니다.</span>
                </div>
              </div>

              <div className="form-row">
                <div className="checkbox-container">
                  <label className="form-label">알게 된 경로</label>
                  <div className="checkbox-group">
                    <label>
                      <input type="checkbox" name="reference" value="친구 추천" />
                      친구 추천
                    </label>
                    <label>
                      <input type="checkbox" name="reference" value="인터넷" />
                      인터넷
                    </label>
                    <label>
                      <input type="checkbox" name="reference" value="광고" />
                      광고
                    </label>
                    <label>
                      <input type="checkbox" name="reference" value="기타" />
                      기타 - 내가만듬
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="robot-checkbox">
          <input
            type="checkbox"
            name="isRobot"
            checked={formData.isRobot}
            onChange={(e) => setFormData(prev => ({ ...prev, isRobot: e.target.checked }))}
          />
          <label>저는 로봇이 아닙니다.</label>
        </div>

        <button type="submit" className="submit-button">
          가입하기
        </button>
      </form>
    </div>
  );
};

export default Signup;