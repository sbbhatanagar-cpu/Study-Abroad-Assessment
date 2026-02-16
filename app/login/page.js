"use client";

import { useState } from "react";
import { 
  TextField, Button, Typography, Box, Alert, 
  Paper, InputAdornment, IconButton, CircularProgress, Chip, Divider, Grid
} from "@mui/material"; 
import { Visibility, VisibilityOff, Lock, Person, School, TravelExplore } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../dashboard/store";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleDemoLogin = () => {
    setUsername("emilys");
    setPassword("emilyspass");
    setError("");
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data, data.accessToken);
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data));
        router.push("/dashboard");
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch (error) {
      setError("Connection error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container sx={{ minHeight: "100vh", bgcolor: "#020617" }}>
      <Grid 
        sx={{
          position: "relative",
          backgroundImage: 'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          px: 8,
          flex: { sm: 5, md: 7 }, 
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "linear-gradient(to right, rgba(2, 6, 23, 0.9), rgba(2, 6, 23, 0.4))",
            zIndex: 1
          }
        }}
      >
        <Box sx={{ zIndex: 2, color: "white" }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
            <School sx={{ fontSize: 40, color: "#3b82f6" }} />
            <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: -1 }}>
              STUDY <span style={{ color: "#3b82f6" }}>ABROAD</span>
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ opacity: 0.8, fontWeight: 300, maxWidth: 500, lineHeight: 1.6 }}>
            The ultimate gateway to global education management. 
            Track applications and manage courses in one place.
          </Typography>
        </Box>
      </Grid>

      <Grid 
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
          flex: { xs: 12, sm: 7, md: 5 },
          background: "radial-gradient(circle at center, #1e293b 0%, #020617 100%)"
        }}
      >
        <Paper 
          elevation={0} 
          sx={{
            width: "100%",
            maxWidth: 450,
            p: { xs: 3, md: 6 },
            bgcolor: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(15px)",
            borderRadius: 6,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            textAlign: "center"
          }}
        >
          <TravelExplore sx={{ fontSize: 50, color: "#3b82f6", mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 800, color: "white", mb: 1 }}>Welcome Back</Typography>
          <Typography variant="body2" sx={{ color: "#94a3b8", mb: 4 }}>Enter admin credentials to continue</Typography>

          {error && <Alert severity="error" variant="filled" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

          <Box component="form" noValidate onSubmit={handleLogin}>
            <TextField
              fullWidth label="Username" margin="normal"
              value={username} onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Person sx={{ color: "#3b82f6" }} /></InputAdornment>,
                style: { color: 'white' }
              }}
              sx={{ 
                "& .MuiOutlinedInput-root": { 
                  borderRadius: 3, bgcolor: "rgba(0,0,0,0.2)",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                  "&.Mui-focused fieldset": { borderColor: "#3b82f6" }
                },
                "& .MuiInputLabel-root": { color: "#64748b" }
              }}
            />

            <TextField
              fullWidth label="Password" type={showPassword ? "text" : "password"} margin="normal"
              value={password} onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Lock sx={{ color: "#3b82f6" }} /></InputAdornment>,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: "#64748b" }}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                style: { color: 'white' }
              }}
              sx={{ 
                "& .MuiOutlinedInput-root": { 
                  borderRadius: 3, bgcolor: "rgba(0,0,0,0.2)",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                  "&.Mui-focused fieldset": { borderColor: "#3b82f6" }
                },
                "& .MuiInputLabel-root": { color: "#64748b" }
              }}
            />

            <Button
              fullWidth variant="contained" size="large" type="submit" disabled={loading}
              sx={{ 
                mt: 4, py: 2, fontWeight: "bold", borderRadius: 3,
                bgcolor: "#3b82f6", textTransform: "none", fontSize: "1.1rem",
                "&:hover": { bgcolor: "#2563eb", boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Access Dashboard"}
            </Button>
          </Box>

          <Divider sx={{ my: 4, "&::before, &::after": { borderColor: "rgba(255,255,255,0.1)" } }}>
            <Typography variant="caption" sx={{ color: "#475569" }}>ONE-TAP ACCESS</Typography>
          </Divider>

          <Chip 
            label="Use Dummy Credentials" 
            onClick={handleDemoLogin}
            clickable
            sx={{ 
              color: "#3b82f6", border: "1px solid #3b82f6", bgcolor: "transparent", 
              fontWeight: "bold", py: 2, borderRadius: 2,
              "&:hover": { bgcolor: "rgba(59,130,246,0.1)" } 
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}