var renderProjects = require('../dom/render-projects');

function loadProjectsFlow({ projects }) {
  renderProjects({ projectData: Object.values(projects) });
}

module.exports = loadProjectsFlow;
