var assert = require('assert');
var MidTrans = require('../src/midtrans.js');

var config = {
    client_key: "xxx",
    server_key: "xxx",
    mode: ""
};

describe('MidTrans endpoint url test', function(){

    it('endpoint url production', function(){
        var mdt = new MidTrans(config);
        mdt.mode = 'production';
        mdt.action('status');
        assert.equal(mdt.url,'https://api.midtrans.com/v2/status');
    });

    it('endpoint url sandbox', function(){
        var mdt = new MidTrans(config);
        mdt.action('status');
        assert.equal(mdt.url,'https://api.sandbox.midtrans.com/v2/status');
    });

    it('endpoint url snap production transactions', function(){
        var mdt = new MidTrans(config);
        mdt.mode = 'production';
        mdt.type('snap').action('transactions');
        assert.equal(mdt.url,'https://app.midtrans.com/snap/v1/transactions');
    });

    it('endpoint url snap sandbox transactions', function(){
        var mdt = new MidTrans(config);
        mdt.type('snap').action('transactions');
        assert.equal(mdt.url,'https://app.sandbox.midtrans.com/snap/v1/transactions');
    });

    it('endpoint url status/b2b', function(){
        var mdt = new MidTrans(config);
        mdt.action('status/b2b','123',{page:0,per_page:10});
        assert.equal(mdt.url,'https://api.sandbox.midtrans.com/v2/123/status/b2b?page=0&per_page=10');
    });

    it('endpoint url status/b2b without pagination', function(){
        var mdt = new MidTrans(config);
        mdt.action('status/b2b','123');
        assert.equal(mdt.url,'https://api.sandbox.midtrans.com/v2/123/status/b2b');
    });

    it('endpoint url token',function(){
        var mdt = new MidTrans(config);
        var payload = {
            gross_amount:10000,
            card_number:'4811 1111 1111 1114',
            card_exp_month:12,
            card_exp_year:2019,
            card_cvv:123
        };
 
        mdt.type('api').action('token',payload);
        assert.equal(mdt.url,'https://api.sandbox.midtrans.com/v2/token?gross_amount=10000&card_number=4811%201111%201111%201114&card_exp_month=12&card_exp_year=2019&card_cvv=123&client_key=xxx');
    });

    it('endpoint url token without payload', function(){
        var mdt = new MidTrans(config);
        mdt.action('token');
        assert.equal(mdt.url,'https://api.sandbox.midtrans.com/v2/token');
    });

    it('endpoint url card/register', function(){
        var mdt = new MidTrans(config);
        var payload = {
            card_number:'4811222233331114',
            card_exp_month:12,
            card_exp_year:2019,
            card_cvv:123
        }
        mdt.action('card/register',payload);
        assert.equal(mdt.url,'https://api.sandbox.midtrans.com/v2/card/register?card_number=4811222233331114&card_exp_month=12&card_exp_year=2019&card_cvv=123&client_key=xxx');
    });

    it('endpoint url card/register without payload', function(){
        var mdt = new MidTrans(config);
        mdt.action('card/register');
        assert.equal(mdt.url,'https://api.sandbox.midtrans.com/v2/card/register');
    });

    it('endpoint url capture', function(){
        var mdt = new MidTrans(config);
        mdt.action('capture');
        assert.equal(mdt.url,'https://api.sandbox.midtrans.com/v2/capture');
    });

    it('endpoint url approve', function(){
        var mdt = new MidTrans(config);
        mdt.action('approve','123');
        assert.equal(mdt.url,'https://api.sandbox.midtrans.com/v2/123/approve');
    });

    it('endpoint url deny', function(){
        var mdt = new MidTrans(config);
        mdt.action('deny','123');
        assert.equal(mdt.url,'https://api.sandbox.midtrans.com/v2/123/deny');
    });

    it('endpoint url cancel', function(){
        var mdt = new MidTrans(config);
        mdt.action('cancel','123');
        assert.equal(mdt.url,'https://api.sandbox.midtrans.com/v2/123/cancel');
    });

    it('endpoint url expire', function(){
        var mdt = new MidTrans(config);
        mdt.action('expire','123');
        assert.equal(mdt.url,'https://api.sandbox.midtrans.com/v2/123/expire');
    });

    it('endpoint url refund', function(){
        var mdt = new MidTrans(config);
        mdt.action('refund','123');
        assert.equal(mdt.url,'https://api.sandbox.midtrans.com/v2/123/refund');
    });

    it('endpoint url refund online direct', function(){
        var mdt = new MidTrans(config);
        mdt.action('refund/online/direct');
        assert.equal(mdt.url,'https://api.sandbox.midtrans.com/v2/refund/online/direct');
    });

    it('endpoint url point_inquiry', function(){
        var mdt = new MidTrans(config);
        mdt.action('point_inquiry','123');
        assert.equal(mdt.url,'https://api.sandbox.midtrans.com/v2/point_inquiry/123');
    });

    it('endpoint url point_inquiry with special case', function(){
        var mdt = new MidTrans(config);
        mdt.action('point_inquiry','123',{'gross_amount':1000});
        assert.equal(mdt.url,'https://api.sandbox.midtrans.com/v2/point_inquiry/123?gross_amount=1000');
    });

    it('endpoint url bins', function(){
        var mdt = new MidTrans(config);
        mdt.action('bins','123');
        assert.equal(mdt.url,'https://api.sandbox.midtrans.com/v1/bins/123');
    });

    it('endpoint url subscriptions create', function(){
        var mdt = new MidTrans(config);
        mdt.action('subscriptions');
        assert.equal(mdt.url,'https://api.sandbox.midtrans.com/v1/subscriptions');
    });

    it('endpoint url subscriptions find', function(){
        var mdt = new MidTrans(config);
        mdt.action('subscriptions','SUB1');
        assert.equal(mdt.url,'https://api.sandbox.midtrans.com/v1/subscriptions/SUB1');
    });

    it('endpoint url subscriptions enable', function(){
        var mdt = new MidTrans(config);
        mdt.do('enable').action('subscriptions','SUB1');
        assert.equal(mdt.url,'https://api.sandbox.midtrans.com/v1/subscriptions/SUB1/enable');
    });

    it('endpoint url subscriptions disable', function(){
        var mdt = new MidTrans(config);
        mdt.do('disable').action('subscriptions','SUB1');
        assert.equal(mdt.url,'https://api.sandbox.midtrans.com/v1/subscriptions/SUB1/disable');
    });

    it('endpoint url subscriptions update', function(){
        var mdt = new MidTrans(config);
        mdt.do('update').action('subscriptions','SUB1');
        assert.equal(mdt.url,'https://api.sandbox.midtrans.com/v1/subscriptions/SUB1');
    });

    it('endpoint without or wrong action method will return undefined', function(){
        var mdt = new MidTrans(config);
        mdt.action([],'SUB1');
        assert.deepEqual(mdt.url,undefined);
    });

});
