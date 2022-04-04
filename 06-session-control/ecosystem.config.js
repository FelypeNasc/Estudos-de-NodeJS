module.exports = {
  apps : [{
    name   : "Frontend",
    cwd    : "frontend",
    script : "app.js",
    watch  : true,
  },
  {
    name   : "Backend",
    cwd    : "backend",
    script : "server.js",
    watch  : true,
  }]
}
