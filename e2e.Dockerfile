FROM mcr.microsoft.com/playwright:v1.15.0-focal

ENV TZ="Europe/Moscow"

COPY package.json yarn.lock ./
RUN yarn --ignore-engines --production=false
COPY run-tests-ci.sh test jest.e2e.config.js tsconfig.json ./

CMD ./run-tests-ci.sh
