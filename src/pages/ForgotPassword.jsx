import { useState } from "react"
import { Link } from "react-router-dom"
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { toast } from "react-toastify"
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")

  const onChange = (e) => {
    setEmail(e.currentTarget.value)
  }
  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success("Reset password email was sent")
    } catch (error) {
      console.log(error)
      toast.error("Error while processing request")
    }
  }

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeade">Forgot Password</p>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
            />

            <Link className="forogotPasswordLink" to="/sign-in">
              Return to Sign In Page
            </Link>

            <div className="signInBar">
              <div className="signInText">Send Reset Link</div>
              <button className="signInButton">
                <ArrowRightIcon fill="#FFFFFF" width={34} height={34} />
              </button>
            </div>
          </form>
        </main>
      </header>
    </div>
  )
}

export default ForgotPassword
