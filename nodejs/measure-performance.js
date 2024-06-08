// @ts-check

const { createLog, log } = require("./create-log.js");


const { connectChildMultitrading } = require("./multitrading.js");
const http = require('http');
const https = require('https');



module.exports = {
    measurePerformance
}



connectChildMultitrading(measurePerformance);

async function measurePerformance({
    url,
    method,
    data
}) {
    const start = Date.now();
    const requests = data.map(item => {
        //return makeRequest(url, method, data);
        if (method === 'GET') {
            return fetch(url, {
                method: method,
            })
        }
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
    });

    await Promise.all(requests);

    const end = Date.now();
    const totalTime = end - start;
    const averageTime = totalTime / data.length;

    const result = {
        request: method + '_' + url,
        totalRequests: data.length,
        totalTime,
        averageTime
    };
    return result
}



function makeRequest(url, method = 'GET', body = null) {
    return new Promise((resolve, reject) => {
      const lib = url.startsWith('https') ? https : http;
      
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      if (body) {
        body = JSON.stringify(body);
        options.headers['Content-Length'] = Buffer.byteLength(body);
      }
  
      const req = lib.request(url, options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(data);
        });
      });
  
      req.on('error', (e) => {
        reject(e);
      });
  
      if (body) {
        req.write(body);
      }
  
      req.end();
    });
  }
  