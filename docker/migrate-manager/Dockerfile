FROM node:alpine

RUN apk update && apk add --no-cache git

WORKDIR /usr/docolate
COPY . /usr/docolate

RUN npm i -g

WORKDIR /usr/migrate-manager

RUN mkdir /tmp/mock-git
COPY ./examples/migrate-manager/docolate-migrate /tmp/mock-git/migrate-manager
COPY ./examples/migrate-manager/docolate-migrate.yml /tmp/mock-git/migrate-manager/docolate-migrate.yml
COPY ./docker/migrate-manager/mock-git/1.0.0 /tmp/mock-git/1.0.0
COPY ./docker/migrate-manager/mock-git/1.1.0 /tmp/mock-git/1.1.0

RUN git config --global user.email "mock@migrate-manager"
RUN git config --global user.name "migrate-manager"

RUN git init

RUN cp -r /tmp/mock-git/1.0.0/* /usr/migrate-manager/

RUN git add . && git commit -m "v1.0.0" && git tag 1.0.0

RUN cp -rf /tmp/mock-git/1.1.0/* /usr/migrate-manager/

RUN git add . && git commit -m "v1.1.0" && git tag 1.1.0

RUN cp -r /tmp/mock-git/migrate-manager/* /usr/migrate-manager/