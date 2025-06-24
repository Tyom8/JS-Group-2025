import { useCallback, useState } from "react";
import { IAddNewProject } from "../../types";

export const useAddNewProject = () => {
  // state to show added projects
  const [projects, setProjects] = useState<IAddNewProject[]>([]);
  // state to show new project adding form
  const [showModal, setShowModal] = useState<boolean>(false);

  // function that handles project adding
  const handleAddProject = useCallback((data: IAddNewProject) => {
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0];

    const newProject = {
      ...data,
      id: Date.now(),
      startDate: formattedDate,
      endDate: formattedDate,
    };

    setProjects((prev) => [...prev, newProject]);
    setShowModal(false);
  }, []);

  return {
    projects,
    showModal,
    setShowModal,
    handleAddProject,
  };
};
