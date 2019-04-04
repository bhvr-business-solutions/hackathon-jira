# Setup

## Client

```bash
cd client
npm install
```

## Server

```bash
cd server
npm install
```

# Start

## Server (should be strated first)

```bash
cd server
npm run dev
```

## Client

```bash
cd client
npm start
```

# Activate Jira webhooks

## Install ngrok

Get ngrok here: https://ngrok.com/download

## Start ngrok

```bash
ngrok http 8081
```

## Add Jira webhook

Go to https://behaviour.atlassian.net/plugins/servlet/webhooks  
Create a webhook:

* For url, use ngrok public url (see ngrok output)
* You need to check all the "Issue" checkboxes (created/updated/deleted)
* You are good to go !