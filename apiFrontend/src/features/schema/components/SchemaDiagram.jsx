import React, {useMemo} from "react";
import {ReactFlow, MiniMap, Controls, Background} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from "dagre";
import {useProject} from "../../../shared/store/useProject";

import CollectionNode from "./CollectionNode";

const nodeTypes = {
  collectionNode: CollectionNode,
};

const nodeWidth = 280;
const nodeHeight = 180;

const getLayoutedElements = (nodes, edges) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({
    rankdir: "LR", // Left → Right layout
    nodesep: 60,
    ranksep: 120,
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return {nodes: layoutedNodes, edges};
};

const SchemaDiagram = () => {
  const {collections} = useProject();
  const {nodes, edges} = useMemo(() => {
    if (!collections) return {nodes: [], edges: []};

    const rawNodes = collections.map((col) => ({
      id: col.collectionName,
      type: "collectionNode",
      data: {
        collectionName: col.collectionName,
        fields: col.fields,
      },
      position: {x: 0, y: 0}, // temporary
    }));

    const rawEdges = collections.flatMap((col) =>
      col.fields.flatMap((field) => {
        const isDirectRef = field.type === "ObjectId" && field.ref;

        const isArrayRef =
          field.type === "Array" && field.itemsType === "ObjectId" && field.ref;

        if (isDirectRef || isArrayRef) {
          return {
            id: `${col.collectionName}-${field.ref}-${field.name}`,
            source: col.collectionName,
            target: field.ref,
            label: field.name,
            animated: true,
            style: {stroke: "#4da6ff"},
          };
        }

        return [];
      }),
    );

    return getLayoutedElements(rawNodes, rawEdges);
  }, [collections]);

  return (
    <div style={{width: "100%", height: "700px", background: "#0f0f0f"}}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
        <Controls />
        <Background color="#444" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default SchemaDiagram;
