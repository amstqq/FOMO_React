## To go from production to development build

1. change `process.env.variable_name` and `APIKEY` in `./server.js`, `./api/index.js`, and `./client/src/MapContainer.js` to `config.variable_name` and uncomment `import config from "config"` line.
2. note that in `webpack.config.js`, a global variable is set under plugins
3. note that in `package.json`, npm run start has been replaced by `npm run dev-start`

## To deploy on Heroku

1. https://coursework.vschool.io/deploying-mern-with-heroku/ for basic guidlines
2. Make sure the port is specified as `process.env.PORT`. Heroku dynamically assigns the application to a port using environment variable.
3.
