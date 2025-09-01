import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";
import api from "../axios/axios";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  async function login() {
    try {
      const response = await api.postLogin(user);
      showAlert("success", response.data.message);
      localStorage.setItem("authenticated", true);
      localStorage.setItem("token", response.data.token);
      navigate("events/");
    } catch (error) {
      console.log(error);
      showAlert("error", error.response.data.error);
    }
  }

  const [alert, setAlert] = useState({
    open: false,
    severity: "", // Nível do alerta (Success, Error, Warning, etc)
    message: "",
  });

  const showAlert = (sev, message) => {
    setAlert({ open: true, severity: sev, message });
    localStorage.removeItem("refresh_token");
  };

  const hideAlert = () => {
    setAlert({ ...alert, open: false });
  };

  useEffect(()=>{
    const refreshToken = localStorage.getItem("refresh_token");
    if(refreshToken){
      showAlert("warning", "Sua sessão expirou. Faça o login novamente.")
    }
  }, [])

  return (
    <Container component="main" maxWidth="xl">
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={hideAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={hideAlert}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            margin: 1,
            backgroundColor: "green",
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Vio
        </Typography>
        <Box
          component="form"
          sx={{
            mt: 1,
          }}
          onSubmit={handleSubmit}
          noValidate
        >
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            margin="normal"
            value={user.email}
            onChange={onChange}
          />
          <TextField
            required
            fullWidth
            id="password"
            label="Senha"
            name="password"
            margin="normal"
            type="password"
            value={user.password}
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "green",
            }}
          >
            Entrar
          </Button>
          <Button
            component={Link}
            to="/dashboard"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "green",
            }}
          >
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
export default Login;
