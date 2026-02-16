"use client";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: (userData, token) => {
    document.cookie = `token=${token}; path=/; max-age=86400`; 
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData, token: token, isAuthenticated: true });
  },
  logout: () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

export const useProductStore = create((set) => ({
  products: [],
  total: 0,
  loading: false,
  fetchProducts: async (limit, skip, search = "", category = "") => {
    set({ loading: true });
    try {
      let url = "";
      if (category && category !== "") {
        url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
      } else if (search) {
        url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`;
      } else {
        url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      set({ products: data.products, total: data.total, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  }
}));

export const useUserStore = create((set) => ({
  users: [],
  total: 0,
  loading: false,
  fetchUsers: async (limit, skip, search = "") => {
    set({ loading: true });
    try {
      const url = search 
        ? `https://dummyjson.com/users/search?q=${search}&limit=${limit}&skip=${skip}`
        : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
      const res = await fetch(url);
      const data = await res.json();
      set({ users: data.users, total: data.total, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
  deleteUser: (id) => {
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
      total: state.total - 1
    }));
  }
}));