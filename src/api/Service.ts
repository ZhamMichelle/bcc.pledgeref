import React from 'react'
import axios from 'axios';
class Service {
  getRestClient() {
      var serviceInstance;
    if (!serviceInstance) {
      serviceInstance = axios.create({
        baseURL: 'http://localhost:5000',
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
          },
      });
    }
    return serviceInstance;
  }
}

export default new Service(); 