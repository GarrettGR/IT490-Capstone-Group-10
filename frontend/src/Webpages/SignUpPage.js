import React from 'react'
import bcrypt from 'bcryptjs'

function SignUpPage() {
  const nameInputRef = useRef()
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const handleSignupFormSubmit = async () => {
    const email = emailInputRef.current.value
    const password = passwordInputRef.current.value
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const response = await fetch('/api/signup', { //TODO: HAVE THIS POINT TO THE RIGHT LOCATION 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: hashedPassword }),
      });
      if (response.ok) {
        console.log('User successfully signed up!');
      } else {
        console.error('Failed to sign up user.');
      }
    } catch (error) {
      console.error('Error during user signup:', error);
    }
  };

  return (
    <div>
      <body>
        <div class="signinbox">
          <div class="signin">
            <h1 class="signin-1 ui heading size-text6xl">Create an Account</h1>

            {/* The Sign Up Form */}
            <div class="columnotherissu">
              <div class="columnlabel">
                <div class="email-3">
                  <div class="rowabel">
                    <p class="class-2022yanliudesig ui text size-textxl">What should we call you?</p>
                  </div>
                  <label class="email ui input gray_700_59 size-md outline round">
                    <input name="name" placeholder="Example: Jane Doe" type="text" />
                  </label>
                  <p class="class-2022yanliudesig ui text size-textxl">Put in your First and Last Name</p>
                </div>
                <div class="email-3">
                  <div class="rowlabel">
                    <p class="class-2022yanliudesig ui text size-textxl">What's your Email?</p>
                  </div>
                  <label class="email ui input gray_700_59 size-md outline round">
                    <input name="email" placeholder="Example: email@email.com" type="text" />
                  </label>
                  <p class="class-2022yanliudesig ui text size-textxl">Put in your valid Email Adress</p>
                </div>
                <div class="email-3">
                  <div class="rowabel">
                    <p class="class-2022yanliudesig ui text size-textxl">Create a Password</p>
                  </div>
                  <label class="email ui input gray_700_59 size-md outline round">
                    <input name="password" placeholder="Example: Password123" type="text" />
                  </label>
                  <p class="class-2022yanliudesig ui text size-textxl">Use 8 or more characters with a mix of letters, numbers and symbols</p>
                </div>
              </div>
              <div class="columnlog_in">
                <p class="bycreatingan ui text size-textxl">
                  <span class="bycreatingan-span"> By continuing, you agree to the&nbsp;</span>
                  <a href="#" class="bycreatingan-span-1"> Terms of use</a>
                  <span class="bycreatingan-span-2"> &nbsp;</span>
                  <span class="bycreatingan-span"> and</span>
                  <span class="bycreatingan-span-2"> &nbsp;</span>
                  <a href="#" class="bycreatingan-span-1"> Privacy Policy.</a>
                  <a href="#" class="bycreatingan-span-6"> &nbsp;</a>
                </p>
                <a href="LoginPage">
                  <button class="log_in ui button gray_900_71 size-3xl fill">Create an Account</button>
                </a> 
              </div> 
            </div>
          </div> 
        </div>
      </body>
    </div>
  )
}

export default SignUpPage
