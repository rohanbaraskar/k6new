import http from 'k6/http';
import { check, group } from 'k6';
import { jUnit } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';

const baseUrl = 'http://jsonplaceholder.typicode.com';

export const options = {
  vus: 10,
  stages: [
    { duration: '1s', target: 1 },
    { duration: '1s', target: 1 },
    { duration: '1s', target: 0 },
  ],
  thresholds: {
    checks: [
      { threshold: 'rate>0.9' },
    ],
    http_req_duration: ['avg<200'],
  },
}

export default function () {
  group('JSON Placeholder Performance Testing', function () {
    group('Posts endpoint', function () {
      const res = http.get(`${baseUrl}/posts`);
      check(res, {
        'is status code 200': (r) => r.status === 200,
      });
    });

    group('Todos endpoint', function () {
      const res = http.get(`${baseUrl}/todos`);
      check(res, {
        'is status code 200': (r) => r.status === 200,
      });
    });

    
    
    })
}

export function handleSummary(data) {
  console.log('Preparing the end-of-test summary...');

  return {
    'junit.xml': jUnit(data), // Transform summary and save it as a JUnit XML...
  };
}
   
   



  