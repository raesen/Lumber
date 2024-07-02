import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [wbs, setWBS] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedWbs, setSelectedWbs] = useState(null);

  useEffect(() => {
    fetch('/project.json')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching project.json:', error));

    fetch('/wbs.json')
      .then(response => response.json())
      .then(data => setWBS(data))
      .catch(error => console.error('Error fetching wbs.json:', error));

    fetch('/task.json')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching task.json:', error));
  }, []);

  const handleProjectClick = projectId => {
    setSelectedProject(selectedProject === projectId ? null : projectId);
  }

  const handlewbsClick =(wbsId) => {
    setSelectedWbs(selectedWbs === wbsId ? null : wbsId);
  }

  return (
    <div>
      <ul className="projects-list">
        {projects.map(project => (
          <li key={project.id}>
            <button
              className="project-button"
              onClick={() => handleProjectClick(project.id)}
            >
              {project.name}
            </button>
            {selectedProject === project.id && (
              <ul className="wbs-list">
                {wbs
                  .filter(w => w.projectId === project.id)
                  .map(wbsItem => (
                    <li key={wbsItem.id}>
                      <button
                        className="wbs-button"
                        onClick={() => handlewbsClick(wbsItem.id)}
                      >
                        {wbsItem.name}
                      </button>
                      {selectedWbs === wbsItem.id && (
                        <ul className="task-list">
                          {tasks
                            .filter(t => t.wbsId === wbsItem.id)
                            .map(task => (
                              <li key={task.id}>{task.name}</li>
                            ))}
                        </ul>
                      )}
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
