var renderDownloadLink = require('render-dl-link');

var fieldsThatShouldRenderAsJSON = require('../fields-that-should-render-as-JSON');

function saveProjectsFlow({ projects }) {
  projects.forEach(convertJSONFieldsToObjects);
  var projectsDict = arrangeProjectsIntoDict(projects);
  renderDownloadLink({
    blob: new Blob([JSON.stringify(projectsDict, null, 2)], {
      type: 'application/json'
    }),
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

function convertJSONFieldsToObjects(project) {
  fieldsThatShouldRenderAsJSON.forEach(convertJSONFieldToObject);

  function convertJSONFieldToObject(field) {
    var value = project[field];
    if (value && typeof value === 'string') {
      project[field] = JSON.parse(value);
    } else {
      // Defaulting to array instead of object.
      project[field] = [];
    }
  }
}

module.exports = saveProjectsFlow;
