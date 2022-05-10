module.exports = (...params) => class infosys extends require('ut-port-http')(...params) {
    get defaults() {
        return {
            namespace: 'infosys',
            drainSend: 50000
        };
    }

    handlers() {
        return {
            'drainSend.event.receive'({length}, $meta) {
                $meta.mtid = 'notification';
                $meta.method = 'notice.message.process';
                return {
                    port: this.config.id,
                    method: this.config.namespace + '.exec',
                    length: length
                };
            },
            [`${this.config.namespace}.exec.request.send`]: ({
                body,
                messageId,
                to,
                sid = 11,
                channel = 'sms' // sms or viber
            }, $meta) => {
                return {
                    qs: {
                        sid,
                        validity: 1440,
                        priority: 2,
                        id: messageId,
                        msisdn: to,
                        channel,
                        text: body
                    }
                };
            },
            receive: (msg, $meta) => {
                return msg.payload;
            }
        };
    }
};
