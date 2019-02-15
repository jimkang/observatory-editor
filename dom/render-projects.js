var d3 = require('d3-selection');
var projectRoot = d3.select('#project-root');
var accessor = require('accessor')();
var normalizeObjects = require('normalize-objects')({
  defaults: {
    date: undefined
  }
});
var curry = require('lodash.curry');
var fieldsThatShouldRenderAsJSON = require('../fields-that-should-render-as-JSON');

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
  // Move 'name' to the front.
  var fields = Object.keys(exampleProject);
  fields.splice(fields.indexOf('name'), 1);
  fields.sort();
  fields.unshift('name');
  fields.forEach(appendElementsForField);

  function appendElementsForField(field) {
    let container = projectsSel.append('div').classed('field-container', true);
    container
      .append('div')
      .classed('field-label', true)
      .text(field);
    appendControlForValue(container, field, typeof exampleProject[field]);
  }
}

function appendControlForValue(container, field, valueType) {
  if (field === 'description') {
    container.append('textarea').attr('data-of', field);
  } else {
    let input = container.append('input').attr('data-of', field);

    if (valueType === 'boolean') {
      input.attr('type', 'checkbox');
    } else {
      input.attr('type', 'text');
    }
  }
}

function updateProjectsField(projectsSel, field) {
  if (field === 'description') {
    projectsSel.select(`[data-of=${field}]`).text(accessor(field));
  } else {
    projectsSel
      .select(`[data-of=${field}]`)
      .attr('value', curry(getValueForField)(field))
      .each(curry(setChecked)(field));
  }
}

// If this field has a boolean value and that value is true, then
// checked should be set on the element.
function setChecked(field, project) {
  var value = project[field];
  if (value && typeof value === 'boolean') {
    this.setAttribute('checked', null);
  }
}

function getValueForField(field, project) {
  if (fieldsThatShouldRenderAsJSON.indexOf(field) === -1) {
    return project[field];
  } else {
    return JSON.stringify(project[field]);
  }
}

module.exports = renderProjects;
