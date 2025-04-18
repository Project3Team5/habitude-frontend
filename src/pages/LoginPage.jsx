import './indexx.css';


const LoginPage = () => {
    return (
        <div className= "login-container">
            <h2 className= "form-title" >Log in with </h2>
            <div className= "social-login">
                <button className= "social-button">
                    <img src="google.svg" alt="Google" className="social-icon" /> {/* Comming soon - for more information press a */}
                    Google
                </button>
                <button className= "social-button">
                    <img src="apple.svg" alt="Apple" className="social-icon" /> {/*Comming soon */}
                    Apple
                </button>
            </div>
            <p className="separator"> <span>or</span> </p>

            <form action="#" className='login-form'>
            <div className='input-wrapper'>
                <input type="email" placeholder="Email address"
                       className='input-field' required/>
                <i className="material-symbols-rounded">mail</i>
            </div>
            <div className='input-wrapper'>
                <input type="password" placeholder="Password"
                       className='input-field' required/>
                <i className="material-symbols-rounded">lock</i>
            </div>
            <a href='#' className='forgot-pass-link'>forgot Password?</a>

            <button className="login-button" >Log in </button>
        </form>

        <p className= "signup-text"> Don&apos;t have an account? <a href="#"> Signup
            now</a> </p>
</div>
    )
}

export default LoginPage;