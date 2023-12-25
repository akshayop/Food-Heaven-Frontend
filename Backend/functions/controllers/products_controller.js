const admin = require("firebase-admin");
const db = admin.firestore();
const stripe = require("stripe")(process.env.STRIPE_KEY);

// Creating new product

module.exports.createProduct = async (req, res) => {
  try {
    const id = Date.now();

    const data = {
      product_id: id,
      product_name: req.body.product_name,
      product_category: req.body.product_category,
      product_price: req.body.product_price,
      product_image: req.body.product_image,
    };

    const response = await db.collection("products").doc(`/${id}/`).set(data);

    return res.status(200).send({ success: true, data: response });
  } catch (err) {
    return res.send({ success: false, msg: `Error: ${err}` });
  }
};

// Getting new product

module.exports.showProducts = async (req, res) => {
  (async () => {
    try {
      let query = db.collection("products");
      let response = [];
      await query.get().then((querysnap) => {
        let docs = querysnap.docs;
        docs.map((doc) => {
          response.push({ ...doc.data() });
        });
        return response;
      });
      return res.status(200).send({ success: true, data: response });
    } catch (err) {
      return res.send({ success: false, msg: `Error: ${err}` });
    }
  })();
};

// Deleting product

module.exports.deletingProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    await db
      .collection("products")
      .doc(`/${productId}/`)
      .delete()
      .then((result) => {
        return res.status(200).send({ success: true, data: result });
      });
  } catch (err) {
    return res.send({ success: false, msg: `Error: ${err}` });
  }
};

// creating a cart

module.exports.addToCart = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.body.product_id;

  try {
    const doc = await db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${productId}/`)
      .get();

    if (doc.data()) {
      const quantity = doc.data().quantity + 1;
      const updatedItem = await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}/`)
        .update({ quantity });
      return res.status(200).send({ success: true, data: updatedItem });
    } else {
      const data = {
        product_id: productId,
        product_name: req.body.product_name,
        product_category: req.body.product_category,
        product_price: req.body.product_price,
        product_image: req.body.product_image,
        quantity: 1,
      };

      const addItems = await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}/`)
        .set(data);
      return res.status(200).send({ success: true, data: addItems });
    }
  } catch (err) {
    return res.send({ success: false, msg: `Error :${err}` });
  }
};

// getting cart details

module.exports.getCartItem = async (req, res) => {
  const userId = req.params.userId;
  (async () => {
    try {
      let query = db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items");
      let response = [];

      await query.get().then((querysnap) => {
        let docs = querysnap.docs;

        docs.map((doc) => {
          response.push({ ...doc.data() });
        });
        return response;
      });
      return res.status(200).send({ success: true, data: response });
    } catch (er) {
      return res.send({ success: false, msg: `Error :,${er}` });
    }
  })();
};

// updating cart items quantity

module.exports.updateCart = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.query.productId;
  const type = req.query.type;

  try {
    const doc = await db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${productId}/`)
      .get();

    if (doc.data()) {
      if (type === "increment") {
        const quantity = doc.data().quantity + 1;
        const updatedItem = await db
          .collection("cartItems")
          .doc(`/${userId}/`)
          .collection("items")
          .doc(`/${productId}/`)
          .update({ quantity });
        return res.status(200).send({ success: true, data: updatedItem });
      } else {
        if (doc.data().quantity === 1) {
          await db
            .collection("cartItems")
            .doc(`/${userId}/`)
            .collection("items")
            .doc(`/${productId}/`)
            .delete()
            .then((result) => {
              return res.status(200).send({ success: true, data: result });
            });
        } else {
          const quantity = doc.data().quantity - 1;
          const updatedItem = await db
            .collection("cartItems")
            .doc(`/${userId}/`)
            .collection("items")
            .doc(`/${productId}/`)
            .update({ quantity });
          return res.status(200).send({ success: true, data: updatedItem });
        }
      }
    }
  } catch (err) {
    return res.send({ success: false, msg: `Error :,${err}` });
  }
};

module.exports.createCheckout = async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      user_id: req.body.user.user_id,
      cart: JSON.stringify(req.body.cart),
      total: req.body.total,
    },
  });

  const line_items = req.body.cart.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.product_name,
          images: [item.product_image],
          metadata: {
            id: item.product_id,
          },
        },
        unit_amount: item.product_price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: { allowed_countries: ["IN"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "inr" },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: { unit: "hour", value: 2 },
            maximum: { unit: "hour", value: 4 },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    customer: customer.id,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/`,
  });

  res.send({ url: session.url });
};

let endpointSecret;

module.exports.webHook = (req, res) => {
  const sig = req.headers["stripe-signature"];

  let eventType;
  let data;

  if (endpointSecret) {
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("event", event);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // Handle the event
  if (eventType === "checkout.session.completed") {
    stripe.customers.retrieve(data.customer).then((customer) => {
      // console.log("Customer deatils",customer);
      // console.log("data ",data);
      createOrder(customer, data, res);
    });
  }

  res.send().end();
};

const createOrder = async (customer, intent, res) => {
  try {
    const orderId = Date.now();
    const data = {
      intentId: intent.id,
      orderId: orderId,
      amount: intent.amount_total,
      created: intent.created,
      payment_method_types: intent.payment_method_types,
      status: intent.payment_status,
      customer: intent.customer_details,
      shipping_details: intent.shipping_details,
      userId: customer.metadata.user_id,
      items: JSON.parse(customer.metadata.cart),
      total: customer.metadata.total,
      sts: "preparing",
    };

    await db.collection("orders").doc(`/${orderId}/`).set(data);

    deleteCart(customer.metadata.user_id, JSON.parse(customer.metadata.cart));

    return res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
  }
};

const deleteCart = async (userId, items) => {
  items.map(async (data) => {
    await db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${data.product_id}/`)
      .delete()
      .then(() => console.log("successsfully deleted"));
  });
};

// Orders details

module.exports.orderDetails = async (req, res) => {
  (async () => {
    try {
      let query = db.collection("orders");
      let response = [];
      await query.get().then((querysnap) => {
        let docs = querysnap.docs;
        docs.map((doc) => {
          response.push({ ...doc.data() });
        });
        return response;
      });
      return res.status(200).send({ success: true, data: response });
    } catch (err) {
      return res.send({ success: false, msg: `Error: ${err}` });
    }
  })();
};

// update orders

module.exports.updateOrder = async (req, res) => {
  const orderId = req.params.orderId;
  const sts = req.query.status;

  try {
    const updateOrder = await db
      .collection("orders")
      .doc(`/${orderId}/`)
      .update({sts});

    console.log("updated order",updateOrder);

    return res.status(200).send({ success: true, data: updateOrder });
  } catch (err) {
    return res.send({ success: false, msg: `Error: ${err}` });
  }
};
