FROM ubuntu:16.04

ENV LANG=C.UTF-8 LC_ALL=C.UTF-8

RUN apt-get update && apt-get upgrade -y && apt-get install -qqy \
    wget \
    bzip2 \
    libssl-dev \
    openssh-server \
    npm

RUN mkdir /var/run/sshd
RUN echo 'root:propulsion' | chpasswd
RUN sed -i '/PermitRootLogin/c\PermitRootLogin yes' /etc/ssh/sshd_config
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

RUN echo 'export PATH=/opt/miniconda/bin:$PATH' > /etc/profile.d/conda.sh && \
    wget --quiet https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda.sh && \
    /bin/bash ~/miniconda.sh -b -p /opt/miniconda && \
    rm ~/miniconda.sh

RUN mkdir -p /backend && \
    mkdir -p /frontend && \
    mkdir -p /scripts && \
    mkdir -p /media-files && \
    mkdir -p /static-files

COPY ./backend/requirements.yml /backend/requirements.yml
RUN /opt/miniconda/bin/conda env create -f /backend/requirements.yml
ENV PATH /opt/miniconda/envs/backend/bin:$PATH

COPY ./backend /backend

COPY ./scripts/* /scripts/
RUN chmod +x /scripts/*
COPY ./frontend/package.json /frontend/
COPY ./frontend/package-lock.json /frontend/
RUN npm install
COPY ./frontend /frontend
RUN npm run build

WORKDIR /backend

EXPOSE 22
EXPOSE 80