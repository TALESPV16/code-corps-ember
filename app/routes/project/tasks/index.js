import Ember from 'ember';

const {
  get,
  inject: { service },
  Route
 } = Ember;

export default Route.extend({
  projectTaskBoard: service(),

  model() {
    return this.modelFor('project');
  },

  setupController(controller, project) {
    controller.setProperties({ project });
  },

  actions: {
    didTransition() {
      this._super(...arguments);
      get(this, 'projectTaskBoard').activate();
      return true;
    },

    willTransition() {
      this._super(...arguments);
      get(this, 'projectTaskBoard').deactivate();
      return true;
    },

    transitionToTask(task) {
      let project = get(task, 'project');
      let organizationSlug = get(project, 'organization.slug');
      let projectSlug = get(project, 'slug');
      let taskNumber = get(task, 'number');
      this.transitionTo('project.tasks.task', organizationSlug, projectSlug, taskNumber);
    }
  }
});
