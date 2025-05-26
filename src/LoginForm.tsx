import React, { useState } from "react";
import "./LoginForm.css";
import googleIcon from './img/google.png';
import appleIcon from './img/apple.png';
import facebookIcon from './img/facebook.png';
import yungManeIcon from './img/yungMan.png';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = "Enter a valid email";
    }

    if (!trimmedPassword) {
      newErrors.password = "Password is required";
    } else if (trimmedPassword.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Logging in with:", { email, password });
    }
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = resetEmail.trim();
    if (!trimmed) {
      setResetMessage("Please enter your email.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setResetMessage("Please enter a valid email.");
    } else {
      setResetMessage("Reset link sent to your email!");
      setTimeout(() => setShowResetModal(false), 2000);
    }
  };

  return (
    <div className="login-container">
      <div className="form-section">
        <h2>Welcome Back!!</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <div className="input-field">
              <span className="icon">✉️</span>
              <input
                type="email"
                placeholder="email@gmail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                }}
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-field">
              <span className="icon">🔒</span>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                }}
              />
              <span className="toggle-password">👁️</span>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
            <button
              type="button"
              className="forgot-password"
              onClick={() => setShowResetModal(true)}
            >
              Forgot Password?
            </button>
          </div>

          <button className="login-btn" type="submit">Login</button>

          <div className="divider">- or -</div>

          <div className="social-login">
            <button className="google">
              <img src={googleIcon} alt="google icon visual" />
            </button>
            <button className="facebook">
              <img src={facebookIcon} alt="facebook icon visual" />
            </button>
            <button className="apple">
              <img src={appleIcon} alt="apple icon visual" />
            </button>
          </div>

          <p className="signup-text">
            Don’t have an account? <a href="/">Sign up</a>
          </p>
        </form>
      </div>

      <div className="image-section">
        <img src={yungManeIcon} alt="yung man icon visual" />
      </div>

      {showResetModal && (
        <div className="reset-modal">
          <div className="reset-content">
            <h3>Reset Password</h3>
            <form onSubmit={handleResetSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => {
                  setResetEmail(e.target.value);
                  setResetMessage("");
                }}
              />
              <button type="submit">Send Reset Link</button>
              {resetMessage && <p className="reset-message">{resetMessage}</p>}
            </form>
            <button className="close-btn" onClick={() => setShowResetModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
