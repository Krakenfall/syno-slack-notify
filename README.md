(stub readme, TODO:fill in readme)
# syno-slack-notify
Synology Notification Relay for Slack

```
docker build -t syno-slack-relay:latest --build-arg RELAY_PORT=9080 --build-arg WEBHOOK_URI="https://hooks.slack.com/services/<WebhookPath>" .
docker run -p 9080:9080 -d syno-slack-relay:latest
```
``` PowerShell
# Curl this instead
Invoke-WebRequest -Method GET -Uri "http://localhost:9080/receive?user=x&password=x&sender=x&receiver=x&message=Test+message+from+$ENV:COMPUTERNAME"
```
