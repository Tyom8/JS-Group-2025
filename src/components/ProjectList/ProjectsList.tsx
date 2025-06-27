import { useTranslation } from "react-i18next";
import closeIcon from "../../assets/icons/close.svg";
import { useAppDispatch } from "../../store/hooks";
import { deleteProject } from "../../store/projects/projectActions";
import styles from "../../styles/ProjectsList.module.css";
import ProjectForm from "./ProjectForm";
import { useAddNewProject } from "./ProjectList-hook";

function ProjectsList() {
  const {
    projects,
    showModal,
    setShowModal,
    handleAddProject,
    editById,
    handleEditProject,
    isEditMode,
    setEditById,
    setIsEditMode,
  } = useAddNewProject();

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardLeft}>
        <button
          className={styles.newProjectBtn}
          onClick={() => {setShowModal(true); setEditById(null)}}
        >
          {t("dashboardPage.project.addProjectBtn")}
        </button>

        <div className={styles.projectList}>
          {!projects.length ? (
            <p className={styles.text}>{t("dashboardPage.project.noProjectText")}</p>
          ) : (
            projects.map((project) => (
              <div key={project.id} className={styles.projectCard}>
                <div
                  className={styles.closeIcon}
                  onClick={() => {
                    dispatch(deleteProject(project.id));
                  }}
                >
                  <img src={closeIcon} alt="close icon" />
                </div>
                <div className={styles.projectImgPlaceholder}></div>
                <div className={styles.projectInfo}>
                  <div
                    className={styles.edit}
                    onClick={() => {
                      setIsEditMode(true);
                      setEditById(project.id);
                      setShowModal(true);
                    }}
                  >
                    <h4>{project.name}</h4>
                    <button className={styles.editBtn}>edit</button>
                  </div>
                  <p className={styles.description}>{project.description}</p>
                  <div className={styles.dates}>
                    <span>{project.startDate}</span>
                    <span>{project.endDate}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <ProjectForm
          handleAddProject={handleAddProject}
          setShowModal={() => setShowModal(false)}
          handleEditProject={handleEditProject}
          isEditMode={isEditMode}
          editById={editById}
          projects={projects}
        />
      )}
    </div>
  );
}

export default ProjectsList;
