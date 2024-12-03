declare module 'midtrans' {
  export default class MidTrans {
    constructor(config: {
      client_key: string;
      server_key: string;
      mode?: string;
    });

    body: Record<string, any>;
    type: string;
    url: string;
    mode: string;
    client_key: string;
    server_key: string;
    do: string;

    showAllMethods(obj: any): string[];

    add(name: string, data: any): this;

    remove(name: string): this;

    type(name: string): this;

    action(name: string, data?: string | object, additional_payload?: object): this;

    clean(): this;

    do(name: string): this;

    subscriptions(
      name: string,
      amount: number | string,
      currency: string,
      payment_type: string,
      token: string,
      interval: number | string
    ): this;

    transaction_details(order_id: string, amount: number | string): this;

    item_details(
      name: string,
      price: number | string,
      quantity: number | string,
      brand?: string,
      category?: string,
      merchant_name?: string,
      tenor?: string,
      code_plan?: string,
      mid?: string
    ): this;

    customer_details(
      first_name?: string,
      last_name?: string,
      email?: string,
      phone?: string
    ): this;

    billing_address(
      first_name?: string,
      last_name?: string,
      email?: string,
      phone?: string,
      address?: string,
      city?: string,
      postal_code?: string,
      country_code?: string
    ): this;

    shipping_address(
      first_name?: string,
      last_name?: string,
      email?: string,
      phone?: string,
      address?: string,
      city?: string,
      postal_code?: string,
      country_code?: string
    ): this;

    getBody(): Record<string, any>;

    send(callback: (response: any) => void): void;

    sendAsync(): Promise<{[key: string]: any;}>;
  }
}
