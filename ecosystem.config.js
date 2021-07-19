module.exports = {
  apps: [{
    name: 'REX API',
    script: './dist/apps/rex-api/main.js',
    node_args: '-r dotenv/config --max_old_space_size=8192'
  }]
}
