import { login as loginApi } from "../api/auth";
import appleIcon from "../assets/apple.png";
import facebookIcon from "../assets/facebook.png";
import googleIcon from "../assets/google.png";
import yungManeIcon from "../assets/yungMan.png";
import { useFormValidation } from "../hooks/FormValidation-hook";
import { useAppDispatch } from "../store/hooks";
import { login as loginAction } from "../store/loginUsers/userLoginActions";
import styles from "../styles/LoginForm.module.css";
import { ILoginForm } from "../types";

function LoginForm() {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useFormValidation<ILoginForm>();
  const dispatch = useAppDispatch();
  const onSubmit = async (data: ILoginForm) => {
    try {
      const loggedInUser = await loginApi(data.email, data.password);
      dispatch(loginAction(loggedInUser));
      reset();
    } catch (error) {
      console.log("Error");
    }
  }; // this isn't working

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formSection}>
        <h2>Welcome Back!!</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <div className={styles.inputField}>
              <span className={styles.icon}>✉️</span>
              <input
                type="email"
                placeholder="email@gmail.com"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
            </div>
            {errors?.email?.message && (
              <span className={styles.errorMessage}>
                {errors.email.message}
              </span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <div className={styles.inputField}>
              <span className={styles.icon}>🔒</span>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  maxLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <span className={styles.togglePassword}>👁️</span>
            </div>
            {errors?.password?.message && (
              <span className={styles.errorMessage}>
                {errors.password.message}
              </span>
            )}
            <button type="button" className={styles.forgotPassword}>
              Forgot Password?
            </button>
          </div>

          <button className={styles.loginBtn} type="submit">
            Login
          </button>
          <div className={styles.divider}>- or -</div>

          <div className={styles.socialLogin}>
            <button className={styles.google}>
              <img src={googleIcon} alt="google icon visual" />
            </button>
            <button className={styles.facebook}>
              <img src={facebookIcon} alt="facebook icon visual" />
            </button>
            <button className={styles.apple}>
              <img src={appleIcon} alt="apple icon visual" />
            </button>
          </div>

          <p className={styles.signupText}>
            Don’t have an account? <a href="/">Sign up</a>
          </p>
        </form>
      </div>

      <div className={styles.imageSection}>
        <img src={yungManeIcon} alt="yung man icon visual" />
      </div>
    </div>
  );
}

export default LoginForm;
