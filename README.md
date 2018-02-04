# Electron Gitlab CI Monitor

## Startup Instructions

1. Copy `public/config-example.json` to `public/config.json` and fill in your api info and project configuration
1. `yarn install` from the root
1. `yarn run start`
1. In a new terminal window/tab, `yarn run electron`
1. When the application comes up, put `http://localhost:3000/config.json` into the config location text box

## MVP TODOs:

- [ ] Build the project more sensibly, should only need one task to run development. Probably requires ejecting CRA.

- [X] Read projects/api/refresh rate configuration from a URL

- [ ] Read projects/api/refresh rate configuration from a file

- [ ] Persist config location between app loads

- [ ] URL encode projects' path instead of using project id

- [ ] Pretty up css and orient cards well

- [ ] Add to README

- [ ] Build pipeline and unit tests

- [ ] Do not pass down fetch config as props (use React contexts maybe?)

- [ ] Standardize config names with internal names