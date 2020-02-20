const { app } = require('./app.js');
const request = require('supertest');

describe('/GET /', () => {
    test('should respond with a hello message', 
    
        async(done) => {

            const response = await request(app)
                .get('/');
            
            expect(response.body).toEqual({
                message: 'hello! :D'
            });

            expect(response.statusCode).toBe(200);

            done();
        
        });
    
});
