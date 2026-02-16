"use client";

import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loader({ message = "STUDY ABROAD is fetching data..." }) {
  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "100vh", 
        width: "100%",
        gap: 3,
        bgcolor: "#f8fafc" // Light background
      }}
    >
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        {/* Bahar ka spinning circle */}
        <CircularProgress size={100} thickness={2} sx={{ color: '#1e3a8a' }} />
        {/* Andar ka static text */}
        <Box
          sx={{
            top: 0, left: 0, bottom: 0, right: 0,
            position: 'absolute', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e3a8a' }}>
            SA
          </Typography>
        </Box>
      </Box>
      
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: "600", color: "#1e3a8a", mb: 1 }}>
          {message}
        </Typography>
        {/* Chhoti loading bar animation */}
        <Box sx={{ width: '200px', height: '3px', bgcolor: '#e2e8f0', borderRadius: 2, position: 'relative', overflow: 'hidden', mx: 'auto' }}>
          <Box sx={{ 
            width: '60px', height: '100%', bgcolor: '#3b82f6', 
            position: 'absolute', animation: 'moveLoader 1.5s infinite ease-in-out' 
          }} />
        </Box>
      </Box>

      <style jsx>{`
        @keyframes moveLoader {
          0% { left: -60px; }
          100% { left: 200px; }
        }
      `}</style>
    </Box>
  );
}