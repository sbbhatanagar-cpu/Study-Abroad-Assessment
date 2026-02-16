"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Button,
  Typography,
  Paper,
  Box,
  Grid,
  CircularProgress,
  Rating,
  Chip,
  Stack
} from "@mui/material";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', bgcolor: "#020617" }}>
        <CircularProgress sx={{ color: "#3b82f6" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#020617", py: 4 }}>
      <Container>
        <Button
          variant="contained"
          onClick={() => router.push("/dashboard/products")}
          sx={{
            mb: 4,
            bgcolor: "#1e293b",
            color: "white",
            border: "1px solid rgba(255,255,255,0.1)",
            "&:hover": { bgcolor: "#3b82f6" },
            textTransform: 'none',
            borderRadius: 2
          }}
        >
          &lt; Back to Products
        </Button>

        <Paper elevation={0} sx={{ p: { xs: 2, md: 5 }, borderRadius: 6, bgcolor: "#0f172a", border: "1px solid rgba(255,255,255,0.05)" }}>
          <Grid container spacing={6}>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  p: 4,
                  bgcolor: '#1e293b',
                  borderRadius: 6,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: "1px solid rgba(255,255,255,0.05)",
                  height: '100%'
                }}
              >
                <Box
                  component="img"
                  src={product.thumbnail}
                  alt={product.title}
                  sx={{ width: '100%', maxWidth: 450, height: 'auto', borderRadius: '16px', objectFit: 'contain' }}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="overline" sx={{ color: "#3b82f6", fontWeight: 800, letterSpacing: 1.5 }}>
                    {product.category.toUpperCase()}
                  </Typography>
                  <Typography variant="h3" sx={{ color: "white", fontWeight: 800, mt: 1, fontSize: { xs: '2.2rem', md: '3.2rem' }, lineHeight: 1.2 }}>
                    {product.title}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Rating value={product.rating || 0} readOnly precision={0.5} sx={{ color: "#fbbf24" }} />
                  <Typography variant="body1" sx={{ color: "#64748b", fontWeight: 600 }}>({product.rating} Reviews)</Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, my: 2 }}>
                  <Typography variant="h3" sx={{ color: "#3b82f6", fontWeight: 800, lineHeight: 1 }}>
                    ${product.price}
                  </Typography>
                  <Typography sx={{ textDecoration: 'line-through', color: '#475569', fontSize: '1.2rem', fontWeight: 500 }}>
                    ${(product.price * 1.2).toFixed(2)}
                  </Typography>
                </Box>

                <Typography variant="body1" sx={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.15rem' }}>
                  {product.description}
                </Typography>

                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  <Chip
                    label={product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
                    sx={{
                      bgcolor: product.stock > 0 ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)",
                      color: product.stock > 0 ? "#4ade80" : "#f87171",
                      fontWeight: 700,
                      px: 1
                    }}
                  />
                  <Chip
                    label={`Brand: ${product.brand || 'Premium'}`}
                    variant="outlined"
                    sx={{ color: "white", borderColor: "#334155", fontWeight: 600 }}
                  />
                </Stack>

                <Box sx={{ pt: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      py: 2,
                      bgcolor: "#3b82f6",
                      borderRadius: 3,
                      fontWeight: 800,
                      fontSize: '1.1rem',
                      textTransform: 'none',
                      boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
                      "&:hover": { bgcolor: "#2563eb", transform: 'scale(1.02)' },
                      transition: 'all 0.2s'
                    }}
                  >
                    Feature Available Soon
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}