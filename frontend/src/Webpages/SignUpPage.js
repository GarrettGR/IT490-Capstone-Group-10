import React from 'react'
import { useState } from 'react'
import bcrypt from 'bcryptjs'

function SignUpPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Print form data to console
    console.log('Submitting form data:', formData);
    try {
      const response = await fetch('http://localhost:3000/api/form-submit', { //CHECK THIS 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const nameInputRef = useRef()
  // const emailInputRef = useRef()
  // const passwordInputRef = useRef()

  // const handleSignupFormSubmit = async () => {
  //   const email = emailInputRef.current.value
  //   const password = passwordInputRef.current.value
  //   try {
  //     const saltRounds = 10;
  //     const salt = await bcrypt.genSalt(saltRounds);
  //     const hashedPassword = await bcrypt.hash(password, salt);
  //     const response = await fetch('/api/signup', { //TODO: HAVE THIS POINT TO THE RIGHT LOCATION 
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email: email, password: hashedPassword }),
  //     });
  //     if (response.ok) {
  //       console.log('User successfully signed up!');
  //     } else {
  //       console.error('Failed to sign up user.');
  //     }
  //   } catch (error) {
  //     console.error('Error during user signup:', error);
  //   }
  // };
  

  return (
    <div>
      
        <div className="signinbox">
          <div className="signin">
            <h1 className="signin-1 ui heading size-text6xl">Create an Account</h1>

            {/* The Sign Up Form */}
            <div className="columnotherissu">

              <form method="POST" id='signup_form' onSubmit={handleSubmit}>

                <div className="columnlabel">

                  <div className="email-3">

                    <div className="rowlabel">
                      <p className="class-2022yanliudesig ui text size-textxl">What should we call you?</p>
                    </div>
                    <label className="email ui input gray_700_59 size-md outline round">
                      <input id='name' name="name" placeholder="Example: Jane Doe" type="text" value={formData.name} onChange={handleChange} required/>
                    </label>
                    
                    <p className="class-2022yanliudesig ui text size-textxl">Put in your First and Last Name</p>

                  </div>

                  <div className="email-3">

                    <div className="rowlabel">
                      <p className="class-2022yanliudesig ui text size-textxl">What's your Email?</p>
                    </div>

                    <label className="email ui input gray_700_59 size-md outline round">
                      <input id='email' name="email" placeholder="Example: email@email.com" type="text" value={formData.email} onChange={handleChange} required/>
                    </label>

                    <p className="class-2022yanliudesig ui text size-textxl">Put in your valid Email Adress</p>

                  </div>

                  <div className="email-3">

                    <div className="rowlabel">
                      <p className="class-2022yanliudesig ui text size-textxl">Create a Password</p>
                    </div>

                    <label className="email ui input gray_700_59 size-md outline round">
                      <input id='password' name="password" placeholder="Example: Password123" type="text" value={formData.password} onChange={handleChange}required/>
                    </label>

                    <p className="class-2022yanliudesig ui text size-textxl">Use 8 or more characters with a mix of letters, numbers and symbols</p>

                  </div>

                </div>

                <div className="columnlog_in">

                  <input type='submit' value='Create an Account' className="log_in ui button gray_900_71 size-3xl fill"/>

                </div>

              </form>




            </div>
          </div>
        </div>
      
    </div>
  )
}

export default SignUpPage
