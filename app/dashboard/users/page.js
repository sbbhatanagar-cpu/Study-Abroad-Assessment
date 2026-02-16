"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "../store";
import {
  Table, TableBody, TableCell, TableHead, TableRow, Button, TextField,
  Paper, TableContainer, Box, Typography, CircularProgress,
  Dialog, DialogActions,  DialogTitle,
  Snackbar, Alert, Avatar, InputAdornment, Stack, useMediaQuery, useTheme,
  IconButton
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Search, DeleteOutline, Visibility, School, NavigateBefore, NavigateNext } from "@mui/icons-material";

export default function UsersPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery("(max-width:400px)");
  
  const { users, total, loading, fetchUsers, deleteUser } = useUserStore();
  
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const limit = 10;

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (fetchUsers) fetchUsers(limit, page * limit, search);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [page, search, fetchUsers]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/users/${selectedUserId}`, { method: "DELETE" });
      if (res.ok && deleteUser) {
        deleteUser(selectedUserId);
        setSnackbar({ open: true, message: "User removed!", severity: "success" });
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Error!", severity: "error" });
    } finally { setOpenDialog(false); }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <Box sx={{ p: { xs: 1.5, sm: 2, md: 4 }, minHeight: "100vh", bgcolor: "#020617", width: "100%", overflowX: "hidden" }}>
      
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ 
            fontWeight: 800, 
            color: "white", 
            display: "flex", 
            alignItems: "center", 
            gap: 1, 
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.4rem" } 
          }}>
            <School sx={{ color: "#3b82f6", fontSize: { xs: 28, md: 40 } }} /> Users
          </Typography>
        </Box>
        
        <TextField
          fullWidth
          placeholder="Search..."
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search sx={{ color: "#3b82f6", fontSize: 20 }} /></InputAdornment>,
          }}
          sx={{ 
            bgcolor: "#0f172a", borderRadius: 3,
            "& .MuiOutlinedInput-root": { 
              color: "white", 
              "& fieldset": { borderColor: "rgba(255,255,255,0.1)" } 
            }
          }}
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0); }}
        />
      </Stack>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}><CircularProgress /></Box>
      ) : (
        <>
          {!isMobile ? (
            <TableContainer component={Paper} sx={{ bgcolor: "#0f172a", borderRadius: 4, border: "1px solid rgba(255,255,255,0.05)" }}>
              <Table>
                <TableHead sx={{ bgcolor: "rgba(59, 130, 246, 0.05)" }}>
                  <TableRow>
                    <TableCell sx={{ color: "#3b82f6", fontWeight: 700 }}>Users</TableCell>
                    <TableCell sx={{ color: "#3b82f6", fontWeight: 700 }}>EMAIL</TableCell>
                    <TableCell align="center" sx={{ color: "#3b82f6", fontWeight: 700 }}>ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} hover sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.02)" } }}>
                      <TableCell>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar src={user.image} sx={{ border: "2px solid #3b82f6" }} />
                          <Typography sx={{ color: "white", fontWeight: 600 }}>{user.firstName} {user.lastName}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ color: "#94a3b8" }}>{user.email}</TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <IconButton onClick={() => router.push(`/dashboard/users/${user.id}`)} sx={{ color: "#3b82f6" }}><Visibility /></IconButton>
                          <IconButton onClick={() => { setSelectedUserId(user.id); setOpenDialog(true); }} sx={{ color: "#ef4444" }}><DeleteOutline /></IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Stack spacing={2}>
              {users.map((user) => (
                <Paper key={user.id} sx={{ p: 2, bgcolor: "#0f172a", borderRadius: 4, border: "1px solid rgba(255,255,255,0.05)" }}>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Avatar src={user.image} sx={{ width: 45, height: 45, border: "1.5px solid #3b82f6" }} />
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography noWrap sx={{ color: "white", fontWeight: 700, fontSize: "0.95rem" }}>
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography noWrap variant="caption" sx={{ color: "#64748b", display: "block" }}>
                        {user.email}
                      </Typography>
                    </Box>
                  </Stack>
                  
                  <Stack direction={isSmallMobile ? "column" : "row"} spacing={1}>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      size="small" 
                      onClick={() => router.push(`/dashboard/users/${user.id}`)} 
                      sx={{ bgcolor: "#3b82f6", textTransform: "none", py: 1 }}
                    >
                      View Profile
                    </Button>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      color="error" 
                      size="small" 
                      onClick={() => { setSelectedUserId(user.id); setOpenDialog(true); }}
                      sx={{ textTransform: "none", py: 1 }}
                    >
                      Delete
                    </Button>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          )}
        </>
      )}

      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ mt: 4 }}>
        <IconButton disabled={page === 0} onClick={() => setPage(p => p - 1)} sx={{ color: "white" }}><NavigateBefore /></IconButton>
        <Typography sx={{ color: "white", fontSize: "0.9rem" }}>{page + 1} / {totalPages || 1}</Typography>
        <IconButton disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)} sx={{ color: "white" }}><NavigateNext /></IconButton>
      </Stack>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} PaperProps={{ sx: { bgcolor: "#0f172a", color: "white", borderRadius: 3, mx: 2 } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Deletion</DialogTitle>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: "#94a3b8" }}>No</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Yes, Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ width: '100%', borderRadius: 2 }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}