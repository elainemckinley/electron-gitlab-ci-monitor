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

- [X] Persist config location between app loads (electron-config)

- [X] Use correct Gitlab API (Should track pipelines instead of jobs)

- [X] URL encode projects' path instead of using project id

- [X] Pretty up css and orient cards well

- [ ] Add to README

- [ ] Build pipeline and unit tests

- [ ] Do not pass down fetch config as props (use React contexts maybe?)

- [X] Standardize config names with internal names

- [X] Do not use browser fetch to avoid CORS issues on self-hosted gitlab

- [ ] Add error messaging to Config page

- [ ] Add error messaging to Projects page