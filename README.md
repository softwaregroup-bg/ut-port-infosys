# ut-port-infosys

Sending SMS with infosys system.

## In order to use the module you need to add the following configuration

```json
"infosys": {
        "logLevel": "error",
        "url": "proto://gatewayIp:port",
        "uri": "/sms/2/text/single",
        "method": "GET",
        "raw": {
            "headers": {
                "Authorization": "Basic base64(string)"
            }
        }
    }
```

and then call it with

```js
await importMethod('infosys.send')({
    body,
    messageId,
    to,
    sid = 11,
    channel = 'sms' // sms or viber
});
```
