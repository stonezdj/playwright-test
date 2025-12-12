# Playwright sample test for Harbor

## Install playwright

```bash 
# customize npm registry to Harbor if needed
# export NPM_CONFIG_REGISTRY=https://packages.vcfd.broadcom.net/artifactory/api/npm/upstream-reg-npm-virtual
npm init playwright@latest
```


## Run the test in docker container

```bash

git clone https://github.com/stonezdj/playwright-test.git

cd playwright-test

docker run -it --rm --ipc=host -v ${PWD}:/workdir -v /etc/hosts:/etc/hosts mcr.microsoft.com/playwright:v1.57.0-noble /bin/bash

cd /workdir

xvfb-run npx playwright test

#The result file can be found in the playwright-report folder
```