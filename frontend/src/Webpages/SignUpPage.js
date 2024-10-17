import React from 'react'

function SignUpPage() {
  return (
    <div>
        <div className="signinbox">
            <div className="signin">

                <a href="#">
                    <h1 className="signin-1 ui heading size-text6xl">Create an Account</h1>
                </a>
                <div className="haveanaccount">

                    <a href="LoginPage.html">
                        <span className="alreadyhavean ui text size-textxl">Already have an account? Log in </span>
                    </a>
            
                </div>

                <div className="columnotherissu">
                    <div className="columnlabel">

                        <div className="email-3">

                            <div className="rowabel">
                                <p className="className-2022yanliudesig ui text size-textxl">What should we call you?</p>
                            </div>
                            <label className="email ui input gray_700_59 size-md outline round">
                                <input name="name" placeholder = "Example: Jane" type="text" />
                            </label>
                            <p className="className-2022yanliudesig ui text size-textxl">Put in your First and Last Name</p>

                        </div>

                        <div className="email-3">

                            <div className="rowlabel">
                                <p className="className-2022yanliudesig ui text size-textxl">What's your Email?</p>
                            </div>
                            <label className="email ui input gray_700_59 size-md outline round">
                                <input name="email" placeholder = "Example: email@email.com" type="text" />
                            </label>
                            <p className="className-2022yanliudesig ui text size-textxl">Put in your valid Email Adress</p>

                        </div>

                        <div className="email-3">

                            <div className="rowabel">
                                <p className="className-2022yanliudesig ui text size-textxl">Create a Password</p>
                            </div>
                            <label className="email ui input gray_700_59 size-md outline round">
                                <input name="password" placeholder = "Example: Password123" type="text" />
                            </label>
                            <p className="className-2022yanliudesig ui text size-textxl">Use 8 or more characters with a mix of letters, numbers and symbols</p>

                        </div>

                    </div>

                    

                    <div className="columnlog_in">
                        <p className="bycreatingan ui text size-textx1">
                            <span className="bycreatingan-span"> By continuing, you agree to the&nbsp;</span> 
                            <a href="#" className="bycreatingan-span-1"> Terms of use</a>
                            <span className="bycreatingan-span-2"> &nbsp;</span>
                            <span className="bycreatingan-span"> and</span>
                            <span className="bycreatingan-span-2"> &nbsp;</span>
                            <a href="#" className="bycreatingan-span-1"> Privacy Policy.</a>
                            <a href="#" className="bycreatingan-span-6"> &nbsp;</a>
                        </p>
                        <a href="LoginPage.html">
                            <button className="log_in ui button gray_900_71 size-3xl fill">Create an Account</button>
                        </a>
                    </div>

                </div>
                

            </div>

        </div>
    </div>
  )
}

export default SignUpPage
