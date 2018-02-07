# Electron Gitlab CI Monitor

## Startup Instructions

1. Copy `config-example.json` to `config.json` and fill in your api info and project configuration
1. `yarn install` from the root
1. `yarn run start`
1. In a new terminal window/tab, `yarn run electron`
1. When the application comes up, put `./config.json` into the config location text box

## MVP TODOs:

- [X] Build the project more sensibly, probably requires ejecting CRA.

- [X] Read projects/api/refresh rate configuration from a URL

- [X] Read projects/api/refresh rate configuration from a file

- [ ] Persist config location between app loads (electron-config)

- [ ] URL encode projects' path instead of using project id

- [ ] Pretty up css and orient cards well

- [ ] Add to README

- [ ] Build pipeline and unit tests

- [ ] Do not pass down fetch config as props (use React contexts maybe?)

- [ ] Standardize config names with internal names