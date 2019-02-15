var renderDownloadLink = require('render-dl-link');
function saveProjectsFlow({ projects }) {
  renderDownloadLink({
    blob: new Blob([JSON.stringify(arrangeProjectsIntoDict(projects), null, 2)], {type: 'application/json' }),
    parentSelector: '#save-section',
    downloadLinkText: 'Download the projects file',
    filename: 'projects.json'
  });  
}

function arrangeProjectsIntoDict(projects) {
  var dict = {};
  projects.forEach(addToDict);
  return dict;

  function addToDict(project) {
    dict[project.name] = project;
  }
}

module.exports = saveProjectsFlow;
