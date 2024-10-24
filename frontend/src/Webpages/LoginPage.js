import React, { useState, useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import bcrypt from 'bcryptjs';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false); // Track if user is in forgot password mode
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { login } = useContext(UserContext)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  // Forgot Password Submission
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting forgot password request:', formData.email);
    try {
      // Step 1: Fetch the security question for the provided email
      const response = await fetch('http://143.198.177.105:3000/api/form-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `SELECT security_question FROM users WHERE email='${formData.email}'` }),
      });
      const result = await response.json();
      console.log(result);
      if (result.status === 'success') {
        setSecurityQuestion(result.body.results[0][0]);
      } else {
        alert(result.message || 'Email not found.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handling Security Answer
  const handleSecurityAnswerSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting security answer:', securityAnswer);
    try {
      // Step 2: Validate the security answer
      const response = await fetch('http://143.198.177.105:3000/api/form-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `SELECT security_answer_hash FROM users WHERE email='${formData.email}'` }),
      });
      const result = await response.json();
      const isAnswerValid = await bcrypt.compare(securityAnswer, result.body.results[0][0]);

      if (isAnswerValid) {
        // Step 3: Allow password reset if the security answer is correct
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        const resetResponse = await fetch('http://143.198.177.105:3000/api/form-submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: `UPDATE users SET password_hash='${hashedNewPassword}' WHERE email='${formData.email}'` }),
        });
        const resetResult = await resetResponse.json();
        if (resetResult.status === 'success') {
          alert('Password reset successful!');
          setForgotPasswordMode(false);
        } else {
          alert('Failed to reset password.');
        }
      } else {
        alert('Incorrect security answer.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Submitting login data:', formData)
    try {
      const response = await fetch('http://143.198.177.105:3000/api/form-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `SELECT password_hash, first_name FROM users WHERE email='${formData.email}'`, password: formData.password }),
      });
      const result = await response.json()
      console.log(result)
      if (result.status === 'success') {
        login(result.message.split(', ')[1].replace('!', ''))
        alert(`Hello, ${result.message.split(', ')[1].replace('!', '')}!`)
        window.location.href = '/'
      } else {
        alert(result.message || 'Invalid email or password.')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  };

  return (
    <div>
      <div className="loginbox">
        <div className="login">
          <h1 className="login-1 ui heading size-text6xl">Login</h1>
          <div className="columnotherissu">

            {!forgotPasswordMode ? (
              <form method="POST" id='login_form' onSubmit={handleSubmit}>
                <div className="columnlabel">
                  <div className="email-3">
                    <div className="rowlabel">
                      <p className="class-2022yanliudesig ui text size-textxl">What's your Email?</p>
                    </div>
                    <label className="email ui input gray_700_59 size-md outline round">
                      <input id='email' name="email" placeholder="Example: email@email.com" type="text" value={formData.email} onChange={handleChange} required />
                    </label>
                    <p className="class-2022yanliudesig ui text size-textxl">Put in your valid Email Address</p>
                  </div>
                  <div className="email-3">
                    <div className="rowlabel">
                      <p className="class-2022yanliudesig ui text size-textxl">Enter your Password</p>
                    </div>
                    <label className="email ui input gray_700_59 size-md outline round">
                      <input id='password' name="password" placeholder="Example: Password123" type="password" value={formData.password} onChange={handleChange} required />
                    </label>
                    <p className="class-2022yanliudesig ui text size-textxl">Use 8 or more characters with a mix of letters, numbers, and symbols</p>
                  </div>
                </div>
                <div className="columnlog_in">
                  <input type='submit' value='Login' className="log_in ui button gray_900_71 size-3xl fill" />
                </div>
                <div className="forgot-password">
                  <button onClick={() => setForgotPasswordMode(true)} className="forgot-password-button">Forgot Password?</button>
                </div>
              </form>
            ) : (
              <div>
                <h2>Forgot Password</h2>
                {!securityQuestion ? (
                  <form onSubmit={handleForgotPasswordSubmit}>
                    <label className="email ui input gray_700_59 size-md outline round">Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    <div className="columnlog_in">
                      <input type='submit' className="log_in ui button gray_900_71 size-3xl fill" />
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleSecurityAnswerSubmit}>
                    <p>{securityQuestion}</p>
                    <label className="email ui input gray_700_59 size-md outline round">Answer:</label>
                    <input type="text" name="securityAnswer" value={securityAnswer} onChange={(e) => setSecurityAnswer(e.target.value)} required />
                    <label className="email ui input gray_700_59 size-md outline round">New Password:</label>
                    <input type="password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    <div>
                      <button type="submit" className='log_in ui button gray_900_71 size-3xl fill'>Reset Password</button>
                    </div>
                  </form>
                )}
              </div>
            )}

            <div class="columnlog_in">
              <a href="SignUpPage">
                <button class="create_an ui button gray_900_02 size-3xl outline">Create an account</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
