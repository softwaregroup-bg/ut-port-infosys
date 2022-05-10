module.exports = (...params) => class infosys extends require('ut-port-http')(...params) {
    get defaults() {
        return {
            namespace: 'infosys',
            drainSend: 50000
        };
    }

    handlers() {
        return {
            'drainSend.event.receive'(msg, $meta) {
                $meta.mtid = 'notification';
                $meta.method = 'notice.message.process';
                return {
                    port: this.config.id,
                    method: this.config.namespace + '.exec',
                    length: msg.length
                };
            },
            [`${this.config.namespace}.exec.request.send`]: (msg, $meta) => {
                return {
                    payload: {
                        from: msg.from,
                        to: msg.to,
                        text: msg.body
                    },
                    json: true
                };
            },
            receive: (msg, $meta) => {
                return msg.payload;
            }
        };
    }
};
