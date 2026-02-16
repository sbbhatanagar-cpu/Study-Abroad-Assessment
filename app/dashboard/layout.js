"use client";

import { Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton } from "@mui/material";
import { Dashboard, People, Inventory, Logout, School, Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "./store";
import { useState } from "react";

const drawerWidth = 260;

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const menuItems = [
    { text: "Overview", icon: <Dashboard />, path: "/dashboard" },
    { text: "Users", icon: <People />, path: "/dashboard/users" },
    { text: "Products", icon: <Inventory />, path: "/dashboard/products" },
  ];

  const drawer = (
    <Box sx={{ height: "100%", bgcolor: "#0f172a", color: "white", position: "relative" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <School sx={{ color: "#3b82f6", fontSize: 32 }} />
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: -1 }}>
            STUDY <span style={{ color: "#3b82f6" }}>ABROAD</span>
          </Typography>
        </Box>
        <IconButton
          onClick={() => setMobileOpen(false)}
          sx={{ display: { sm: "none" }, color: "#94a3b8" }}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />
      <List sx={{ px: 2, mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => {
                router.push(item.path);
                setMobileOpen(false);
              }}
              sx={{
                borderRadius: 3,
                bgcolor: pathname === item.path ? "rgba(59, 130, 246, 0.15)" : "transparent",
                color: pathname === item.path ? "#3b82f6" : "#94a3b8",
                "&:hover": { bgcolor: "rgba(255,255,255,0.05)", color: "white" },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 45 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 600 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ position: "absolute", bottom: 20, width: "100%", px: 2 }}>
        <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.05)" }} />
        <ListItemButton
          onClick={handleLogout}
          sx={{ borderRadius: 3, color: "#ef4444", "&:hover": { bgcolor: "rgba(239, 68, 68, 0.1)" } }}
        >
          <ListItemIcon sx={{ color: "inherit" }}><Logout /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", bgcolor: "#020617", minHeight: "100vh" }}>
      <AppBar position="fixed" sx={{
        display: { sm: "none" },
        bgcolor: "#0f172a",
        boxShadow: "none",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(true)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ fontWeight: 800 }}>STUDY ABROAD</Typography>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, border: "none" },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "#0f172a",
              borderRight: "1px solid rgba(255,255,255,0.05)"
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 3 },
          width: {
            xs: "100%",
            sm: `calc(100% - ${drawerWidth}px)`
          },
          mt: { xs: 8, sm: 0 },
          overflowX: "hidden",
          boxSizing: "border-box"
        }}
      >
        {children}
      </Box>
    </Box>
  );
}