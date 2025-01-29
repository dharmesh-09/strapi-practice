// @ts-nocheck
("use strict");
const stripe = require("stripe")("sk_test_51Qm7rl2Y1Xr2k5SgdIVBh6LUQPgK0VQq9E0Af6QGZOR1m4IJqMGp23xP8voK1V7Fis7TvsQ3Yt4VMsUSazTGOwjT00XKX6XLDR");


const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
    async create(ctx) {
        const { products } = ctx.request.body;

try {
  const lineItems = await Promise.all(
    products.map(async (product) => {

      const item = await strapi
        .service("api::product.product")
        .find({ where: { id: product.id } });

      const productData = item?.results[0];

      if (!productData || !productData.price) {
        throw new Error(`Invalid product or price missing for ID: ${product.id}`);
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: productData.title,
          },
          unit_amount: Math.round(productData.price * 100), 
        },
        quantity: product.quantity,
      };
    })
  );

  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: { allowed_countries: ["US", "CA"] },
    payment_method_types: ["card"],
    mode: "payment",
    success_url: process.env.CLIENT_URL + "?success=true",
    cancel_url: process.env.CLIENT_URL + "?success=false",
    line_items: lineItems,
  });

  await strapi
    .service("api::order.order")
    .create({ data: { products, stripeId: session.id } });

  return { stripeSession: session };
} catch (error) {
  ctx.response.status = 500;
  console.log(error);
  return { error };
}

    },
}));