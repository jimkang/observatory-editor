var d3 = require('d3-selection');
var projectRoot = d3.select('#project-root');
var accessor = require('accessor')();
var normalizeObjects = require('normalize-objects')({
  defaults: {
    date: undefined
  }
});
var curry = require('lodash.curry');

function renderProjects({ projectData }) {
  normalizeObjects(projectData);
  var projects = projectRoot
    .selectAll('.project')
    .data(projectData, accessor('name'));
  projects.exit().remove();

  if (projectData.length < 1) {
    return;
  }
  var newProjects = projects
    .enter()
    .append('li')
    .classed('project', true);
  appendElementsForProjects(newProjects, projectData[0]);

  var projectsToUpdate = newProjects.merge(projects);
  var fields = Object.keys(projectData[0]);
  fields.forEach(curry(updateProjectsField)(projectsToUpdate));
}

function appendElementsForProjects(projectsSel, exampleProject) {
  for (var field in exampleProject) {
    let container = projectsSel.append('div').classed('field-container', true);
    container
      .append('div')
      .classed('field-label', true)
      .text(field);
    appendControlForValue(container, field);
  }
}

function appendControlForValue(container, field) {
  if (field === 'description') {
    container.append('textarea').attr('data-of', field);
  } else {
    container
      .append('input')
      .attr('data-of', field)
      .attr('type', 'text');
  }
}

function updateProjectsField(projectsSel, field) {
  if (field === 'description') {
    projectsSel.select(`[data-of=${field}]`).text(accessor(field));
  } else {
    projectsSel.select(`[data-of=${field}]`).attr('value', accessor(field));
  }
}

module.exports = renderProjects;
