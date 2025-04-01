import React, { useState } from 'react';
import { Icons } from '../../icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/admin/login`, { email, password });
      if (response.status === 200) {
        localStorage.setItem('fitness_token', response.data.token);
        localStorage.setItem('fitness_userId', response.data.admin._id);
        localStorage.setItem('fitness_userName', response.data.admin.name);
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className='login-main-imgbg'>
      <div className="login-main">
        <div className="login-main-widin">
          <h2>Login</h2>
          {error && <p className='error-message'>{error}</p>}
          <form onSubmit={handleSubmit} className="login-form">
            <label className="login-input-lable">Email</label>
            <div className='login-input-div'>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                required
              />
              <span>
                <Icons.email size={18} className="header-icon"/>
              </span>
            </div>
            <label className="login-input-lable">Password</label>
            <div className='login-input-div'>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                required
              />
              <span>
                <Icons.lock size={18} className="header-icon"/>
              </span>
            </div>
            <button type="submit" className="login-submit-btn">Login</button>
          </form>
          <p className='copy-right'>Fitness Project</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
