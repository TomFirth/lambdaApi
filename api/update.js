'use strict';
const dynamodb = require("aws-sdk/clients/dynamodb");
const client = new dynamodb.DocumentClient();
const cors = require("./cors");

module.exports = {
  update: async event => {
    let bodyObj = {}
    try {
      bodyObj = JSON.parse(event.body)
    } catch(error){
      console.error(error)
      return {
        statusCode: 400,
        error
      }
    }

    if (typeof bodyObj.registration === "undefined") {
      return cors.addHeaders({
        statusCode: 400,
        body: "Missing vehicle registration"
      });
    }

    try {
      const params = {
        TableName = "vehicles",
        Key: {
          registration: bodyObj.registration
        },
        ExpressionAttributeValues: {
          ":registrationDate": bodyObj.registrationDate,
          ":make": bodyObj.make,
          ":model": bodyObj.model
        }
      }
      await client.update(params).promise()
    } catch (error) {
      return cors.addHeaders({
        statusCode: 500,
        body: JSON.stringify(error)
      });
    }
  }
}