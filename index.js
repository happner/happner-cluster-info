module.exports = Info;


function Info() {
  this.interval = null;
}

Info.prototype.start = function ($happn, callback) {

  if (!$happn._mesh) {
    return callback(new Error($happn.name + ' requires accessLevel: mesh'));
  }

  this.interval = setInterval(function () {

    this.__emitInfo($happn);

  }.bind(this), 1000);

  callback();

};


Info.prototype.stop = function ($happn, callback) {

  clearInterval(this.interval);

  callback();

};


Info.prototype.__emitInfo = function ($happn) {

  var meshName = $happn.info.mesh.name;
  var configVersion = $happn._mesh.config.version;
  var components = [];

  Object.keys($happn.exchange)
    .forEach(function (componentName) {

      if (componentName == meshName) return;

      components.push({
        name: componentName,
        version: $happn.exchange[componentName].__version
      });

    });

  $happn.emit('peer/info', {
    name: meshName,
    version: configVersion,
    components: components
  });

};
