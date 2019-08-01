var assert = require('assert');
var MidTrans = require('../src/midtrans.js');

var config = {
    client_key: "xxx",
    server_key: "xxx",
    mode: ""
};

describe('MidTrans method test', function(){

    it('should display all methods in array', function(){
        var mdt = new MidTrans(config);
        assert.equal(Array.isArray(mdt.showAllMethods(mdt)),true);
    });
    
});