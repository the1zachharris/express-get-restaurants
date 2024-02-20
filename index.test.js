const request = require('supertest');
const app = require('./src/app');
const db = require('./db/connection');
const { Restaurant } = require("./models/index")
const { seedRestaurant } = require("./seedData");


describe('Restaurant Tests', () => {

    beforeAll(async () => {
        await db.sync({ force: true });
        await Restaurant.bulkCreate(seedRestaurant)

    })

    test('testing GET restaurant endpoint', async () => {
        const res = await request(app).get('/restaurants');
        expect(res.statusCode).toBe(200);
        const resData = JSON.parse(res.text);
        expect(resData[0]).toEqual(
            expect.objectContaining({
                name: 'AppleBees',
                location: 'Texas',
                cuisine: 'FastFood'
            })
        );
    });
    test('testing GET restaurant/:id endpoint', async () => {
        const res = await request(app).get('/restaurants/' + 1);
        expect(res.statusCode).toBe(200);
        const resData = JSON.parse(res.text);
        expect(resData).toEqual(
            expect.objectContaining({
                name: 'AppleBees',
                location: 'Texas',
                cuisine: 'FastFood'
            })
        );
    });
    test('testing POST restaurant endpoint', async () => {
        const res = await request(app)
            .post('/restaurants')
            .send({
                name: 'test',
                location: 'test',
                cuisine: 'test'
            });
        expect(res.statusCode).toBe(200);
        const resData = JSON.parse(res.text);
        expect(resData).toEqual(
            expect.objectContaining({
                name: 'test',
                location: 'test',
                cuisine: 'test'
            })
        );
    });
    test('testing put restaurant endpoint', async () => {
        const res = await request(app)
            .put('/restaurants/' + 1)
            .send({
                name: 'test1',
                location: 'test',
                cuisine: 'test'
            });
        expect(res.statusCode).toBe(200);
        const resData = JSON.parse(res.text);
        expect(resData).toEqual(
            expect.objectContaining({
                name: 'test1',
                location: 'test',
                cuisine: 'test'
            })
        );
    });
    test('testing DELETE restaurant/:id endpoint', async () => {
        const res = await request(app).delete('/restaurants/1');
        const restaurants = await Restaurant.findAll();
        expect(res.statusCode).toBe(200);
        expect(restaurants[0].id).not.toEqual(1);
    });

})