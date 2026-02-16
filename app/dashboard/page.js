"use client";

import { useEffect, useState } from "react";
import { useUserStore, useProductStore } from "./store";
import { Typography, Box, Container, Paper, Collapse, Stack } from "@mui/material";
import { People, Inventory, Assessment, ShoppingBag, Storefront, TrendingUp, InfoOutlined } from "@mui/icons-material";
import Loader from "../../components/AppLoader";

export default function DashboardHome() {
  const { total: totalUsers, fetchUsers, loading: usersLoading } = useUserStore();
  const { total: totalProducts, fetchProducts, loading: productsLoading } = useProductStore();
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    fetchUsers(1, 0, "");
    fetchProducts(1, 0, "");
  }, [fetchUsers, fetchProducts]);

  const stats = [
    { 
      id: 'users', 
      label: "Total Customers", 
      value: totalUsers, 
      icon: <People />, 
      color: "#3b82f6", 
      detail: "+18% New Signups", 
      desc: "Daily active shoppers across Boys and Girls segments. Membership growth is peaking in the 18-24 age group." 
    },
    { 
      id: 'products', 
      label: "Product Catalog", 
      value: totalProducts, 
      icon: <Inventory />, 
      color: "#10b981", 
      detail: "Live Inventory", 
      desc: "Real-time stock across Men's Wear, Women's Wear, and Accessories. Categories are automatically synced with DummyJSON." 
    },
    { 
      id: 'orders', 
      label: "Recent Orders", 
      value: "1,248", 
      icon: <ShoppingBag />, 
      color: "#f59e0b", 
      detail: "95% Shipped", 
      desc: "Total orders processed this month. Includes fast-track deliveries and pending returns for the fashion category." 
    },
    { 
      id: 'revenue', 
      label: "Net Sales", 
      value: "$84,250", 
      icon: <Assessment />, 
      color: "#8b5cf6", 
      detail: "Gross Revenue", 
      desc: "Cumulative revenue from the current catalog. Performance analytics show high demand for Seasonal Collections." 
    },
  ];

  if (usersLoading || productsLoading) {
    return <Loader message="Fashion Store is syncing your inventory..." />;
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#020617", py: { xs: 2, md: 4 } }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 6 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ p: 1.5, bgcolor: "#f59e0b", borderRadius: 3, display: "flex", boxShadow: "0 0 20px rgba(245, 158, 11, 0.4)" }}>
              <Storefront sx={{ color: "white", fontSize: 32 }} />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "white", letterSpacing: -1, fontSize: { xs: "1.5rem", md: "2.125rem" } }}>
                TRENDS DASHBOARD
              </Typography>
              <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                Boys & Girls Fashion Inventory
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Box sx={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: 3,
          justifyContent: "flex-start" 
        }}>
          {stats.map((stat) => (
            <Box key={stat.id} sx={{ 
              width: { 
                xs: "100%", 
                sm: "calc(50% - 12px)", 
                md: "calc(25% - 18px)" 
              } 
            }}>
              <Paper
                elevation={0}
                onClick={() => setActiveCard(activeCard === stat.id ? null : stat.id)}
                sx={{
                  p: 3,
                  height: "100%",
                  borderRadius: 5,
                  bgcolor: activeCard === stat.id ? "#1e293b" : "#0f172a",
                  border: "1px solid",
                  borderColor: activeCard === stat.id ? stat.color : "rgba(255,255,255,0.05)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": { 
                    transform: "translateY(-5px)",
                    borderColor: stat.color,
                    boxShadow: `0 10px 30px -10px ${stat.color}60`,
                  }
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: 2.5, bgcolor: `${stat.color}15`, display: "flex", alignItems: "center", justifyContent: "center", color: stat.color }}>
                    {stat.icon}
                  </Box>
                  <TrendingUp sx={{ color: "#10b981", fontSize: 20 }} />
                </Box>
                
                <Typography variant="body2" sx={{ color: "#94a3b8", fontWeight: 600, mb: 0.5 }}>{stat.label}</Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "white", mb: 1 }}>{stat.value}</Typography>
                
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="caption" sx={{ color: stat.color, fontWeight: 700 }}>{stat.detail}</Typography>
                    <InfoOutlined sx={{ fontSize: 14, color: "#475569" }} />
                </Stack>

                <Collapse in={activeCard === stat.id}>
                  <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    <Typography variant="body2" sx={{ color: "#cbd5e1", fontSize: "0.85rem", lineHeight: 1.5 }}>
                      {stat.desc}
                    </Typography>
                  </Box>
                </Collapse>
              </Paper>
            </Box>
          ))}
        </Box>

        <Paper 
          sx={{ 
            mt: 4, 
            p: 3, 
            borderRadius: 5, 
            bgcolor: "#0f172a", 
            border: "1px solid rgba(255,255,255,0.05)",
            background: "linear-gradient(90deg, #0f172a 0%, #1e293b 100%)"
          }}
        >
          <Typography variant="subtitle1" sx={{ color: "white", fontWeight: 700, mb: 1 }}>
            Store Insights
          </Typography>
          <Typography variant="body2" sx={{ color: "#94a3b8" }}>
            Currently monitoring live shopping trends. Top categories: Men T-Shirts and Girl Accessories are seeing 25% more engagement.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}