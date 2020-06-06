const chai = require('chai'),
    chaiHTTP = require('chai-http'),
    app = require('../api'),
    jwt = require('jsonwebtoken'),
    db = require('../models'),
    secret = process.env.SECRET;

chai.use(chaiHTTP);
let token = '';
let configId = 0;

describe('Zone', () => {
    before(() => {
        return Promise.all([
            db.User.findOne({ where: { username: 'thomas' } }).then(u => {
                token = jwt.sign({ id: u.id }, secret, {
                    expiresIn: '1m'
                });
            }),
            db.Config.findOne({
                where: { name: 'configuration publique' }
            }).then(c => {
                configId = c.id;
            }),
            db.Area.destroy({ truncate: { cascade: true } })
        ]);
    });

    describe('Création', () => {
        it('Zone de jeu valide', done => {
            chai.request(app)
                .post(`/configs/${configId}/areas`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    forbidden: false,
                    coordinates: [
                        [100.0, 0.0],
                        [101.0, 0.0],
                        [101.0, 1.0],
                        [100.0, 1.0],
                        [100.0, 0.0]
                    ]
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('Deuxième zone de jeu', done => {
            chai.request(app)
                .post(`/configs/${configId}/areas`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    forbidden: false,
                    coordinates: [
                        [100.0, 0.0],
                        [101.0, 0.0],
                        [101.0, 1.0],
                        [100.0, 1.0],
                        [100.0, 0.0]
                    ]
                })
                .end((err, res) => {
                    res.should.have.status(409);
                    done();
                });
        });

        it('Zone interdite valide', done => {
            chai.request(app)
                .post(`/configs/${configId}/areas`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    forbidden: true,
                    coordinates: [
                        [100.0, 0.0],
                        [101.0, 0.0],
                        [101.0, 1.0],
                        [100.0, 1.0],
                        [100.0, 0.0]
                    ]
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe("Récupération des zones d'une configuration", () => {
        it('Valide', done => {
            chai.request(app)
                .get(`/configs/${configId}/areas`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.equal(2);
                    done();
                });
        });
    });

    describe('Modification', () => {
        it('Valide', done => {
            db.Area.findOne({ where: { ConfigId: configId } }).then(area => {
                chai.request(app)
                    .put(`/configs/${configId}/areas/${area.id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                        coordinates: [
                            [100.0, 0.0],
                            [102.0, 0.0],
                            [101.0, 1.0],
                            [100.0, 1.0],
                            [100.0, 0.0]
                        ]
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.position.coordinates[0][1][0].should.be.equal(
                            102.0
                        );
                        done();
                    });
            });
        });
    });

    describe('Suppression', () => {
        it('Valide', done => {
            db.Area.findOne({ where: { ConfigId: configId } }).then(area => {
                chai.request(app)
                    .delete(`/configs/${configId}/areas/${area.id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('message');
                        done();
                    });
            });
        });
    });
});
