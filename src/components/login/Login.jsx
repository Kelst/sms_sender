import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const login = async (login, pass) => {
    return axios.post("http://sms.multiprovider.info/api/login", {
      login: login.trim(),
      password: pass.trim()
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(username, password);
      if (data.flag) {
        // Store login and provider access in cookies
        Cookies.set('login', username, { expires: 0.02083 });
        Cookies.set('providerAccess', JSON.stringify(data.providerAccess), { expires: 0.02083 });
        Cookies.set('aid', data.aid, { expires: 0.02083 });
        
        // Clear any existing provider selection
        localStorage.removeItem('currentBrand');
        
        navigate("/provider-selection");
      } else {
        setError("Невірний логін або пароль");
        setShowError(true);
      }
    } catch (err) {
      setError("Помилка підключення");
      setShowError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Login
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full  text-white  bg-slate-800 rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                placeholder="Login"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full   bg-slate-800  text-white rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-orange-500 px-4 py-3 text-white font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Sign in
          </button>
        </form>

        {showError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;