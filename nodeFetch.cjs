const fetch = require('node-fetch');
const express = require('express');
const app = express();
const cors = require('cors');
const request = require('request');


app.use(cors())

app.get('/api', (req, res) => {

    const url = 'https://api.pipefy.com/graphql';

    request.post({
        url: url,
        json: true,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJQaXBlZnkiLCJpYXQiOjE3MDgzNDQwMjMsImp0aSI6ImU0NThlMjAyLTA4ZGMtNGUxZS1hMGU4LWQ5NWFlODhjNGY2YyIsInN1YiI6MzAzMzM3Mjc4LCJ1c2VyIjp7ImlkIjozMDMzMzcyNzgsImVtYWlsIjoianZmZGV2ZWxvcG1lbnRAZ21haWwuY29tIiwiYXBwbGljYXRpb24iOjMwMDMyMjk0Miwic2NvcGVzIjpbXX0sImludGVyZmFjZV91dWlkIjpudWxsfQ.hmMYZXFhVTq1GV-1Aw7zUPK9IZCsdtevSNstr4pPihOAr4Sd6Mk-BDFv04iz5_ibls_N_t45s9vsE7EYV4Pu5Q',
            'Content-Type': 'application/json'
        },
        body: {query: '{ pipe(id:304005965){id name phases{id name cards_count cards{edges{node{id title id labels{name} fields{name value} url createdBy{name}}}}}}}'}
      }, (error, response, data) => {
        if (error) {
          console.error('Error:', error);
          res.status(500).send('Internal Server Error');
          return;
      }

      if (response.statusCode !== 200) {
          console.error('API Error:', data);
          res.status(response.statusCode).send('API Error');
          return;
      }

      console.log(data);
      res.json(data); 
    
      });
    
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
