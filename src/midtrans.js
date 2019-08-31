/**
 * MidTrans API Payment ES6 Class
 * @version 3.48.0  this is refer to api doc version from MidTrans
 */
'use strict';
const unirest = require('unirest');
const Base64 = require('./base64.js');
const _isEmpty = Symbol('_isEmpty');
const _isEmptyConfig = Symbol('_isEmptyConfig');
const _authorization = Symbol('_authorization');
const _autoItemNumbered = Symbol('_autoItemNumbered');
const _convertObjectToURLParameter = Symbol('_convertObjectToURLParameter');
const _url = Symbol('_url');
const _hasKey = Symbol('_hasKey');

class MidTrans extends Base64 {

    /**
     * Constructor
     * @param {object} config 
     * 
     * Note:
     * Example required config
     * {
     *      client_key: "",
     *      server_key: "",
     *      mode: ""            >> optional, if empty then will use api sandbox mode
     * }
     */
    constructor(config) {
        super();
        this.body = {};
        if(typeof config === 'object' && config.constructor === Object){
            for(var key in config) {
                if(config.hasOwnProperty(key)) {
                    this[key] = config[key];
                }
            }
            if(!config.mode) {
                this.mode = "sandbox";
            }
        } else {
            throw new Error('Config must be an object type!');
        }
    }

    /**
     * Determine variable is empty
     * @param {var} obj
     * @return {bool} 
     */
    [_isEmpty](obj) {
        if(obj === undefined || obj === null || obj === '') return true;
        return false;
    }

    /**
     * Determine if config empty or not
     * @param {string} name
     * @return {bool} 
     */
    [_isEmptyConfig](name) {
        return this[_isEmpty](this[name]);
    }

    /**
     * Determine in object has a key name
     * @param {*} data 
     * @param {string|array} name 
     * @return {bool}
     */
    [_hasKey](data,name){
        name = name instanceof Array ? name : [name];
    	return name.every(key => Object.keys(data).includes(key));
    }

    /**
     * Authorization Basic Base64 MidTrans
     * @return {string}
     */
    [_authorization]() {
        return 'Basic '+this.encode(this.server_key+':');
    }

    /**
     * URL request builder to MidTrans endpoint
     * @param {string} mode 
     * @param {string} type 
     */
    [_url](mode,type='api') {
        type = type.toString().toLowerCase();
        switch(mode) {
            case 'production':
                if(type == 'snap'){
                    return 'https://app.midtrans.com/snap/v1';
                }
                return 'https://api.midtrans.com/v2';
            default:
                if(type == 'snap'){
                    return 'https://app.sandbox.midtrans.com/snap/v1';
                }
                return 'https://api.sandbox.midtrans.com/v2';
        }
    }

    /**
     * Generate id number into item_details automatically
     * @param {object} obj 
     * @return {object}
     */
    [_autoItemNumbered](obj) {
        if(obj instanceof Array){
            obj.forEach(function(item, index) {
                item.id = index+1;
            });
        }
        return obj;
    }

    /**
     * Convert data object to url parameter
     * @param {object} data
     * @return {string} 
     */
    [_convertObjectToURLParameter](data) {
        return Object.keys(data).map(function(k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }).join('&');
    }

    /**
     * Show all methods available in class
     * @param {class} obj
     * @return {object}  
     */
    showAllMethods(obj) {
        let props = []
        do {
            const l = Object.getOwnPropertyNames(obj)
                .concat(Object.getOwnPropertySymbols(obj).map(s => s.toString()))
                .sort()
                .filter((p, i, arr) =>
                    typeof obj[p] === 'function' &&  //only the methods
                    p !== 'constructor' &&           //not the constructor
                    (i == 0 || p !== arr[i - 1]) &&  //not overriding in this prototype
                    props.indexOf(p) === -1          //not overridden in a child
                )
            props = props.concat(l)
        }
        while (
            (obj = Object.getPrototypeOf(obj)) &&   //walk-up the prototype chain
            Object.getPrototypeOf(obj)              //not the the Object prototype methods (hasOwnProperty, etc...)
        )
        return props
    }

    /**
     * Add new or replace key in body json object
     * @param {string} name 
     * @param {object} data
     * @return {this}
     */
    add(name,data) {
        if(typeof name === 'string' || name instanceof String){
            if(data) {
                this.body[name] = data;
            }
        }
        return this;
    }

    /**
     * Remove key in body json object
     * @param {string} name
     * @return {this}
     */
    remove(name) {
        if(typeof name === 'string' || name instanceof String){
            delete this.body[name];
        }
        return this;
    }

    /**
     * Set type of MidTrans Payment
     * @param {string} name     you can set snap|api
     * @return {this} 
     */
    type(name) {
        if(typeof name === 'string' || name instanceof String){
            this.type = name.toLowerCase();
        }
        return this;
    }

