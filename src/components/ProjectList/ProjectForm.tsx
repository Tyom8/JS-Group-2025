import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFormValidation } from "../../hooks/FormValidation-hook";
import styles from "../../styles/ProjectsList.module.css";
import { IAddNewProject } from "../../types";

interface IProjectListProps {
  handleAddProject: (data: IAddNewProject) => void;
  setShowModal: (value: boolean) => void;
  handleEditProject?: (
    id: number,
    name: string,
    description: string,
    startDate: string,
    endDate: string
  ) => void;
  isEditMode?: boolean;
  editById: number | null;
  projects: IAddNewProject[];
}

const ProjectForm: React.FC<IProjectListProps> = ({
  handleAddProject,
  setShowModal,
  handleEditProject,
  isEditMode = false,
  editById,
  projects = [],
}) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useFormValidation<IAddNewProject>();

  const { t } = useTranslation();

  useEffect(() => {
    if (isEditMode && editById !== null) {
      const projectToEdit = projects.find((proj) => proj.id === editById);
      if (projectToEdit) {
        reset({
          name: projectToEdit.name,
          description: projectToEdit.description,
        });
      }
    }
  }, [isEditMode, editById, reset, projects]);

  const onSubmit = (data: IAddNewProject) => {
    if (isEditMode && handleEditProject && editById !== null) {
      const projectToEdit = projects.find((proj) => proj.id === editById);
      if (projectToEdit) {
        handleEditProject(
          editById,
          data.name,
          data.description,
          projectToEdit.startDate,
          projectToEdit.endDate
        );
      }
    } else {
      handleAddProject(data);
    }

    reset();
    setShowModal(false);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
          ×
        </button>
        <div className={styles.modalBody}>
          <div className={styles.modalLeftImg} />
          <div className={styles.modalForm}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder={t(
                  "dashboardPage.project.formContent.projectNamePlaceholder"
                )}
                {...register("name", {
                  required: {
                    value: true,
                    message: "Project name is required",
                  },
                })}
              />
              {errors?.name?.message && (
                <p className={styles.error}>{errors.name.message}</p>
              )}
              <textarea
                placeholder={t(
                  "dashboardPage.project.formContent.projectDescriptionPlaceholder"
                )}
                {...register("description", {
                  required: {
                    value: true,
                    message: "Project description is required",
                  },
                })}
              />
              {errors?.description?.message && (
                <p className={styles.error}>{errors.description.message}</p>
              )}
              <button className={styles.submitBtn}>
                {t("dashboardPage.project.formContent.saveProjectBtn")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
