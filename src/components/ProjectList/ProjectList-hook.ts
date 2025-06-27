import { useCallback, useState } from "react";
import { IAddNewProject } from "../../types";

export const useAddNewProject = () => {
  // state to show added projects
  const [projects, setProjects] = useState<IAddNewProject[]>([]);
  // state to show new project adding form
  const [showModal, setShowModal] = useState<boolean>(false);
  // state to make edit mode on
  const [isEditMode, setIsEditMode] = useState<boolean>(true);
  // state to edit by id
  const [editById, setEditById] = useState<number | null>(null);
  // state to edit inputValue
  const [editInputValue, setEditInputValue] = useState<string>("");

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

  const handleEditProject = useCallback(
    (
      id: number,
      newTitle: string,
      newDescription: string,
      newStartDate: string,
      newEndDate: string
    ) => {
     setProjects((prev: IAddNewProject[]) =>
      prev.map((item: IAddNewProject) => 
        id === item.id ? {
          ...item, 
          name: newTitle, 
          description: newDescription, 
          startDate: newStartDate, 
          endDate: newEndDate
        } : item
      ) 
    )
    setIsEditMode(true);
    setEditById(null);
    }, []);

  return {
    projects,
    showModal,
    setShowModal,
    handleAddProject,
    handleEditProject,
    isEditMode, 
    setIsEditMode, 
    editById, 
    setEditById,
    editInputValue, 
    setEditInputValue
  };
};