    /**
     * Set action for MidTrans Payment
     * @param {string} name                 you can set transactions|charge|approve|deny|cancel|expire|refund|status
     * @param {string|object} data          [optional] if string then will be order_id and if object then will be converted to parameter  
     * @param {object} additional_payload   [conditional] sometimes we want to add url parameter in special case. 
     * @return {this}
     */
    action(name,data='',additional_payload='') {
        if(typeof name === 'string' || name instanceof String){
            name = name.toLowerCase();
            switch(name) {
                case 'token':
                    if(typeof data === 'object'){
                        var order_id = data;
                        order_id.client_key = this.client_key;
                        data = this[_convertObjectToURLParameter](order_id);
                        this.url = this[_url](this.mode)+'/'+name+'?'+data;
                    } else {
                        this.url = this[_url](this.mode)+'/'+name;
                    }
                    break;
                case 'point_inquiry':
                    if(typeof additional_payload === 'object'){
                        var param = this[_convertObjectToURLParameter](additional_payload);
                        this.url = this[_url](this.mode)+'/'+name+'/'+data+'?'+param;
                    } else {
                        this.url = this[_url](this.mode)+'/'+name+'/'+data;
                    }
                    break;
                case 'card/register':
                    if(typeof data === 'object'){
                        var order_id = data;
                        order_id.client_key = this.client_key;
                        data = this[_convertObjectToURLParameter](order_id);
                        this.url = this[_url](this.mode)+'/'+name+'?'+data;
                    } else {
                        this.url = this[_url](this.mode)+'/'+name;
                    }
                    break;
                case 'status/b2b':
                    if(typeof additional_payload === 'object'){
                        var param = this[_convertObjectToURLParameter](additional_payload);
                        this.url = this[_url](this.mode)+'/'+data+'/'+name+'?'+param;
                    } else {
                        this.url = this[_url](this.mode)+'/'+data+'/'+name;
                    }
                    break;
                case 'bins':
                    this.url = (this[_url](this.mode)+'/'+name+'/'+data).replace('/v2/','/v1/');
                    break;
                case 'subscriptions':
                    if(data) {
                        switch(this.do){
                            case 'enable':
                                this.url = (this[_url](this.mode)+'/'+name+'/'+data+'/enable').replace('/v2/','/v1/');
                                break;
                            case 'disable':
                                this.url = (this[_url](this.mode)+'/'+name+'/'+data+'/disable').replace('/v2/','/v1/');
                                break;
                            default:
                                this.url = (this[_url](this.mode)+'/'+name+'/'+data).replace('/v2/','/v1/');
                        }
                    } else {
                        this.url = (this[_url](this.mode)+'/'+name).replace('/v2/','/v1/');
                    }
                    break;
                default:
                    if(data){
                        this.url = this[_url](this.mode)+'/'+data+'/'+name;
                    } else {
                        this.url = this[_url](this.mode,this.type)+'/'+name;
                    }   
            }
        }
        return this;
    }

    /**
     * Cleanup body request
     * @return {this}
     */
    clean() {
        this.body = {};
        return this;
    }

    /**
     * Do special action for some case. ex: subscriptions
     * @return {this}
     */
    do(name) {
        this.do = name.toString().toLowerCase();
        return this;
    }

    /**
     * Set data subscriptions
     * @param {string} name             Subscription's name that will be use to generate transaction's order id. 
     *                                  Note: Allowed symbols are dash(-), underscore(_), tilde (~), and dot (.)
     * @param {int|string} amount       Amount that will be use to make recurring charge. Note: Do not use decimal 
     * @param {string} currency         ISO-4217 representation for 3 digit alphabetic currency code. 
     *                                  Note: Currently only support IDR
     * @param {string} payment_type     Transaction payment method. Note: currently only support credit_card
     * @param {string} token            Saved payment token. Note: For credit_card should use saved_token_id received in charge response
     * @param {int|string} interval     Monthly interval of the subscription. Note: only allowed 1-12 value
     */
    subscriptions(name,amount,currency,payment_type,token,interval) {
        this.add('name',name);
        this.add('amount',amount.toString());
        this.add('currency',currency.toString().toUpperCase());
        this.add('payment_type',payment_type);
        this.add('token',token.toString());
        this.add('interval',parseInt(interval));
        return this;
    }

    /**
     * Set transaction_details information
     * @param {string} order_id     your order/invoice id (should be unique) 
     * @param {int|string} amount   total/gross amount for your invoice
     * @return {this}
     */
    transaction_details(order_id,amount) {
        this.add('transaction_details',{
            'order_id':order_id.toString(),
            'gross_amount':parseInt(amount)
        });
        return this;
    }

