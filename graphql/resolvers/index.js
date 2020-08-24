const authResolver = require('./auth');
const projectsResolver = require('./projects');
const resumeResolver = require('./resume');

const rootResolver = {
  ...authResolver,
  ...projectsResolver,
  ...resumeResolver
};

module.exports = rootResolver;