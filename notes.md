## To go from production to development build

1. Run `npm run dev-start` instead of `npm run start`.

## To deploy on Heroku

1. https://coursework.vschool.io/deploying-mern-with-heroku/ for basic guidlines
2. Setting up env vars:
   - First note that express server is started before webpack.config.js is run and compile all react code. Therefore, if a global variable is defined in webpack.config.js under plugins, express server and api server cannot have access to it.
   - Make sure the port is specified as `process.env.PORT`. Heroku dynamically assigns the application to a port using this environment variable. You should not assign a port environment variable in Heroku but let Heroku dynamically assign it itself.
   - `npm install dotenv` install dotenv. Dotenv allows us to define a file called `.env` in root directory and access environmental variables using `process.env` later.
   - Create a `.env` file with all the environmental vars
   - Go through the server side files first (server.js, api.js). If a env var is used (ie. mongodb id), then `require("dotenv").config()` and replace the env var with `process.env.var_name`.
   - If any env var is used in client side, go to webpack.config.js. Add `require("dotenv").config()` at the top and add inside module.export after module add
     plugins: [
     new webpack.DefinePlugin({
     API_KEY: JSON.stringify(process.env.API_KEY)
     })
     ]
     Then, if the api key is used in front end, simply use the global var API_KEY. Note that `dotenv` package CANNOT be used in frontend. Must use this method.
3. The `.env` file in root directory will be gitignored. In Heroku, define env vars with the same variable name. When this app is run in Heroku, it would not be able to find a `.env` file and therefore uses Heroku's env vars.
4. Configure package.json
   - Make sure all packages are installed under `dependencies`. No package should be installed as `dev-dependency` (ie. yarn install --dev ).
   - Add under scripts:
     "scripts": {
     "start": "babel-node server.js",
     "dev-start": "nodemon --exec babel-node server.js --ignore public/",
     "dev-build": "webpack -wd",
     "heroku-postbuild": "npm install && webpack -p"
     }
     `heroku-postbuild` is executed by heroku during its building process. `start` is used by heroku to run the server. Note that `nodemon` should ONLY be used in development. In production use `babel-node` to run the server.
   - After it, add
     "engines": {
     "node": "8.9.2"
     }
5. Click deploy in Heroku website after creating an app and connect to project git repository.
