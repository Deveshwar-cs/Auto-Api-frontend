import React, {useEffect, useState, useMemo, useCallback} from "react";
import {useParams} from "react-router-dom";
import api from "../api/axios";
import ProjectContext from "./ProjectContext";

const ProjectProvider = ({children}) => {
  const {projectId} = useParams();

  const [collections, setCollections] = useState([]);
  const [files, setFiles] = useState([]);

  // -------- stable functions --------
  const fetchCollections = useCallback(async () => {
    if (!projectId) return;

    const res = await api.get(`collection/getCollection/${projectId}`);
    setCollections(res.data.data);
  }, [projectId]);

  const fetchGeneratedFiles = useCallback(async () => {
    if (!projectId) return;

    const res = await api.get(`/generated-files/${projectId}`);
    setFiles(res.data.files);
  }, [projectId]);

  const deleteCollection = useCallback(
    async (collectionId) => {
      try {
        await api.delete(`/collection/${projectId}/delete/${collectionId}`);
        await fetchCollections();
        await fetchGeneratedFiles();
      } catch (err) {
        console.log(err);
      }
    },
    [projectId, fetchCollections, fetchGeneratedFiles],
  );

  // -------- initial load --------
  useEffect(() => {
    if (!projectId) return;

    const loadData = async () => {
      try {
        await Promise.all([fetchCollections(), fetchGeneratedFiles()]);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, [projectId, fetchCollections, fetchGeneratedFiles]);

  // -------- stable context value --------
  const value = useMemo(
    () => ({
      projectId,
      collections,
      files,
      fetchCollections,
      fetchGeneratedFiles,
      deleteCollection,
      setCollections,
    }),
    [
      collections,
      files,
      fetchCollections,
      fetchGeneratedFiles,
      projectId,
      deleteCollection,
      setCollections,
    ],
  );

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export default ProjectProvider;
