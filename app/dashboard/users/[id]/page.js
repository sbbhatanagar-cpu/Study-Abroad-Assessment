"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Container, Button, Typography, Paper, Box, Avatar, 
  Divider, Grid, CircularProgress, Stack, IconButton, Chip 
} from "@mui/material";
import { ArrowBack, Email, Phone, LocationOn, Verified } from "@mui/icons-material";

export default function UserProfile() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/users/${id}`).then(res => res.json()).then(data => setUser(data));
  }, [id]);

  if (!user) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 20 }}><CircularProgress sx={{color: '#3b82f6'}}/></Box>;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#020617", pb: 6 }}>
      {/* 1. Hero / Cover Section */}
      <Box sx={{ height: { xs: 140, md: 220 }, background: "linear-gradient(90deg, #1e293b 0%, #3b82f6 100%)", position: 'relative' }}>
        <IconButton 
          onClick={() => router.push("/dashboard/users")}
          sx={{ position: 'absolute', top: 20, left: 20, bgcolor: 'rgba(0,0,0,0.3)', color: 'white', '&:hover': {bgcolor: 'rgba(0,0,0,0.5)'} }}
        >
          <ArrowBack />
        </IconButton>
      </Box>

      <Container maxWidth="md" sx={{ mt: { xs: -6, md: -10 }, position: 'relative', zIndex: 2 }}>
        <Paper elevation={0} sx={{ p: { xs: 2.5, md: 5 }, borderRadius: 6, bgcolor: "#0f172a", border: "1px solid rgba(255,255,255,0.05)", color: "white" }}>
          
          {/* 2. Top Profile Header */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems={{ xs: "center", md: "flex-end" }} sx={{ mb: 4 }}>
            <Avatar 
              src={user.image} 
              sx={{ width: { xs: 120, md: 140 }, height: { xs: 120, md: 140 }, border: "6px solid #0f172a", boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }} 
            />
            <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" }, pb: 1, minWidth: 0, width: '100%' }}>
              <Stack direction="row" spacing={1} alignItems="center" justifyContent={{ xs: "center", md: "flex-start" }}>
                <Typography variant="h4" sx={{ fontWeight: 800, fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
                   {user.firstName} {user.lastName}
                </Typography>
                <Verified sx={{ color: "#3b82f6", fontSize: 24 }} />
              </Stack>
              <Typography sx={{ color: "#94a3b8", fontWeight: 500, fontSize: '0.9rem' }}>
                 @{user.username} • {user.company?.title}
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ mb: 4, borderColor: "rgba(255,255,255,0.1)" }} />

          {/* 3. Info Grid */}
          <Grid container spacing={4}>
            {/* Left Column: Bio & Social */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>About</Typography>
              <Typography sx={{ color: "#cbd5e1", lineHeight: 1.7, mb: 3, fontSize: '0.95rem' }}>
                Passionate {user.company?.title} currently working at {user.company?.name}. Expert in handling complex systems and building scalable solutions.
              </Typography>
              
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Contact Information</Typography>
              <Stack spacing={2.5}>
                {/* --- EMAIL FIX HERE --- */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, color: "#94a3b8" }}>
                  <Email fontSize="small" sx={{ mt: 0.3 }} /> 
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      wordBreak: "break-all", // Isse email container se bahar nahi jayega
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                      lineHeight: 1.5
                    }}
                  >
                    {user.email}
                  </Typography>
                </Box>
                {/* ---------------------- */}

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: "#94a3b8" }}>
                  <Phone fontSize="small" /> 
                  <Typography variant="body2">{user.phone}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, color: "#94a3b8" }}>
                  <LocationOn fontSize="small" sx={{ mt: 0.3 }} /> 
                  <Typography variant="body2">{user.address?.city}, {user.address?.state}</Typography>
                </Box>
              </Stack>
            </Grid>

            {/* Right Column: Department Card */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Box sx={{ p: 3, bgcolor: "#1e293b", borderRadius: 4, border: "1px solid rgba(255,255,255,0.05)" }}>
                <Typography variant="subtitle2" sx={{ color: "#94a3b8", mb: 2, textTransform: 'uppercase', letterSpacing: 1 }}>
                  Department
                </Typography>
                <Chip 
                  label={user.company?.department} 
                  sx={{ bgcolor: "#3b82f620", color: "#3b82f6", fontWeight: 700, borderRadius: 1.5, px: 1 }} 
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}