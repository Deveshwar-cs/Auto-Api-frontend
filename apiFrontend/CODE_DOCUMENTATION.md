# API Frontend - Complete Code Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Core Configuration Files](#core-configuration-files)
5. [Entry Point & App Setup](#entry-point--app-setup)
6. [Routing System](#routing-system)
7. [API & Services](#api--services)
8. [State Management](#state-management)
9. [Authentication Module](#authentication-module)
10. [Layouts & UI Components](#layouts--ui-components)
11. [Key Utilities & Helpers](#key-utilities--helpers)
12. [Features Overview](#features-overview)

---

## Project Overview

**Project Name:** AutoAPI Frontend  
**Purpose:** A comprehensive web application for building, managing, and testing APIs automatically.  
**Tech:** React 18.2 + Vite + TypeScript (ESLint configured)  
**Deployment:** Vercel  
**Backend:** Hosted on Render (https://auto-api-backend.onrender.com)

---

## Technology Stack

### Core Dependencies
```json
{
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "react-router-dom": "^7.13.0",
  "vite": "^7.2.4"
}
```

### State Management & Utils
- **Zustand** (^5.0.11) - Lightweight state management
- **Axios** (^1.13.4) - HTTP client with interceptors
- **Socket.io-client** (^4.8.3) - Real-time communication

### UI & Styling
- **Tailwind CSS** (^4.1.18) - Utility-first CSS framework
- **Lucide React** (^0.574.0) - Icon library
- **Motion** (^12.34.3) - Animation library
- **GSAP** (^3.14.2) - Advanced animation framework

### Special Libraries
- **@xyflow/react** (^12.10.0) - Node-based UI graphs
- **reactflow** (^11.11.4) - Flow diagrams
- **dagre** (^0.8.5) - Graph layout library
- **react-syntax-highlighter** (^16.1.0) - Code highlighting
- **@react-oauth/google** (^0.13.4) - Google OAuth authentication
- **@studio-freight/lenis** (^1.0.42) - Smooth scrolling

### Development Tools
- **Vite** - Fast build tool
- **ESLint** - Code linting
- **@tailwindcss/vite** - Tailwind integration

---

## Project Structure

```
src/
├── app/
│   └── router.jsx                    # Main routing configuration
├── components/
│   └── ui/                           # Reusable UI components
│       ├── EmptyState.jsx
│       ├── PageHeader.jsx
│       ├── SectionCard.jsx
│       └── StatCard.jsx
├── features/
│   ├── auth/                         # Authentication module
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   └── images/
│   ├── landing/                      # Landing page module
│   │   ├── components/
│   │   ├── pages/
│   │   │   └── LandingPage.jsx
│   │   └── images/
│   ├── docs/                         # Documentation module
│   │   ├── components/
│   │   └── pages/
│   │       └── Docs.jsx
│   └── project/                      # Main project management
│       ├── components/               # Project components
│       ├── pages/                    # Project pages
│       ├── services/                 # API services
│       └── store/                    # Zustand stores
├── layouts/
│   ├── DashboardLayout.jsx          # Main dashboard layout
│   ├── Sidebar.jsx                   # Navigation sidebar
│   └── Topbar.jsx                    # Top navigation bar
├── services/
│   └── api.js                        # Axios configuration
├── shared/
│   ├── components/
│   │   └── DeleteModal.jsx
│   └── store/                        # Shared context & stores
├── utils/
│   └── downloadFile.js               # File download utility
├── App.jsx
├── main.jsx                          # React DOM entry
├── socket.js                         # Socket.io setup
└── index.css
```

---

## Core Configuration Files

### 1. **vite.config.js** - Build Configuration
```javascript
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

**Details:**
- Uses React Fast Refresh for HMR
- Integrates Tailwind CSS v4 via Vite plugin
- Optimized for development and production builds

### 2. **package.json** - Project Dependencies
```json
{
  "name": "apifrontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

**Available Scripts:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### 3. **tailwind.config.js** - Tailwind Configuration
Custom color schemes and design tokens configured for the dark theme.

### 4. **vercel.json** - Deployment Configuration
Configured for automatic deployment on Vercel.

---

## Entry Point & App Setup

### 1. **src/main.jsx** - React Root Entry
```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import DeleteProvider from "./shared/store/DeleteProvider.jsx";
import DeleteModal from "./shared/components/DeleteModal.jsx";
import {GoogleOAuthProvider} from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="27057986801-5i6fa4h624mq0dla3k106hd94cnhm6b7.apps.googleusercontent.com">
      <DeleteProvider>
        <App />
        <DeleteModal />
      </DeleteProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
```

**Key Features:**
- **GoogleOAuthProvider** - Wraps app for Google authentication
- **DeleteProvider** - Context provider for delete confirmations
- **DeleteModal** - Global delete confirmation modal
- React Strict Mode enabled for development checks

### 2. **src/App.jsx** - Root App Component
```javascript
import AppRouter from "./app/router";

const App = () => {
  return <AppRouter />;
};

export default App;
```

Simple wrapper that renders the routing system.

### 3. **src/socket.js** - Socket.io Configuration
```javascript
import {io} from "socket.io-client";
const token = localStorage.getItem("token");
const socket = io("https://auto-api-backend.onrender.com", {
  auth: {
    token,
  },
});

export default socket;
```

**Details:**
- Connects to WebSocket server for real-time updates
- Authenticates using JWT token from localStorage
- Used for live notifications and project updates

---

## Routing System

### **src/app/router.jsx** - Main Route Configuration
```javascript
import {
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import LandingPage from "../features/landing/pages/LandingPage";

import DashboardLayout from "../layouts/DashboardLayout";

import Overview from "../features/project/pages/Overview";
import Projects from "../features/project/pages/Projects";
import ProjectWorkspace from "../features/project/pages/ProjectWorkspace";
import FilesTab from "../features/project/components/FilesTab";
import CollectionsTab from "../features/project/components/CollectionTab";
import DocsTab from "../features/project/components/DocsTab";
import SettingsTab from "../features/project/components/SettingsTab";
import SettingsPage from "../features/project/pages/SettingsPage";

import Docs from "../features/docs/page/Docs";
import ApiTesterTab from "../features/project/components/ApiTesterTab.jsx";

const AppRouter = () => {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/docs",
      element: <Docs />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <Overview />,
        },
        {
          path: "Projects",
          element: <Projects />,
        },
        {
          path: "settings",
          element: <SettingsPage />,
        },
        {
          path: "projects/:projectId",
          element: <ProjectWorkspace />,
          children: [
            {
              index: true,
              element: <CollectionsTab />,
            },
            {
              path: "files",
              element: <FilesTab />,
            },
            {
              path: "docs",
              element: <DocsTab />,
            },
            {
              path: "apiTesting",
              element: <ApiTesterTab />,
            },
            {
              path: "settings",
              element: <SettingsTab />,
            },
          ],
        },
      ],
    },
  ]);
  
  return (
    <>
      <RouterProvider router={route} />
    </>
  );
};

export default AppRouter;
```

**Route Structure:**
```
/                           → LandingPage
/docs                       → Documentation
/register                   → User Registration
/login                      → User Login
/dashboard                  → Main Dashboard Layout
  ├── /dashboard            → Overview
  ├── /dashboard/Projects   → Projects List
  ├── /dashboard/settings   → Global Settings
  └── /dashboard/projects/:projectId  → Project Workspace
      ├── (default)         → Collections Tab
      ├── /files            → Files Tab
      ├── /docs             → Documentation Tab
      ├── /apiTesting       → API Tester Tab
      └── /settings         → Project Settings
```

---

## API & Services

### 1. **src/services/api.js** - Axios Configuration
```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "https://auto-api-backend.onrender.com/api",
  // baseURL: "http://localhost:5001/api",
});

// Request Interceptor - Add JWT Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response Interceptor - Handle Errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // redirect to login
      window.location.href = "/login";
    }

    alert(message);
    throw error;
  },
);

export default api;
```

**Features:**
- **Base URL:** Production backend on Render.com
- **Request Interceptor:** Automatically attaches JWT token
- **Response Interceptor:** Handles 401 errors by clearing token and redirecting to login
- **Error Handling:** Shows alert messages from backend

### 2. **src/features/project/services/projectApi.js** - Project API Endpoints
```javascript
import api from "../../../services/api";

export const getProjects = () => api.get("/projects");

export const createProjectApi = (data) =>
  api.post("/projects/createProject", data);

export const deleteProjectApi = (projectId) =>
  api.delete(`/projects/${projectId}`);

export const updateProjectApi = (projectId, data) =>
  api.put(`/projects/update/${projectId}`, data);
```

**API Endpoints:**
- `GET /projects` - Fetch all projects
- `POST /projects/createProject` - Create new project
- `DELETE /projects/:projectId` - Delete project
- `PUT /projects/update/:projectId` - Update project

---

## State Management

### 1. **src/features/project/store/useProjectStore.js** - Project Store (Zustand)
```javascript
import {create} from "zustand";
import {
  getProjects,
  createProjectApi,
  deleteProjectApi,
  updateProjectApi,
} from "../services/projectApi";

const useProjectStore = create((set) => ({
  projects: [],
  loading: false,

  // 🔹 FETCH
  fetchProjects: async () => {
    set({loading: true});
    try {
      const res = await getProjects();
      set({projects: res.data});
    } catch (err) {
      console.error("Fetch projects failed:", err);
    } finally {
      set({loading: false});
    }
  },

  // 🔹 CREATE
  createProject: async (data) => {
    const res = await createProjectApi(data);
    set((state) => ({
      projects: [res.data, ...state.projects],
    }));
  },

  // 🔹 DELETE
  deleteProject: async (projectId) => {
    await deleteProjectApi(projectId);
    set((state) => ({
      projects: state.projects.filter((p) => p._id !== projectId),
    }));
  },

  // 🔹 UPDATE
  updateProject: async (projectId, data) => {
    try {
      const res = await updateProjectApi(projectId, data);
      set((state) => ({
        projects: state.projects.map((p) =>
          p._id === projectId ? res.data.project : p,
        ),
      }));
    } catch (err) {
      console.error("Update failed:", err);
    }
  },

  // 🥇 COLLECTION COUNT MANAGEMENT
  incrementCollectionCount: (projectId) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p._id === projectId
          ? {...p, collectionsCount: p.collectionsCount + 1}
          : p,
      ),
    })),

  decrementCollectionCount: (projectId) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p._id === projectId
          ? {...p, collectionsCount: p.collectionsCount - 1}
          : p,
      ),
    })),
}));

export default useProjectStore;
```

**Store Actions:**
- `fetchProjects()` - Load all projects from API
- `createProject(data)` - Create and add new project
- `deleteProject(id)` - Delete project from state and API
- `updateProject(id, data)` - Update project
- `incrementCollectionCount(id)` - Increment collection counter
- `decrementCollectionCount(id)` - Decrement collection counter

### 2. **src/features/project/store/useNotificationStore.js** - Notifications Store
```javascript
import {create} from "zustand";
import api from "../../../services/api";

const useNotificationStore = create((set) => ({
  notifications: [],
  
  fetchNotifications: async () => {
    const res = await api.get("/notifications");
    set({notifications: res.data});
  },
  
  markAsRead: async (id) => {
    await api.put(`/notifications/${id}/read`);
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n._id === id ? {...n, read: true} : n,
      ),
    }));
  },
  
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
}));

export default useNotificationStore;
```

**Store Actions:**
- `fetchNotifications()` - Get all notifications
- `markAsRead(id)` - Mark notification as read
- `addNotification(notification)` - Add new notification to store

### 3. **src/features/project/store/useDashboardStore.js** - Dashboard Store
Manages dashboard state and analytics.

### 4. **src/features/project/store/useSettingStore.js** - Settings Store
Manages user and project settings.

---

## Authentication Module

### **src/features/auth/pages/Login.jsx** - Login Component
```javascript
import React, {useState} from "react";
import api from "../../../services/api";
import {useNavigate, Link} from "react-router-dom";
import bg from "../images/bg2.jpg";
import icon from "../../landing/image/icon.svg";
import {GoogleLogin} from "@react-oauth/google";

const Login = () => {
  const [formData, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Google OAuth Handler
  const handleGoogleLogin = async (credentialResponse) => {
    if (!credentialResponse?.credential) return;

    try {
      const res = await api.post("/auth/google", {
        token: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Google login failed");
    }
  };

  // ✅ Input Change Handler
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row text-white"
      style={{background: "var(--color-slate-950)"}}
    >
      {/* LEFT IMAGE */}
      <div className="hidden lg:flex w-1/2 relative">
        <img
          src={bg}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />

        <div className="absolute top-8 left-8 flex items-center gap-2">
          <img src={icon} alt="logo" className="w-6 h-6" />
          <h1 className="text-xl font-bold">AutoAPI</h1>
        </div>
      </div>

      {/* RIGHT LOGIN PANEL */}
      <div className="flex items-center justify-center w-full lg:w-1/2 px-4 py-10">
        <div className="w-full max-w-md bg-slate-900/70 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8">
          {/* HEADER */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
              <p className="text-gray-400">Sign in to your account</p>
            </div>
          </div>

          {/* GOOGLE LOGIN */}
          <div className="mb-6">
            <GoogleLogin onSuccess={handleGoogleLogin} onError={() => {
              alert("Google login failed");
            }} />
          </div>

          {/* DIVIDER */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900/70 text-gray-400">Or continue with email</span>
            </div>
          </div>

          {/* LOGIN FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-center text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
```

**Features:**
- Email/password login
- Google OAuth integration
- Form validation
- Loading states
- Error handling with alerts

### **src/features/auth/pages/Register.jsx**
Similar structure to Login, handles user registration with:
- Name, email, password inputs
- Password confirmation
- Google OAuth option

---

## Layouts & UI Components

### 1. **src/layouts/DashboardLayout.jsx** - Main Dashboard Layout
```javascript
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import {Outlet} from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-[#0D0716] text-white">
      <Sidebar />

      <div className="flex flex-col flex-1 min-h-0">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
```

**Layout Structure:**
- Sidebar (navigation)
- Topbar (header with user profile)
- Main content area (Outlet for nested routes)

### 2. **src/layouts/Sidebar.jsx** - Navigation Sidebar
Contains navigation links and project menu.

### 3. **src/layouts/Topbar.jsx** - Top Navigation Bar
Displays user info, notifications, and settings.

### 4. **src/shared/store/DeleteProvider.jsx** - Delete Context Provider
```javascript
import {useState} from "react";
import DeleteContext from "./DeleteContext";

const DeleteProvider = ({children}) => {
  const [deleteState, setDeleteState] = useState(null);

  const openDelete = ({title, message, onConfirm}) => {
    setDeleteState({title, message, onConfirm});
  };

  const closeDelete = () => setDeleteState(null);
  
  return (
    <DeleteContext.Provider value={{deleteState, openDelete, closeDelete}}>
      {children}
    </DeleteContext.Provider>
  );
};

export default DeleteProvider;
```

**Features:**
- Global delete confirmation modal
- Context-based state management
- Simple API: `openDelete({title, message, onConfirm})`

### 5. **src/shared/components/DeleteModal.jsx**
Renders the delete confirmation modal globally.

---

## Key Utilities & Helpers

### 1. **src/utils/downloadFile.js** - File Download Utility
```javascript
export const downloadFile = (fileName, code) => {
  const blob = new Blob([code], {type: "text/plain"});
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();

  window.URL.revokeObjectURL(url);
};
```

**Usage:**
- Downloads files (text, code, etc.) to user's computer
- Creates blob, generates download link, triggers download

### 2. **src/shared/store/useDelete.js** - Delete Context Hook
Custom hook to use delete context easily:
```javascript
const {openDelete} = useDelete();
openDelete({
  title: "Delete Project",
  message: "Are you sure?",
  onConfirm: () => handleDelete()
});
```

### 3. **src/shared/store/useProject.js** - Project Context Hook
Helper hook for project operations:
```javascript
const {
  addCollection,
  updateCollection,
  fetchCollections
} = useProject();
```

---

## Important Components Overview

### 1. **Collection Management**
- **CollectionForm.jsx** - Create/edit collections with fields
- **CollectionTab.jsx** - Display all collections
- **CollectionModal.jsx** - Modal for collection operations
- **FieldRow.jsx** - Individual field editor

```javascript
// CollectionForm.jsx - Excerpt
const emptyField = {
  name: "",
  type: "String",
  required: false,
  enum: "",
  ref: "",
  itemsType: "String",
};

const CollectionForm = ({onSuccess, collection}) => {
  const {projectId} = useParams();
  const {addCollection, updateCollection, fetchCollections} = useProject();

  const [collectionName, setCollectionName] = useState(
    collection?.collectionName || "",
  );

  const [isProtected, setIsProtected] = useState(collection?.protect || false);

  const [fields, setFields] = useState(() => {
    if (collection?.fields?.length) {
      return collection.fields.map((f) => ({
        ...f,
        enum: Array.isArray(f.enum) ? f.enum.join(", ") : "",
      }));
    }
    return [{...emptyField}];
  });

  const [loading, setLoading] = useState(false);

  // Convert enum string → array
  const parseEnum = (value) => {
    const arr = value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    return arr.length ? arr : undefined;
  };

  // Field change handler
  const handleChange = (i, key, value) => {
    setFields((prev) => {
      const updated = [...prev];
      updated[i] = {...updated[i], [key]: value};
      return updated;
    });
  };
};
```

### 2. **API Testing**
- **ApiTesterTab.jsx** - API testing interface
- **ApiResponseViewer.jsx** - Display API responses
- **ApiAuthSection.jsx** - Authentication setup
- **ApiTesterUtils.js** - Testing utilities

```javascript
// ApiTesterUtils.js - Complete file
export const METHOD_COLORS = {
  GET: "text-green-400 bg-green-500/10 border-green-500/30",
  POST: "text-blue-400 bg-blue-500/10 border-blue-500/30",
  PUT: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
  DELETE: "text-red-400 bg-red-500/10 border-red-500/30",
};

export const AUTH_ENDPOINTS = [
  {
    label: "Login",
    method: "POST",
    path: "/api/auth/login",
    fields: ["email", "password"],
  },
  {
    label: "Register",
    method: "POST",
    path: "/api/auth/register",
    fields: ["name", "email", "password"],
  },
];

export const getEndpoints = (collectionName) => {
  const name = collectionName?.toLowerCase();
  const Name = collectionName?.charAt(0).toUpperCase() + collectionName?.slice(1);
  
  return [
    {
      label: `Get All ${Name}s`,
      method: "GET",
      path: `/api/${name}`,
      hasBody: false,
      hasId: false,
    },
    {
      label: `Get ${Name} by ID`,
      method: "GET",
      path: `/api/${name}/:id`,
      hasBody: false,
      hasId: true,
    },
    {
      label: `Create ${Name}`,
      method: "POST",
      path: `/api/${name}`,
      hasBody: true,
      hasId: false,
    },
    {
      label: `Update ${Name}`,
      method: "PUT",
      path: `/api/${name}/:id`,
      hasBody: true,
      hasId: true,
    },
    {
      label: `Delete ${Name}`,
      method: "DELETE",
      path: `/api/${name}/:id`,
      hasBody: false,
      hasId: true,
    },
  ];
};

export const inputCls = `w-full bg-[#241A40] border border-purple-800/30 rounded-lg
  px-4 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-purple-600`;

export const makeRequest = async ({url, method, headers, body}) => {
  const start = Date.now();
  const res = await fetch(url, {method, headers, body});
  const time = Date.now() - start;
  
  let data;
  try {
    data = await res.json();
  } catch {
    data = {message: "Non-JSON response"};
  }
  
  return {status: res.status, ok: res.ok, data, time};
};

export const extractToken = (data) =>
  data?.token || data?.data?.token || data?.accessToken || null;
```

### 3. **Project Components**
- **ProjectForm.jsx** - Create/edit projects
- **ProjectList.jsx** - Display all projects
- **ProjectCard.jsx** - Individual project card
- **ProjectModal.jsx** - Project management modal

### 4. **Settings & Profile**
- **SettingsTab.jsx** - Project settings
- **ProfileTab.jsx** - User profile management
- **AppearanceTab.jsx** - Theme settings
- **SecurityTab.jsx** - Security settings

### 5. **Documentation**
- **Docs.jsx** - Main documentation page
- **Introduction.jsx** - Getting started
- **QuickStart.jsx** - Quick start guide
- **APIswagger.jsx** - API Swagger display
- **Authentication.jsx** - Auth documentation
- **BestPractices.jsx** - Best practices guide
- **Deployement.jsx** - Deployment guide
- **Error.jsx** - Error reference
- **FAQSection.jsx** - FAQ

### 6. **Landing Page**
- **LandingPage.jsx** - Marketing landing page
- **Hero.jsx** - Hero section
- **Features.jsx** - Features showcase
- **Pricing.jsx** - Pricing plans
- **FAQ.jsx** - FAQ section
- **Testimonials.jsx** - User testimonials
- **CTA.jsx** - Call-to-action section
- **Footer.jsx** - Footer component
- **Navbar.jsx** - Navigation bar

### 7. **UI Components**
- **EmptyState.jsx** - Empty state display
- **PageHeader.jsx** - Page header
- **SectionCard.jsx** - Card wrapper
- **StatCard.jsx** - Statistics display

---

## Features Overview

### 1. **Project Management**
- Create/edit/delete projects
- Track collection counts
- Project settings and configuration

### 2. **API Collection Builder**
- Define API collections with fields
- Support for various data types (String, Number, Boolean, Date, etc.)
- Field validation rules
- Enum support for restricted values
- Protected collections
- Relationships (references)

### 3. **API Testing**
- Test built APIs in-browser
- Support for GET, POST, PUT, DELETE methods
- Custom headers and authentication
- Request/response viewing
- Response time tracking

### 4. **File Management**
- Upload and manage project files
- Download code files
- File organization by type

### 5. **Documentation**
- Auto-generated API documentation
- Swagger integration
- Best practices guide
- Quick start tutorials

### 6. **Settings**
- User profile management
- Project-specific settings
- Security configuration
- Theme customization

### 7. **Real-time Updates**
- WebSocket connection for live updates
- Notification system
- Real-time collection sync

### 8. **Authentication**
- Email/password login and registration
- Google OAuth integration
- JWT token management
- Secure token storage

---

## Development Workflow

### Starting Development
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# The app runs on http://localhost:5173
```

### Building for Production
```bash
# Build optimized production version
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
# (Automatic with Git push)
```

### Code Quality
```bash
# Run ESLint
npm run lint

# Fix linting issues
npm run lint -- --fix
```

---

## Key Implementation Patterns

### 1. **State Management with Zustand**
```javascript
// Create store
const useStore = create((set) => ({
  state: initialValue,
  action: () => set({state: newValue})
}));

// Use in component
const {state, action} = useStore();
```

### 2. **API Request with Axios**
```javascript
// Automatic token attachment
// Automatic error handling with alerts
// Automatic 401 redirect
```

### 3. **Context API for Global Features**
```javascript
// Delete confirmation
// Project context
// Notification center
```

### 4. **Component Composition**
```javascript
// Modular, reusable components
// Layout-based structure
// Feature-based organization
```

### 5. **Responsive Design**
```javascript
// Tailwind CSS utilities
// Mobile-first approach
// Flexbox and grid layouts
```

---

## Security Considerations

1. **JWT Token Storage** - Stored in localStorage (consider httpOnly cookies for production)
2. **Request Interception** - Automatic token attachment to all requests
3. **401 Handling** - Automatic logout and redirect on unauthorized access
4. **Google OAuth** - Secure OAuth token exchange with backend
5. **Protected Collections** - Collections can be marked as protected
6. **CORS** - Backend handles CORS for frontend requests

---

## Performance Optimizations

1. **Vite** - Lightning-fast build tool
2. **React Fast Refresh** - Instant updates during development
3. **Code Splitting** - Route-based code splitting with React Router
4. **Lazy Loading** - Components lazy loaded when needed
5. **Image Optimization** - Optimized image assets in public folder
6. **CSS** - Tailwind CSS purges unused styles

---

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires ES2020+ support
- Mobile responsive design

---

## Troubleshooting

### Common Issues

**1. "401 Unauthorized" errors**
- Check if token is stored in localStorage
- Verify backend is running
- Check token expiration

**2. CORS errors**
- Ensure backend allows frontend origin
- Check API base URL in `src/services/api.js`

**3. WebSocket connection issues**
- Verify Socket.io server is running
- Check token in socket connection

**4. Build errors**
- Run `npm install` to ensure all dependencies
- Clear `node_modules` and reinstall if needed

---

## Future Enhancements

1. **TypeScript Migration** - Add full TypeScript support
2. **Testing** - Unit and integration tests with Vitest
3. **Error Boundaries** - Error boundary components
4. **Offline Support** - Service workers for offline functionality
5. **Advanced Analytics** - Usage analytics dashboard
6. **Rate Limiting UI** - Visual rate limit indicators
7. **API Versioning** - Support multiple API versions
8. **GraphQL Support** - Query builder for GraphQL APIs

---

## Contact & Support

For issues, feature requests, or questions:
- Backend: https://auto-api-backend.onrender.com
- Documentation: `/docs` route
- Support: [Add your support email]

---

**Last Updated:** 2026-07-05  
**Project Status:** Active Development  
**Version:** 0.0.0
