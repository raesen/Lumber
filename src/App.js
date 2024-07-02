import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [wbs, setWBS] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [openProjects, setOpenProjects] = useState([]);
  const [openWbsItems, setOpenWbsItems] = useState([]);

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

  const toggleProject = projectId => {
    if (openProjects.includes(projectId)) {
      setOpenProjects(openProjects.filter(id => id !== projectId));
    } else {
      setOpenProjects([...openProjects, projectId]);
    }
  };

  const toggleWbsItem = wbsId => {
    if (openWbsItems.includes(wbsId)) {
      setOpenWbsItems(openWbsItems.filter(id => id !== wbsId));
    } else {
      setOpenWbsItems([...openWbsItems, wbsId]);
    }
  };

  return (
    <div>
      <ul className="projects-list">
        {projects.map(project => (
          <li key={project.id}>
            <button
              className="project-button"
              onClick={() => toggleProject(project.id)}
            >
              {project.name}
            </button>
            {openProjects.includes(project.id) && (
              <ul className="wbs-list">
                {wbs
                  .filter(w => w.projectId === project.id)
                  .map(wbsItem => (
                    <li key={wbsItem.id}>
                      <button
                        className="wbs-button"
                        onClick={() => toggleWbsItem(wbsItem.id)}
                      >
                        {wbsItem.name}
                      </button>
                      {openWbsItems.includes(wbsItem.id) && (
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
