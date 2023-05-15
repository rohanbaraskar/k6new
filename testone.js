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
};

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

    group('Todos endpoint (invalid)', function () {
      const res = http.get(`${baseUrl}/todoss`);
      check(res, {
        'is status code 200': (r) => r.status === 404,
      });
    });

    group('Get  api validate response ', function () {
        const res = http.get(`https://run.mocky.io/v3/5cd18696-44aa-42bc-a812-3cceb26a9006`);

        let body = JSON.parse(res.body)

        //Print
        console.log(`respone body is ${JSON.stringify(body)}`)
        console.log(`Message is ${body.status}`)

        
        check(res, {
          'is status code 200': (r) => r.status === 200,
          'is tag present in response: ' : (r) => JSON.parse(r.body).status === "ok",
        });
      });
      
      
    
    });

}

  