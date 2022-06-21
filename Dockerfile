FROM ubuntu:20.04
#RUN mkdir /app
#COPY . /app

RUN apt-get -y update --fix-missing && \
    apt-get upgrade -y && \
    apt-get --no-install-recommends install -y apt-utils && \
    apt-get install maven -y
#    apt install default-jdk \

ENTRYPOINT ["/app/run-all.sh"]


