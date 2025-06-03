import React, { useState } from 'react';
import './ProjectsList.css';

function ProjectsList() {
const [projects, setProjects] = useState([]);
const [showModal, setShowModal] = useState(false);
const [newProject, setNewProject] = useState({
name: '',
description: '',
startDate: '',
endDate: '',
});

const handleAddProject = () => {
const now = new Date();
const formattedDate = now.toISOString().split('T')[0];

const projectToAdd = {
...newProject,
id: Date.now(),
startDate: formattedDate,
endDate: formattedDate,
};

setProjects([...projects, projectToAdd]);
setShowModal(false);
setNewProject({ name: '', description: '', startDate: '', endDate: '' });
};

return (
<div className="dashboard">
<div className="dashboard-left">
<button className="new-project-btn" onClick={() => setShowModal(true)}>
+ New Project
</button>

<div className="project-list">
{projects.map((project, index) => (
<div key={project.id} className="project-card">
<div className="project-img-placeholder" />
<div className="project-info">
<h4>{project.name}</h4>
<p>{project.description}</p>
<div className="dates">
<span>{project.startDate}</span>
<span>{project.endDate}</span>
</div>
</div>
</div>
))}
</div>
</div>

{showModal && (
<div className="modal-overlay">
<div className="modal">
<button className="close-btn" onClick={() => setShowModal(false)}>×</button>
<div className="modal-body">
<div className="modal-left-img" />
<div className="modal-form">
<input
type="text"
placeholder="Project name"
value={newProject.name}
onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
/>
<textarea
placeholder="Project description"
value={newProject.description}
onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
/>
<button className="submit-btn" onClick={handleAddProject}>
Save Project
</button>
</div>
</div>
</div>
</div>
)}
</div>
);
}

export default ProjectsList;