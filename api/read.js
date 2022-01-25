'use strict';
const dynamodb = require("aws-sdk/clients/dynamodb");
const client = new dynamodb.DocumentClient();
const cors = require("./cors");

module.exports = {
  read: async event => {
    if (event.pathParameters.registration) {  
      try {
        const params = {
          TableName: 'vehicles',
          Item: {
            registration: event.pathParameters.registration
          }
        };
        const result = await client.get(params).promise()
        return cors.addHeaders({
          statusCode: 200,
          body: JSON.stringify({
            registration: result.Item.registration,
            registrationDate: result.Item.registrationDate,
            make: result.Item.make,
            model: result.Item.model,
          })       
        });
      } catch (error) {
        return cors.addHeaders({
          statusCode: 500,
          body: JSON.stringify(error)
        });
      }
    } else {
      return cors.addHeaders({
        statusCode: 400,
        body: "Missing vehicle registration"
      });
    }
  },
  readAll: async event => {
    try {
      const params = {
        TableName: 'vehicles'
      };
      const result = await client.scan(params).promise()
      return {
        statusCode: 200,
        body: JSON.stringify(result.Item.map(vehicle => {
          return cors.addHeaders({
            statusCode: 200,
            body: {
              registration: vehicle.registration,
              registrationDate: vehicle.registrationDate,
              make: vehicle.make,
              model: vehicle.model,
            }   
          });
        }))
      };
    } catch (error) {
      return cors.addHeaders({
        statusCode: 500,
        body: JSON.stringify(error)
      });
    }
  }
}