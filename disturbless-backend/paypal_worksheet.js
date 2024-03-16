require("dotenv").config();
const { getOrderData, init } = require("./paypal/paypal");

async function testPayPalModule() {
  let response = await init();
  console.log(response);
  let orderData = await getOrderData("50151335U8243491J");
  console.log(orderData);
}

testPayPalModule();