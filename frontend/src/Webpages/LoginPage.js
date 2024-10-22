import React, { useState } from 'react';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
      console.log('Submitting login data:', formData)
    try {
      const response = await fetch('http://100.112.216.76:3000/api/form-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `SELECT * FROM users WHERE email='${formData.email}'`, password: formData.password }),
      });
      const result = await response.json()
      console.log(result)
      if (result.status === 'success') {
        alert('Login successful!')
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
            <form method="POST" id='login_form' onSubmit={handleSubmit}>
              <div className="columnlabel">
                <div className="email-3">
                  <div className="rowlabel">
                    <p className="class-2022yanliudesig ui text size-textxl">What's your Email?</p>
                  </div>
                  <label className="email ui input gray_700_59 size-md outline round">
                    <input id='email' name="email" placeholder="Example: email@email.com" type="text" value={formData.email} onChange={handleChange} required/>
                  </label>
                  <p className="class-2022yanliudesig ui text size-textxl">Put in your valid Email Address</p>
                </div>
                <div className="email-3">
                  <div className="rowlabel">
                    <p className="class-2022yanliudesig ui text size-textxl">Enter your Password</p>
                  </div>
                  <label className="email ui input gray_700_59 size-md outline round">
                    <input id='password' name="password" placeholder="Example: Password123" type="password" value={formData.password} onChange={handleChange} required/>
                  </label>
                  <p className="class-2022yanliudesig ui text size-textxl">Use 8 or more characters with a mix of letters, numbers, and symbols</p>
                </div>
              </div>
              <div className="columnlog_in">
                <input type='submit' value='Login' className="log_in ui button gray_900_71 size-3xl fill"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;