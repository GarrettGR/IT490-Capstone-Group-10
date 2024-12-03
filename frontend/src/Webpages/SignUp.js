import React, { useState } from 'react';
import bcrypt from 'bcryptjs';

function SignUp() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', securityQuestion_1: '', securityAnswer_1: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Submitting signup data:', formData)
    try {
      const saltRounds = 10
      const salt = await bcrypt.genSalt(saltRounds)
      const hashedPassword = await bcrypt.hash(formData.password, salt)
      const hashedsecurityAnswer_1 = await bcrypt.hash(formData.securityAnswer_1, salt)
      const [firstName, lastName] = formData.name.split(' ')
      const response = await fetch('http://143.198.177.105:3000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 
                              `INSERT INTO users
                              (first_name,      last_name,     email,               password_hash,       security_question_1,            security_answer_1) VALUES
                              ('${firstName}', '${lastName}', '${formData.email}', '${hashedPassword}', '${formData.securityQuestion_1}', '${hashedsecurityAnswer_1}')`
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      console.log(result)
      if (result.status === 'success') {
        alert('Signup successful!')
	window.location.href='Login'
      } else {
        alert(result.message || 'Signup failed.')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#f0f8ff' }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
        <h1 className="text-center mb-4" style={{ color: '#003366' }}>Create an Account</h1>

        <form method="POST" id="signup_form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold" style={{ color: '#005b96' }}>What should we call you?</label>
            <input
              id="name"
              name="name"
              placeholder="Example: Jane Doe"
              type="text"
              value={formData.name}
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
            <small className="text-muted">Enter your First and Last Name</small>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold" style={{ color: '#005b96' }}>What's your Email?</label>
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
            <label htmlFor="password" className="form-label fw-semibold" style={{ color: '#005b96' }}>Create a Password</label>
            <input
              id="password"
              name="password"
              placeholder="Example: Password123"
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
            <small className="text-muted">Use 8+ characters with a mix of letters, numbers, and symbols</small>
          </div>

          <div className="mb-3">
            <label htmlFor="securityQuestion_1" className="form-label fw-semibold" style={{ color: '#005b96' }}>Select a Security Question</label>
            <select
              id="securityQuestion_1"
              name="securityQuestion_1"
              value={formData.securityQuestion_1}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="" disabled>Select a Security Question</option>
              <option value="What was the name of your first pet?">What was the name of your first pet?</option>
              <option value="What is your mother\'s maiden name?">What is your mother's maiden name?</option>
              <option value="What was the name of your elementary school?">What was the name of your elementary school?</option>
              <option value="What is your favorite color?">What is your favorite color?</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="securityAnswer_1" className="form-label fw-semibold" style={{ color: '#005b96' }}>Answer the Security Question</label>
            <input
              id="securityAnswer_1"
              name="securityAnswer_1"
              placeholder="Answer"
              type="text"
              value={formData.securityAnswer_1}
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
          </div>

          <button type="submit" className="btn w-100" style={{ backgroundColor: '#007bff', color: '#fff' }}>Create an Account</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;