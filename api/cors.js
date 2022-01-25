module.exports.addHeaders = response => {
  response.headers = response.headers || {};
  response.headers["Access-Control-Allow-Origin"] = "*";
  response.headers["Access-Control-Allow-Credentials"] = true;

  return response;
};