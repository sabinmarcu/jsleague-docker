FROM alpine

RUN apk add bash
RUN mkdir -p /scripts
COPY . /scripts/

RUN chmod +x /scripts/*

WORKDIR /scripts
CMD /scripts/wait.sh