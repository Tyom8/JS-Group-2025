import { useFormValidation } from "../../hooks/FormValidation-hook";
import styles from "../../styles/ProjectsList.module.css";
import { IAddNewProject } from "../../types";
import { useAddNewProject } from "./ProjectList-hook";

function ProjectsList() {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useFormValidation<IAddNewProject>();

  const { projects, showModal, setShowModal, handleAddProject } = useAddNewProject();

  const onSubmit = (data: IAddNewProject) => {
    handleAddProject(data);
    reset();
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardLeft}>
        <button
          className={styles.newProjectBtn}
          onClick={() => setShowModal(true)}
        >
          + New Project
        </button>

        <div className={styles.projectList}>
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className={styles.projectImgPlaceholder} />
              <div className={styles.projectInfo}>
                <h4>{project.name}</h4>
                <p>{project.description}</p>
                <div className={styles.dates}>
                  <span>{project.startDate}</span>
                  <span>{project.endDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button
              className={styles.closeBtn}
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <div className={styles.modalBody}>
              <div className={styles.modalLeftImg} />
              <div className={styles.modalForm}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="text"
                    placeholder="Project name"
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
                    placeholder="Project description"
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
                  <button className={styles.submitBtn}>Save Project</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectsList;
