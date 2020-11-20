const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

module.exports = {
  webpack: function(config, env) {
    config.resolve.plugins = config.resolve.plugins.filter(
      plugin => !(plugin instanceof ModuleScopePlugin)
    );

    return config;
  }
};
