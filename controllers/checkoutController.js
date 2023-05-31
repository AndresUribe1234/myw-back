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
    // Extract items for preference
    console.log(req.body);
    const {
      title,
      currency_id,
      unit_price,
      email,
      name,
      surname,
      phone,
      area_code,
    } = req.body;

    console.log("mp token", process.env.MERCADO_PAGO_ACESS_TOKEN);
    mercadopago.configure({
      access_token: process.env.MERCADO_PAGO_ACESS_TOKEN,
    });

    // Create a preference object
    let preference = {
      binary_mode: true,
      items: [
        {
          title: title,
          currency_id: currency_id,
          quantity: 1,
          unit_price: Number(unit_price),
        },
      ],
      payer: {
        name: name,
        surname: surname,
        email: email,
        phone: { area_code: String(area_code), number: Number(phone) },
      },
      back_urls: {
        success: `${process.env.MP_LINK_SUCCESS}/post-mp/success`,
        failure: `${process.env.MP_LINK_NOT_SUCCESS}/post-mp`,
        pending: `${process.env.MP_LINK_NOT_SUCCESS}/post-mp`,
      },
      auto_return: "approved",
    };

    const mp_response = await mercadopago.preferences.create(preference);
    console.log(mp_response);

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
