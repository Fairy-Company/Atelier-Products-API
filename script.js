import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  scenarios: {
    constantTest: {
      executor: 'constant-arrival-rate',
      duration: '10s',
      rate: '300',
      timeUnit: '1s',
      preAllocatedVUs: 20,
      maxVUs: 200,
    },
  },
};

export const errorRate = new Rate('errors');



export default function () {
  const url = 'http://localhost:3000/products?count=20&page=100';
  const params = {
    headers: {
      'Authorization': 'Token ffc62b27db68502eebc6e90b7c1476d29c581f4d',
      'Content-Type': 'application/json',
    },
  };
  check(http.get(url, params), {
    'status is 200': (r) => r.status == 200,
  }) || errorRate.add(1);
}
