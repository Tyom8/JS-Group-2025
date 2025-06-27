import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getProjects,
  getProjects as getProjectsAction,
  updateProject as updateProjectAction,
} from "../../store/projects/projectActions";
import { IAddNewProject } from "../../types";

export const useAddNewProject = () => {
  // state to show added projects
  // const [projects, setProjects] = useState<IAddNewProject[]>([]);
  const projects = useAppSelector((state) => state.project.projects);
  const dispatch = useAppDispatch();
  // state to show new project adding form
  const [showModal, setShowModal] = useState<boolean>(false);
  // state to make edit mode on
  const [isEditMode, setIsEditMode] = useState<boolean>(true);
  // state to edit by id
  const [editById, setEditById] = useState<number | null>(null);
  // state to edit inputValue
  const [editInputValue, setEditInputValue] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const storedData = localStorage.getItem("projects");
      if (storedData) {
        const parsedProjects = JSON.parse(storedData);
        dispatch(getProjectsAction(parsedProjects));
      }
    };

    getData();
  }, []);

  // function that handles project adding
  const handleAddProject = useCallback((data: IAddNewProject) => {
    data.id = Date.now();
    const updated = [...projects, data];
    dispatch(getProjects(updated));
    localStorage.setItem("projects", JSON.stringify(updated));
  }, []);



  const handleEditProject = useCallback(
    (
      id: number,
      newTitle: string,
      newDescription: string,
      newStartDate: string,
      newEndDate: string
    ) => {
      const updatedProjects = projects.map((project) =>
        project.id === id
          ? {
              ...project,
              name: newTitle,
              description: newDescription,
              startDate: newStartDate,
              endDate: newEndDate,
            }
          : project
      );

      dispatch(getProjects(updatedProjects));
      localStorage.setItem("projects", JSON.stringify(updatedProjects));

      const updatedProject = updatedProjects.find((p) => p.id === id);
      if (updatedProject) {
        dispatch(updateProjectAction(updatedProject));
      }

      setIsEditMode(true);
      setEditById(null);
    },
    [projects, dispatch]
  );

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
    setEditInputValue,
  };
};
