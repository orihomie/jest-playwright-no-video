> docker build -f e2e.Dockerfile . -t pwt && docker run -e ARTIFACTS_DIR=/tmp/artifacts -v /tmp:/tmp:rw -it --rm --ipc=host pwt
