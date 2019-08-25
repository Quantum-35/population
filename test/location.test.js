import chaiHttp from 'chai-http';
import chai from 'chai';
import dotenv from 'dotenv';

import server from '../src/index';
import db from '../src/sequelize/models';
import userData from './helpers/testData';

const { Location } = db;
const { expect } = chai;
const { locationCredentials, fakeToken } = userData;
chai.use(chaiHttp);

dotenv.config();

describe('Location', () => {
    after(async () => {
        await User.destroy({
          where: {
            email: 'testLocation'
          }
        });
      });
    it('should create a Location', (done) => {
        chai.request(server)
            .post('/api/location')
            .set('token', `${fakeToken}`)
            .send(userCredentials)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body.message).deep.equal('Location created successfully')
                done();
            });
    })

    it('should fetch a single location', (done) => {
        chai.request(server)
            .get('/api/location/Lagos')
            .set('token', `${fakeToken}`)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.success).deep.equal(true)
                done();
            });
    })

    it('should fetch  all location', (done) => {
        chai.request(server)
            .get('/api/location')
            .set('token', `${fakeToken}`)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.success).deep.equal(true)
                done();
            });
    })

    it('should update  single location', (done) => {
        chai.request(server)
            .put('/api/location/Lagos')
            .set('token', `${fakeToken}`)
            .send({femalePopulation: 3001})
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body.messages).deep.equal('Location Updated successfully')
                done();
            });
    })

    it('should delete  single location', (done) => {
        chai.request(server)
            .delete('/api/location/Lagos')
            .set('token', `${fakeToken}`)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.messages).deep.equal('Location deleted successfully!')
                done();
            });
    })

    it('should fail to delete location that does not exist', (done) => {
        chai.request(server)
            .delete('/api/location/DoesNotExist')
            .set('token', `${fakeToken}`)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.messages).deep.equal('Location not found!')
                done();
            });
    })
});