    /**
     * Add item_details in your transactions
     * @param {string} name             the item name
     * @param {string|int} price        price of item
     * @param {string|int} quantity     quantity of item
     * @param {string} brand            [optional] the brand name of item
     * @param {string} category         [optional] category name of item
     * @param {string} merchant_name    [optional] the merchant_name of item
     * @param {string} tenor            [conditional] installment term, use 2 digits numeric (03, 06, 09, 12, 24) 
     * @param {string} code_plan        [conditional] installment code, use 000 for default
     * @param {string} mid              [conditional] installment mid
     * @return {this}
     */
    item_details(name,price,quantity,brand='',category='',merchant_name='',tenor='',code_plan='',mid='') {
        if(!this[_hasKey](this.body,'item_details')) this.add('item_details',[]);
        var items = {
            'name':name,
            'price':parseInt(price),
            'quantity':parseInt(quantity)
        };
        if(brand) items.brand=brand;
        if(category) items.category=category;
        if(merchant_name) items.merchant_name=merchant_name;
        if(tenor) items.tenor=tenor;
        if(code_plan) items.code_plan=code_plan;
        if(mid) items.mid=mid;
        this.body.item_details.push(items);
        this.body.item_details = this[_autoItemNumbered](this.body.item_details);
        return this;
    }

    /**
     * Add customer_details in transactions
     * @param {string} first_name   [optional] the customer first name
     * @param {string} last_name    [optional] the customer last name
     * @param {string} email        [optional] the customer email address
     * @param {string} phone        [optional] the customer phone number
     * @return {this} 
     */
    customer_details(first_name='',last_name='',email='',phone='') {
        if(!this[_hasKey](this.body,'customer_details')) this.add('customer_details',{});
        var items = {};
        if(first_name) items.first_name=first_name;
        if(last_name) items.last_name=last_name;
        if(email) items.email=email;
        if(phone) items.phone=phone;
        this.body.customer_details = items;
        return this;
    }

    /**
     * Add billing_address in customer_details
     * @param {string} first_name       [optional] first name of customer for billing address
     * @param {string} last_name        [optional] last name of customer for billing address
     * @param {string} email            [optional] email address of customer for billing address
     * @param {string} phone            [optional] phone number of customer for billing address
     * @param {string} address          [optional] address of customer for billing address
     * @param {string} city             [optional] city of customer for billing address
     * @param {string} postal_code      [optional] postal_code of customer for billing address
     * @param {string} country_code     [optional] country_code of customer for billing address
     * @return {this}
     */
    billing_address(first_name='',last_name='',email='',phone='',address='',city='',postal_code='',country_code='') {
        if(!this[_isEmpty](this.body.customer_details)) {
            var items = {};
            if(first_name) items.first_name=first_name;
            if(last_name) items.last_name=last_name;
            if(email) items.email=email;
            if(phone) items.phone=phone;
            if(address) items.address=address;
            if(city) items.city=city;
            if(postal_code) items.postal_code=postal_code;
            if(country_code) items.country_code=country_code;
            this.body.customer_details.billing_address = items;
        }
        return this;
    }

    /**
     * Add shipping_address in customer_details
     * @param {string} first_name       [optional] first name of customer for shipping address
     * @param {string} last_name        [optional] last name of customer for shipping address
     * @param {string} email            [optional] email address of customer for shipping address
     * @param {string} phone            [optional] phone number of customer for shipping address
     * @param {string} address          [optional] address of customer for shipping address
     * @param {string} city             [optional] city of customer for shipping address
     * @param {string} postal_code      [optional] postal_code of customer for shipping address
     * @param {string} country_code     [optional] country_code of customer for shipping address
     * @return {this}
     */
    shipping_address(first_name='',last_name='',email='',phone='',address='',city='',postal_code='',country_code='') {
        if(!this[_isEmpty](this.body.customer_details)) {
            var items = {};
            if(first_name) items.first_name=first_name;
            if(last_name) items.last_name=last_name;
            if(email) items.email=email;
            if(phone) items.phone=phone;
            if(address) items.address=address;
            if(city) items.city=city;
            if(postal_code) items.postal_code=postal_code;
            if(country_code) items.country_code=country_code;
            this.body.customer_details.shipping_address = items;
        }
        return this;
    }
  
    /**
     * Get Body of json object
     * @return {object}
     */
    getBody() {
        return this.body;
    }

    /**
     * Send Body json object to MidTrans API
     * @param {callback} callback
     * @return {callback}
     */
    send(callback){
        if(this[_isEmptyConfig]('url')) throw new Error('Action method is required!');
        if(this.url.endsWith(this.client_key) 
            || (this.url.includes('/status') > 0)
            || (this.url.includes('/point_inquiry/') > 0)
            || (this.url.includes('/bins/') > 0)
            || (this.url.includes('/card/register') > 0)
            || ((this.url.includes('/subscriptions/') > 0) && (this[_isEmpty](this.do) == true))
        ){
            var req = unirest.get(this.url);
        } else if (this.url.includes('/subscriptions/') > 0 && (this.do == 'update')) {
            var req = unirest.patch(this.url);
        } else {
            var req = unirest.post(this.url);
        }
        req.headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': this[_authorization]()
        })
        .send(this.body)
        .end(function (response) {
          return callback(response);
        });
    }

}

module.exports = MidTrans;