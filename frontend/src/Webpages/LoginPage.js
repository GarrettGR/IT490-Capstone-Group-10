import React from 'react'

function LoginPage() {

  const handleLoginFormSubmit = async () => {
    const email = emailInputRef.current.value
    const password = passwordInputRef.current.value
    try {
      const response = await fetch('/api/login', { //TODO: HAVE THIS POINT TO THE RIGHT LOCATION
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        const data = await response.json();
        const storedHash = data.hashedPassword;
        const passwordMatch = await bcrypt.compare(password, storedHash); //TODO: THIS SHOULD REALLY BE HANDLED BACKEND!!

  //       if (passwordMatch) {
  //         console.log('Login successful!');
  //         // redirect or perform other actions for a successful login
  //       } else {
  //         console.error('Incorrect password. Login failed.');
  //       }
  //     } else {
  //       console.error('Failed to authenticate user.');
  //     }
  //   } catch (error) {
  //     console.error('Error during user login:', error);
  //   }
  // };


  return (
    <div>
      
        <div className="trouble-shooting">
          <div className="signinbox">

            <form id='login_form'>

              <div className="signin">

                <h1 className="signin-1 ui heading size-text6xl">Sign In</h1>

                <div className="columnotherissu">

                  <div className="columnlabel">

                    <div className="email-3">

                      <div className="rowlabel">
                        <p className="className-2022yanliudesig ui text size-textxl">Email</p>
                      </div>
                      <label className="email ui input gray_700_59 size-md outline round">
                        <input id='email' name="email" type="text" required/>
                      </label>

                    </div>

                    <div className="email-3">

                      <div className="rowlabel">
                        <p className="className-2022yanliudesig ui text size-textxl">Password</p>
                      </div>
                      <label className="email ui input gray_700_59 size-md outline round">
                      <input id='password' name="password" type="text" />
                      </label>

                    </div>

                    

                  </div>

                  <div className="columnlog_in">

                    <input type='submit' value='Login' class="log_in ui button gray_900_71 size-3xl fill" />

                  </div>

                </div>

              </div>

              <div className="divider">
                <div className="divider_one"></div>
                <p className="or ui text size-text4xl">New to our community</p>
                <div className="divider_one"></div>
              </div>

            </form>

            <div class="columnlog_in">
                <a href="SignUpPage">
                  <button class="create_an ui button gray_900_02 size-3xl outline">Create an account</button>
                </a>
              </div>

          </div>
        </div>
      
    </div>
  )
}

export default LoginPage
