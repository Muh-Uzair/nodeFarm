module.exports = (val, htmlVegesListElement) => {
  let output = htmlVegesListElement.replace(/{%VEGEIMG%}/g, val.image);
  output = output.replace(/{%VEGENAME%}/g, val.productName);
  if (val.organic) {
    output = output.replace(/{%VEGEORGANIC%}/g, "ORGANIC");
  }
  if (!val.organic) {
    output = output.replace(/{%VEGEORGANIC%}/g, "");
  }
  output = output.replace(/{%VEGEQUANTITY%}/g, val.quantity);
  output = output.replace(/{%VEGEPRICE%}/g, val.price);
  output = output.replace(/{%VEGENAME%}/g, val.image);

  return output;
};
