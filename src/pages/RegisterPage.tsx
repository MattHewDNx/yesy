// src/pages/RegisterPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext'; // Path should be correct

const RegisterPage = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await api.register(formData);
      setToken(data.token); // Use the global setToken function
      alert('Registration successful!');
      navigate('/'); // Redirect to the dashboard
    } catch (error) {
      console.error(error);
      alert('Registration failed.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 8, p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">Register</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        {/* TextFields remain the same */}
        <TextField margin="normal" required fullWidth id="name" label="Name" name="name" value={formData.name} onChange={handleChange} />
        <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" value={formData.email} onChange={handleChange} />
        <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" value={formData.password} onChange={handleChange} />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Register</Button>
      </Box>
    </Box>
  );
};
export default RegisterPage;