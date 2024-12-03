import React, { useState, useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import bcrypt from 'bcryptjs';

function Login() {
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
      const response = await fetch('http://143.198.177.105:3000/api/recovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `SELECT security_question_1 FROM users WHERE email='${formData.email}'` }),
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
      const response = await fetch('http://143.198.177.105:3000/api/recovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `SELECT security_answer_1 FROM users WHERE email='${formData.email}'` }),
      });
      const result = await response.json();
      const isAnswerValid = await bcrypt.compare(securityAnswer, result.body.results[0][0]);

      if (isAnswerValid) {
        // Step 3: Allow password reset if the security answer is correct
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        const resetResponse = await fetch('http://143.198.177.105:3000/api/recovery', {
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
      const response = await fetch('http://143.198.177.105:3000/api/login', {
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
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#f0f8ff' }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
        <h1 className="text-center mb-4" style={{ color: '#003366' }}>Login</h1>

        {!forgotPasswordMode ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold" style={{ color: '#005b96' }}>Email</label>
              <input
                id="email"
                name="email"
                placeholder="Example: email@email.com"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                style={{
                  backgroundColor: "#f4f6f9", // Light gray background for inputs
                  borderColor: "#5c6bc0", // Darker blue border
                  padding: "10px",
                  border: "solid",
                }}
                required
              />
              <small className="text-muted">Enter a valid email address</small>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold" style={{ color: '#005b96' }}>Password</label>
              <input
                id="password"
                name="password"
                placeholder="Enter password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                style={{
                  backgroundColor: "#f4f6f9", // Light gray background for inputs
                  borderColor: "#5c6bc0", // Darker blue border
                  padding: "10px",
                  border: "solid",
                }}
                required
              />
              <small className="text-muted">8+ characters with letters, numbers, and symbols</small>
            </div>

            <button type="submit" className="btn w-100" style={{ backgroundColor: '#007bff', color: '#fff' }}>Login</button>

            <div className="text-center mt-3">
              <button
                type="button"
                onClick={() => setForgotPasswordMode(true)}
                className="btn btn-link"
                style={{ color: '#007bff' }}
              >
                Forgot Password?
              </button>
            </div>
          </form>
        ) : (
          <div>
            <h2 className="text-center" style={{ color: '#003366' }}>Forgot Password</h2>
            {!securityQuestion ? (
              <form onSubmit={handleForgotPasswordSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold" style={{ color: '#005b96' }}>Enter your email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn w-100" style={{ backgroundColor: '#007bff', color: '#fff' }}>Submit</button>
              </form>
            ) : (
              <form onSubmit={handleSecurityAnswerSubmit}>
                <p className="fw-semibold" style={{ color: '#005b96' }}>{securityQuestion}</p>
                <div className="mb-3">
                  <label htmlFor="securityAnswer" className="form-label fw-semibold" style={{ color: '#005b96' }}>Security Answer</label>
                  <input
                    type="text"
                    name="securityAnswer"
                    placeholder="Answer"
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label fw-semibold" style={{ color: '#005b96' }}>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn w-100" style={{ backgroundColor: '#007bff', color: '#fff' }}>Reset Password</button>
              </form>
            )}
          </div>
        )}

        <div className="text-center mt-4">
          <p className="mb-2" style={{ color: '#003366' }}>Don't have an account?</p>
          <a href="/SignUp" className="btn w-100" style={{ borderColor: '#007bff', color: '#007bff' }}>Create an account</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
