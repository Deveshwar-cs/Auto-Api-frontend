import React from "react";

const CollectionList = ({collections}) => {
  if (!collections.length) {
    return (
      <p className="text-gray-500 mt-10 text-center">
        No collections created yet.
      </p>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-12">
      {collections.map((col) => (
        <div
          key={col._id}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6"
        >
          {/* Collection Name */}
          <h3 className="text-xl font-semibold text-indigo-600 mb-4">
            {col.collectionName}
          </h3>

          {/* Fields Table */}
          <div className="overflow-hidden rounded-lg border border-gray-100">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium">Field</th>
                  <th className="px-4 py-2 font-medium">Type</th>
                  <th className="px-4 py-2 font-medium">Required</th>
                </tr>
              </thead>
              <tbody>
                {col.fields.map((f, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-4 py-2 font-medium text-gray-700">
                      {f.name}
                    </td>
                    <td className="px-4 py-2 text-gray-600">{f.type}</td>
                    <td className="px-4 py-2">
                      {f.required ? (
                        <span className="text-green-600 font-medium">Yes</span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectionList;
