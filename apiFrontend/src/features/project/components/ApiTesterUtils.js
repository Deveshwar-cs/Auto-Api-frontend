// ─── Method badge colors ──────────────────────────────────────────────────────
export const METHOD_COLORS = {
  GET: "text-green-400 bg-green-500/10 border-green-500/30",
  POST: "text-blue-400 bg-blue-500/10 border-blue-500/30",
  PUT: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
  DELETE: "text-red-400 bg-red-500/10 border-red-500/30",
};

// ─── Auth endpoints (Login / Register) ───────────────────────────────────────
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

// ─── Generate CRUD endpoints from a collection name ──────────────────────────
export const getEndpoints = (collectionName) => {
  const name = collectionName?.toLowerCase();
  const Name =
    collectionName?.charAt(0).toUpperCase() + collectionName?.slice(1);
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

// ─── Shared input class ───────────────────────────────────────────────────────
export const inputCls = `w-full bg-[#241A40] border border-purple-800/30 rounded-lg
  px-4 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-purple-600`;

// ─── Make a fetch request and return { status, ok, data, time } ──────────────
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

// ─── Extract token from any common response shape ─────────────────────────────
export const extractToken = (data) =>
  data?.token || data?.data?.token || data?.accessToken || null;
