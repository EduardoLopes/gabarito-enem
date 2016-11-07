var app = './app';
var dist = './dist';

module.exports = {
  dir: {
    app: app,
    dist: dist
  },
  filesToCopy: [
    app + '/*.png',
    app + '/favicon.ico',
    app + '/humans.txt',
    app + '/robots.txt'
  ]
};
