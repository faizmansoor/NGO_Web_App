import http from 'http';

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/ngo/login',  // Your endpoint here
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Response:', data);
    });
});

const requestBody = JSON.stringify({
    email: 'ramesh@email.com',
    password: 'password',
});

req.write(requestBody);
req.end();
