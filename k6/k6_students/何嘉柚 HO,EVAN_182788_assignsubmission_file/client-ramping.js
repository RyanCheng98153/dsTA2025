import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    // 請實作以下內容
    { duration: '2s', target: 400 },
    { duration: '2s', target: 800 },
    { duration: '2s', target: 1200 },
    { duration: '2s', target: 1600 },
    { duration: '2s', target: 2000 },
    { duration: '2s', target: 2400 },
    // 請實作以上內容
  ],
};

export default function () {
  http.post('http://localhost:3000/shop');
  sleep(1);
}
