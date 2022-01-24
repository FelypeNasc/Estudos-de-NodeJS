module.exports = {
    apps: [
      {
        script: 'backend/server.js',
        cwd: 'backend',
        name: 'Backend',
        watch: true
      },
      {
        script: 'frontend/app.js',
        cwd: 'frontend',
        name: 'Frontend',
        watch: true
      }
    ]
  }