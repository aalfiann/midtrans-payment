var MidTrans = require('../src/midtrans.js');

var config = {
    client_key: "xxx",      // you must change this client_key with yours
    server_key: "xxx",      // you must change this server_key with yours
    mode: ""
};

describe('MidTrans request test', function(){

    it('request with wrong authorization should return 401', function(done){
        var mdt = new MidTrans(config);
        mdt.server_key = 'xxx';
        var body = mdt.type('snap').action('transactions').transaction_details('INV001',1000);
        body.send(function(response) {
            if(response.statusCode == 401){
                done();
            } else {
                done(new Error(JSON.stringify(response.body)));
            }
        });
    });

    it('action: token', function(done){
        var mdt = new MidTrans(config);
        var payload = {
            gross_amount:10000,
            card_number:'4811 1111 1111 1114',
            card_exp_month:12,
            card_exp_year:2019,
            card_cvv:123
        };
        var body = mdt.type('api').action('token',payload);
        body.send(function(response) {
            if(response.statusCode == 200){
                done();
            } else {
                done(new Error(JSON.stringify(response.body)));
            }
        });
    });

    it('action: transactions via snap', function(done){
        var mdt = new MidTrans(config);
        var body = mdt.type('snap').action('transactions').transaction_details('INV001',1000);
        body.send(function(response) {
            if(response.statusCode == 201){
                done();
            } else {
                done(new Error(JSON.stringify(response.body)));
            }
        });
    });

    it('action status: found order_id should return http status 200 and body.status_code != 404', function(done){
        var mdt = new MidTrans(config);
        var body = mdt.type('api').action('status','ORDER-101');
        body.send(function(response) {
            if(response.statusCode == 200 && response.body.status_code != '404'){
                done();
            } else {
                done(new Error(JSON.stringify(response.body)));
            }
        });
    });

    it('action status: not found order_id via SNAP should return http status 200 and body.status_code 404', function(done){
        var mdt = new MidTrans(config);
        var body = mdt.type('snap').action('status','INV001');
        body.send(function(response) {
            if(response.statusCode == 200 && response.body.status_code == '404'){
                done();
            } else {
                done(new Error(JSON.stringify(response.body)));
            }
        });
    });

    it('action status: not found order_id via API should return http status 200 and body.status_code 404', function(done){
        var mdt = new MidTrans(config);
        var body = mdt.type('api').action('status','INV001');
        body.send(function(response) {
            if(response.statusCode == 200 && response.body.status_code == '404'){
                done();
            } else {
                done(new Error(JSON.stringify(response.body)));
            }
        });
    });

});