const DocsTab = () => {
  return (
    <div className="space-y-6 text-slate-800 dark:text-white">
      <h2 className="text-xl font-semibold">API Documentation</h2>

      <div className="bg-white dark:bg-[#1B1330] border border-slate-200 dark:border-purple-900/20 p-4 rounded-lg shadow-sm dark:shadow-none">
        <p className="text-sm text-slate-600 dark:text-gray-400">Base URL</p>
        <code className="text-purple-400">https://api.yourapp.com/v1</code>
      </div>

      <div className="bg-white dark:bg-[#1B1330] border border-slate-200 dark:border-purple-900/20 p-4 rounded-lg shadow-sm dark:shadow-none">
        <p className="text-sm text-slate-600 dark:text-gray-400 mb-2">
          Authentication
        </p>
        <code>Authorization: Bearer TOKEN</code>
      </div>

      <div className="bg-white dark:bg-[#1B1330] border border-slate-200 dark:border-purple-900/20 p-4 rounded-lg shadow-sm dark:shadow-none">
        <p className="text-sm text-slate-600 dark:text-gray-400 mb-3">
          Endpoints
        </p>

        <ul className="space-y-2 text-sm">
          <li>GET /users</li>
          <li>POST /users</li>
          <li>GET /users/:id</li>
          <li>PUT /users/:id</li>
          <li>DELETE /users/:id</li>
        </ul>
      </div>
    </div>
  );
};

export default DocsTab;
