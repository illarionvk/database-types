FROM node:8.11.2-stretch

ENV TINI_VERSION=v0.17.0 \
    TINI_SUBREAPER=enabled

RUN curl -L -o /tini https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini-static \
    && curl -L -o /tini.asc https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini-static.asc \
    && (gpg --keyserver ha.pool.sks-keyservers.net --recv-keys 595E85A6B1B4779EA4DAAEC70B588DFF0527A9B7 \
       ||  gpg --keyserver keyserver.ubuntu.com --recv-keys 595E85A6B1B4779EA4DAAEC70B588DFF0527A9B7) \
    && gpg --verify /tini.asc \
    && chmod +x /tini

ENTRYPOINT ["/tini", "-sg", "--"]

RUN apt-get update \
    && apt-get --assume-yes --no-install-recommends install \
       parallel \
    && rm -rf /var/lib/apt/lists/*

ENV SHELL=/bin/bash \
    WORKDIR=/app

ENV PATH="${WORKDIR}/bin:${WORKDIR}/node_modules/.bin:${PATH}"

WORKDIR ${WORKDIR}

RUN mkdir /mnt/tmp \
    && chown -R node:node ${WORKDIR} /mnt/tmp

USER node
