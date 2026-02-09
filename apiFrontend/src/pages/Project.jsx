import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import api from "../api/axios.js";
import CollectionList from "../components/CollectionList.jsx";
import CollectionForm from "../components/CollectionsForm.jsx";
import GeneratedFile from "../components/GeneratedFile.jsx";

const Project = () => {
  const {projectId} = useParams();
  const [collections, setCollections] = useState([]);
  const [files, setFiles] = useState([]);

  const fetchCollections = async () => {
    const res = await api.get(`collection/getCollection/${projectId}`);
    setCollections(res.data.data);
  };

  useEffect(() => {
    const fetchGeneratedFiles = async () => {
      const res = await api.get(`/generated-files/${projectId}`);
      setFiles(res.data.files);
    };
    const fetchCollections = async () => {
      const res = await api.get(`collection/getCollection/${projectId}`);
      setCollections(res.data.data);
    };
    fetchCollections();
    fetchGeneratedFiles();
  }, [projectId]);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-100 py-14 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Manage Collections
          </h1>
          <p className="text-gray-500 mt-2">
            Organize and manage your project collections efficiently
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 border border-gray-100">
          <h2 className="text-xl font-semibold text-indigo-600 mb-6">
            Create New Collection
          </h2>
          <CollectionForm projectId={projectId} onCreated={fetchCollections} />
        </div>

        {/* List Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-indigo-600 mb-6">
            Your Collections
          </h2>
          <CollectionList collections={collections} />

          <h2 className="text-2xl font-bold mt-16 mb-6">
            Generated Backend Files
          </h2>

          <GeneratedFile files={files} />
        </div>
      </div>
    </div>
  );
};

export default Project;
