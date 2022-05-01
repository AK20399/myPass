import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    }).then((res) => res.json());
    if (res?.status) {
      navigate('/home');
    } else {
      alert('Failed to login');
    }
  };

  return (
    <div>
      <input placeholder="Enter email" type="email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Enter password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};
