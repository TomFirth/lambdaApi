'use strict';
const dynamodb = require("aws-sdk/clients/dynamodb");
const client = new dynamodb.DocumentClient();
const cors = require("./cors");

module.exports = {
  create: async event => {
    try {
      if (typeof bodyObj.registration === "undefined"
        || typeof bodyObj.registrationDate === "undefined"
        || typeof bodyObj.make === "undefined"
        || typeof bodyObj.model === "undefined"){
        console.error("Missing parameters", bodyObj)
        return {
          statusCode: 400,
          error: "Missing parameters",
          bodyObj
        }
      }
      const data = JSON.parse(event.body);
      const params = {
        TableName: 'vehicles',
        Item: {
          registration: data.registration,
          registrationDate: data.registrationDate,
          make: data.make,
          model: data.model
        }
      };
      await client.put(params).promise()
      return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Vehicle created',
            input: event,
          },
          null,
          2
        ),
      };
    } catch (error) {
      return cors.addHeaders({
        statusCode: 500,
        body: JSON.stringify(error)
      });
    }
  }
}