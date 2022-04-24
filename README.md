# Queso

**Que** e**s** est**O** --> Queso.

An opinionated, second brain application.

## Services

We've gone full stack and separated out the individual components of this application:

* *frontend*: React
* *backend*: Ruby on Rails
* *database*: Postgres

## Quickstart

*Largely a WIP.* For now, we rebuild the docker container and empty out postgres db everytime we start. That being said it's single command deployment. Big improvement IMO.

```bash
make run
```

In the ideal state (*read mvp*) we need:
* persistence, thus cleaning up migration stuffs
* syncing between clients and a always on State of Truth
* some sensible configs to determine if State of Truth, a full rebuild needed, etc.

Give me some learning and hacking time and we'll have all this.