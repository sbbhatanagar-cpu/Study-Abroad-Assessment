# 🛒 Fashion Store - Admin Dashboard
A high-performance, responsive Admin Dashboard built with **Next.js 15**, **Material UI (MUI) v6**, and **Zustand**. This project integrates the DummyJSON API for real-time authentication, user management, and product cataloging.

## 🔗 Live Repository
**GitHub Link**: [https://github.com/sbbhatanagar-cpu](https://github.com/sbbhatanagar-cpu)

## 🚀 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **UI Library**: Material UI (MUI) v6
- **State Management**: Zustand (with Async Actions)
- **API**: [DummyJSON](https://dummyjson.com/)
- **Theme**: Premium Dark UI (Dark & Electric Blue)

## 🧠 Why Zustand?
For this project, **Zustand** was chosen because:
1. **Simplicity**: Extremely minimal boilerplate compared to Redux.
2. **Small Footprint**: Keeps the application lightweight and fast.
3. **Async Logic**: Built-in support for async actions makes API integration seamless.
4. **Better for Medium Apps**: Provides a cleaner state management flow without the complexity of Redux Toolkit.

## ⚡ Performance Optimizations & Caching
- **Server-Side Pagination**: Used `limit` and `skip` API parameters to handle data efficiently.
- **Client-Side Caching**: API results are cached in the Zustand store. Navigating back from a "Details" page does not trigger a re-fetch, saving bandwidth.
- **Debounced Search**: Implemented a delay on search inputs to prevent excessive API calls.
- **MUI v6 Optimization**: Used the latest `Grid` system (`size` prop) for a clean, warning-free responsive layout.

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/sbbhatanagar-cpu.git](https://github.com/sbbhatanagar-cpu.git)
   cd [ADMIN-DASHBOARD]