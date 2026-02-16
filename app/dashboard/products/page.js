"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "../store";
import { useRouter } from "next/navigation";
import {
  Grid, 
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Box,
  CircularProgress,
  Paper,
  Stack,
  Chip
} from "@mui/material";

export default function ProductsPage() {
  const router = useRouter();
  const { products, total, loading, fetchProducts } = useProductStore();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("laptops"); 
  const [categories, setCategories] = useState([]);

  const productsPerPage = 8;

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProducts(productsPerPage, page * productsPerPage, search, category);
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [page, search, category, fetchProducts]);

  const totalPages = Math.ceil((total || 0) / productsPerPage);

  if (loading && products.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', bgcolor: "#020617" }}>
        <CircularProgress sx={{ color: "#3b82f6" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#020617", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ fontWeight: 800, color: "white", mb: 4 }}>
        Fashion Store 📦
      </Typography>

      <Paper elevation={0} sx={{ p: 2, mb: 4, bgcolor: "#0f172a", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 3 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            fullWidth
            placeholder="Search products..."
            size="small"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCategory(""); setPage(0); }}
            sx={{ 
              bgcolor: "#1e293b", borderRadius: 2, 
              "& .MuiOutlinedInput-root": { color: "white", "& fieldset": { border: "none" } } 
            }}
          />
          <TextField
            select
            fullWidth
            size="small"
            SelectProps={{ native: true }}
            value={category}
            onChange={(e) => { setCategory(e.target.value); setSearch(""); setPage(0); }}
            sx={{ 
              bgcolor: "#1e293b", borderRadius: 2, minWidth: { sm: 220 },
              "& .MuiOutlinedInput-root": { color: "white", "& fieldset": { border: "none" } } 
            }}
          >
            <option value="" style={{ background: "#0f172a" }}>All Categories</option>
            {categories.map((cat) => (
              <option key={cat.slug || cat} value={cat.slug || cat} style={{ background: "#0f172a" }}>
                {cat.name || cat}
              </option>
            ))}
          </TextField>
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        {products.map((p) => (
          <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              bgcolor: "#0f172a", 
              borderRadius: 4, 
              border: "1px solid rgba(255,255,255,0.05)",
              transition: "transform 0.2s ease-in-out",
              "&:hover": { transform: "translateY(-8px)", borderColor: "#3b82f6" }
            }}>
              <Box sx={{ p: 2, position: 'relative' }}>
                <Box sx={{ bgcolor: '#1e293b', borderRadius: 3, p: 2, display: 'flex', justifyContent: 'center' }}>
                  <CardMedia 
                    component="img" 
                    image={p.thumbnail} 
                    sx={{ height: 160, width: '100%', objectFit: 'contain' }} 
                  />
                </Box>
                <Chip 
                  label={`$${p.price}`} 
                  size="small"
                  sx={{ position: 'absolute', top: 30, right: 30, bgcolor: "#3b82f6", color: "white", fontWeight: 800 }} 
                />
              </Box>
              
              <CardContent sx={{ flexGrow: 1, pt: 0, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle1" sx={{ color: "white", fontWeight: 700, mb: 1, minHeight: '3rem', overflow: 'hidden' }}>
                  {p.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#94a3b8", mb: 2, minHeight: '2.5rem', overflow: 'hidden' }}>
                  {p.description.slice(0, 60)}...
                </Typography>
                <Box sx={{ mt: 'auto' }}>
                  <Button 
                    fullWidth variant="contained" 
                    onClick={() => router.push(`/dashboard/products/${p.id}`)}
                    sx={{ bgcolor: "#1e293b", color: "white", borderRadius: 2, textTransform: 'none', "&:hover": { bgcolor: "#3b82f6" } }}
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 8, pb: 4 }}>
        <Button 
          variant="contained" 
          disabled={page === 0 || loading} 
          onClick={() => { setPage(p => p - 1); window.scrollTo(0,0); }} 
          sx={{ bgcolor: "#1e293b" }}
        >
          Prev
        </Button>
        <Typography sx={{ color: "white", fontWeight: 600 }}>{page + 1} / {totalPages || 1}</Typography>
        <Button 
          variant="contained" 
          disabled={page >= totalPages - 1 || loading} 
          onClick={() => { setPage(p => p + 1); window.scrollTo(0,0); }} 
          sx={{ bgcolor: "#1e293b" }}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
}