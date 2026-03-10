const DocsTab = () => {
  return (
    <div className="space-y-6 text-white">
      <h2 className="text-xl font-semibold">API Documentation</h2>

      <div className="bg-[#1B1330] border border-purple-900/20 p-4 rounded-lg">
        <p className="text-sm text-gray-400">Base URL</p>
        <code className="text-purple-400">https://api.yourapp.com/v1</code>
      </div>

      <div className="bg-[#1B1330] border border-purple-900/20 p-4 rounded-lg">
        <p className="text-sm text-gray-400 mb-2">Authentication</p>
        <code>Authorization: Bearer TOKEN</code>
      </div>

      <div className="bg-[#1B1330] border border-purple-900/20 p-4 rounded-lg">
        <p className="text-sm text-gray-400 mb-3">Endpoints</p>

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
