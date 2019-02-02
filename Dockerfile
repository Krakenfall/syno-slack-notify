FROM node:boron
LABEL Description="Synology Notification Relay for Slack" \
Vendor="Krakenfall" Version="1.0"

ARG RELAY_PORT=80
ARG WEBHOOK_URI

ENV RELAY_PORT=$RELAY_PORT
ENV WEBHOOK_URI=$WEBHOOK_URI

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

RUN export TZ=America/Los_Angeles

EXPOSE $RELAY_PORT

CMD ["npm", "start"]
