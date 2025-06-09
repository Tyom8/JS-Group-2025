import { useState } from "react";
import appleIcon from "../assets/apple.png";
import facebookIcon from "../assets/facebook.png";
import googleIcon from "../assets/google.png";
import yungManeIcon from "../assets/yungMan.png";
import styles from "../styles/LoginForm.module.css";
import { useFormValidation } from "../hooks/FormValidation-hook";
import { ILoginForm } from "../types";

function LoginForm() {
  const [resetMessage, setResetMessage] = useState<string>("");
  const [showResetModal, setShowResetModal] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useFormValidation<ILoginForm>();

  const {
    register: resetRegister,
    reset: resetForm,
    formState: {errors: resetErrors},
    handleSubmit: handleResetSubmit,
  } = useFormValidation<ILoginForm>();

  const onSubmit = (data: ILoginForm) => {
    console.log(data);
    reset();
  };

  const onResetPasswordSubmit = (data: ILoginForm) => {
    console.log(data);
    setResetMessage("Email is sent successfully");
    resetForm();
  };

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
            <button
              type="button"
              className={styles.forgotPassword}
              onClick={() => setShowResetModal(true)}
            >
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

      {showResetModal && (
        <div className={styles.resetModal}>
          <div className={styles.resetContent}>
            <h3>Reset Password</h3>
            <form onSubmit={handleResetSubmit(onResetPasswordSubmit)}>
              <input
                type="email"
                placeholder="Enter your email"
                {...resetRegister("resetEmail", {
                  required: {
                    value: true,
                    message: "This field is required"
                  }
                })}
              />
              {resetErrors?.resetEmail?.message && (
                <span className={styles.errorMessage}>{resetErrors.resetEmail.message}</span>
              )}
              <button type="submit">Send Reset Link</button>
              {resetMessage && (
                <p className={styles.resetMessage}>{resetMessage}</p>
              )}
            </form>
            <button
              className={styles.closeBtn}
              onClick={() => setShowResetModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
