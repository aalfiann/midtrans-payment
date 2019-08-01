'use strict';

class Base64 {

    /**
     * Constructor
     * @param {string} format       [optional] you can set ascii|buffer
     */
    constructor(format='ascii') {
        this.format = format;
    }

    /**
     * Encode to base64
     * @param {*} data      this could be string or any
     * @return {string}
     */
    encode(data) {
        return new Buffer.from(data).toString('base64');
    }

    /**
     * Decode from base64
     * @param {string} data      this the encoded base64 string
     * @return {mixed}
     */
    decode(data) {
        var buffer = new Buffer.from(data, 'base64');
        if(this.format == 'buffer') return buffer;
        return buffer.toString(this.format);
    }

}

module.exports = Base64;