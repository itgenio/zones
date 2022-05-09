var fs = Npm.require('fs');
var path = Npm.require('path');

Package.describe({
  name: 'itgenio:zones',
  summary: 'Zone.Js integration for meteor',
  version: "1.6.1",
  git: "https://github.com/itgenio/zones.git"
});

Package.onUse(function (api) {
  addPackageFiles(api);
  api.export('Zones', 'server');
});

Package.onTest(function (api) {
  addPackageFiles(api);

  api.use([
    'tinytest',
    'test-helpers',
  ], 'client');

  api.addFiles([
    'tests/_both.js'
  ], ['client', 'server']);

  api.addFiles([
    'tests/_server.js'
  ], 'server');

  api.addFiles([
    'tests/loader.js',
    'tests/reporters.js',
    'tests/hijacks/methods.js',
    'tests/hijacks/subscriptions.js',
    'tests/hijacks/collections.js',
  ], 'client');
});

function addPackageFiles(api) {
  api.versionsFrom('METEOR@2.0');
  api.use('meteorhacks:inject-initial@1.0.0', ['server']);

  api.addAssets([
    'assets/utils.js',
    'assets/before.js',
    'assets/zone.js',
    'assets/after.js',
    'assets/reporters.js',
    'assets/tracer.js',
  ], 'client');

  api.addFiles(['server/inject.js'], 'server');

  api.addFiles([
    'client/hijack.js'
  ], 'client');

  api.use('underscore', 'client');
  api.use('ui@1.0.13', 'client');
  api.use('templating@1.0.9', 'client');
  api.use('deps', 'client');
  api.use('session', 'client');
  api.use('livedata', 'client');
  api.use('minimongo', 'client');
}

//--------------------------------------------------------------------------\\

function meteorRoot() {
  var currentDir = process.cwd();
  while (currentDir) {
    var newDir = path.dirname(currentDir);
    if (isAppDir(currentDir)) {
      break;
    } else if (newDir === currentDir) {
      return null;
    } else {
      currentDir = newDir;
    }
  }
  return currentDir;
}

function isAppDir(filepath) {
  try {
    return fs.statSync(path.join(filepath, '.meteor', 'packages')).isFile();
  } catch (e) {
    return false;
  }
}
