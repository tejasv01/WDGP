import React, { useState } from 'react';
import { Smartphone, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSocialLogin = () => {
    navigate('/dashboard');
  };

  const handleLogin = async () => {
    setError('');
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUsername, password })
      });
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.user.username);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <img src="/logo.svg" alt="Spotify Logo" width="48" height="48" />
        <h1 className="login-title">Welcome back</h1>
      </div>
      
      <div className="login-form">
        {error && <div style={{ color: '#f15e6c', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}
        <div className="input-group">
          <label className="input-label">Email or username</label>
          <input 
            type="text" 
            placeholder="Email or username" 
            className="login-input" 
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Password</label>
          <input 
            type="password" 
            placeholder="Password" 
            className="login-input" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin} className="btn-primary">
          Log in
        </button>
      </div>

      <div className="divider-container">
        <div className="divider-line"></div>
        <span className="divider-text">or</span>
        <div className="divider-line"></div>
      </div>

      <div className="social-btns">
        <button className="btn-social">
          <Smartphone size={20} className="icon-left" />
          Continue with phone number
        </button>
        <button className="btn-social" onClick={handleSocialLogin}>
          <svg viewBox="0 0 24 24" width="20" height="20" className="icon-left" style={{fill: 'currentColor'}}>
            <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"/>
          </svg>
          Continue with Google
        </button>
        <button className="btn-social" onClick={handleSocialLogin}>
          <svg viewBox="0 0 24 24" width="20" height="20" className="icon-left" style={{fill: '#1877F2'}}>
            <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z"/>
          </svg>
          Continue with Facebook
        </button>
        <button className="btn-social" onClick={handleSocialLogin}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="white" className="icon-left">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-.88 1.5 0 2.86.59 3.65 1.5-3.12 1.93-2.6 6.31.54 7.66-.65 1.63-1.63 3.01-2.77 3.89zm-5.28-14c-.11-2.17 1.6-3.99 3.7-4.14.33 2.38-1.74 4.34-3.7 4.14z"/>
          </svg>
          Continue with Apple
        </button>
      </div>

      <div className="login-footer">
        <p>Don't have an account?</p>
        <Link to="/signup">Sign up for Spotify</Link>
      </div>
    </div>
  );
}
