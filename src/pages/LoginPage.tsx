// src/pages/LoginPage.tsx
import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { api, setAuthToken } from '../services/api'; // Import our api service
import { useNavigate } from 'react-router-dom'; // Import for redirection

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await api.login(formData);
      setAuthToken(data.token);
      alert('Login successful!');
      navigate('/'); // Redirect to the dashboard on successful login
    } catch (error) {
      alert('Login failed. Please check your credentials.');
      console.error(error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 8, p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">Login</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal" required fullWidth id="email" label="Email Address" name="email"
          value={formData.email} onChange={handleChange}
        />
        <TextField
          margin="normal" required fullWidth name="password" label="Password" type="password" id="password"
          value={formData.password} onChange={handleChange}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
      </Box>
    </Box>
  );
};
export default LoginPage;