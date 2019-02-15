var RouteState = require('route-state');
var handleError = require('handle-error-web');
var wireControls = require('./dom/wire-controls');
var loadProjectsFlow = require('./flows/load-projects-flow');
var saveProjectsFlow = require('./flows/save-projects-flow');

var routeState = RouteState({
  followRoute,
  windowObject: window
});

(function go() {
  window.onerror = reportTopLevelError;
  routeState.routeFromHash();
})();

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}

function followRoute() {
  wireControls({
    addToRoute: routeState.addToRoute,
    loadProjectsFlow,
    saveProjectsFlow
  });
}
