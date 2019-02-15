var d3 = require('d3-selection');
//var of = require('object-form');

var listenersInit = false;
//var objectFromDOM = of.ObjectFromDOM({});

function wireControls({ loadProjectsFlow }) {
  if (listenersInit) {
    return;
  }
  listenersInit = true;

  d3.select('#projects-file').on('change', onProjectsFileChange);

  var file = getFile();
  if (file) {
    loadFile(file);
  }

  function onProjectsFileChange() {
    var file = this.files[0];
    loadFile(file);
  }

  function loadFile(file) {
    if (file && file.type.startsWith('application/json')) {
      let reader = new FileReader();
      reader.onload = passContentsToFlow;
      reader.readAsText(file);
    }
  }

  function passContentsToFlow(e) {
    var projects;
    try {
      projects = JSON.parse(e.target.result);
    } catch (error) {
      console.error(error);
      throw new Error('Could not read project file.');
    }
    if (projects) {
      loadProjectsFlow({ projects });
    }
  }
}

function getFile() {
  var files = document.getElementById('projects-file').files;

  var file;
  if (files.length > 0) {
    file = files[0];
  }
  return file;
}

module.exports = wireControls;
