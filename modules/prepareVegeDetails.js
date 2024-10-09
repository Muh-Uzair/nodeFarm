module.exports = (data, htmlVegeDetails) => {
  let output = htmlVegeDetails.replace(/{%VEGEIMG%}/g, data.image);
  output = output.replace(/{%VEGENAME%}/g, data.productName);
  output = output.replace(/{%VEGEPRICE%}/g, data.price);
  output = output.replace(/{%VEGEDESCRIPTION%}/g, data.description);
  output = output.replace(/{%COUNTRYNAME%}/g, data.from);
  output = output.replace(/{%NUTRIENTS%}/g, data.nutrients);
  output = output.replace(/{%QUANTITY%}/g, data.quantity);
  output = output.replace(/{%PRICE%}/g, data.price);

  return output;
};
