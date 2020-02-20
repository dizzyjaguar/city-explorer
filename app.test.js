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



describe('/GET /location', () => {
    test('should respond with formatted query, latitue, and longitude', 
    
        async(done) => {

            const response = await request(app)
                .get('/location');
            
            expect(response.body).toEqual({
                formatted_query: expect.any(String),
                latitude: expect.any(String),
                longitude: expect.any(String)
            });

            expect(response.statusCode).toBe(200);

            done();
        
        });
    
});

