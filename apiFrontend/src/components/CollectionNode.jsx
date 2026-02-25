import React from "react";
import {Handle, Position} from "@xyflow/react";

const CollectionNode = ({data}) => {
  return (
    <div
      style={{
        background: "#1e1e1e",
        border: "1px solid #333",
        borderRadius: 14,
        minWidth: 260,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
      }}
    >
      {/* 🔵 Header */}
      <div
        style={{
          background: "rgb(184 34 34)",
          color: "white",
          padding: "10px 14px",
          borderBottom: "1px solid #333",
          fontWeight: "bold",
          fontSize: 14,
          letterSpacing: 1,
        }}
      >
        {data.collectionName}
      </div>

      {/* 🟢 Fields */}
      <div style={{padding: "8px 0"}}>
        {data.fields.map((field, index) => {
          const isRef =
            (field.type === "ObjectId" && field.ref) ||
            (field.type === "Array" &&
              field.itemsType === "ObjectId" &&
              field.ref);

          return (
            <div
              key={index}
              style={{
                padding: "6px 14px",
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                color: isRef ? "#4da6ff" : "#ccc",
              }}
            >
              <span>
                {field.name}
                {field.required && " *"}
              </span>

              <span style={{opacity: 0.7}}>
                {field.type === "Array" ? `[${field.itemsType}]` : field.type}
              </span>
            </div>
          );
        })}
      </div>

      {/* Handles for connections */}
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export default CollectionNode;
