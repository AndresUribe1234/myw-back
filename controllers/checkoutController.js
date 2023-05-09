const mercadopago = require("mercadopago");

exports.testMiddleware = async (req, res) => {
  try {
    console.log("Entered function inside back..");
    res.status(200).json({
      status: "Success:Checkout route working!",
    });
  } catch (err) {
    res.status(400).json({
      status: "Checkout route not working!",
      err: err.message,
    });
  }
};

exports.mercadoPagoCheckout = async (req, res) => {
  try {
    console.log("mp token", process.env.MERCADO_PAGO_ACESS_TOKEN);
    mercadopago.configure({
      access_token: process.env.MERCADO_PAGO_ACESS_TOKEN,
    });

    // Create a preference object
    let preference = {
      binary_mode: true,
      items: [
        {
          title: "My example event",
          unit_price: 10000,
          quantity: 1,
        },
      ],
      payer: {
        name: "Andres",
        surname: "Uribe",
        email: "AndresUUURRR@gmail.com",
      },
      back_urls: {
        success: "http://localhost:3000/post-mp/success",
        failure: "http://localhost:3000/post-mp/",
        pending: "http://localhost:3000/post-mp/",
      },
      auto_return: "approved",
    };

    const mp_response = await mercadopago.preferences.create(preference);
    console.log(mp_response);

    console.log("Entered function inside back..");
    res.status(200).json({
      status: "Success:Mercado pago working!",
      global: { id: mp_response.body.id },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Checkout route not working!",
      err: err.message,
    });
  }
};
