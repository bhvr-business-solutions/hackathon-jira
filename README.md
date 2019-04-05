# Setup

From the top level directory
```bash
npm install
```

# Start

From the top level directory
```bash
npm run dev
```

Once started, the application is available at [http://localhost:3000/](http://localhost:3000/)

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