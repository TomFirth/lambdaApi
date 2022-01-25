'use strict';
const dynamodb = require("aws-sdk/clients/dynamodb");
const client = new dynamodb.DocumentClient();
const cors = require("./cors");

module.exports = {
  delete: async event => {
    try {
      const params = {
        TableName: 'vehicles',
        Item: {
          registration: event.pathParameters.registration
        }
      };
      await client.delete(params).promise()
    } catch (error) {
      return cors.addHeaders({
        statusCode: 500,
        body: JSON.stringify(error)
      });
    }
  }
}