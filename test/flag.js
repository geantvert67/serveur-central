const chai = require('chai'),
    chaiHTTP = require('chai-http'),
    app = require('../api'),
    jwt = require('jsonwebtoken'),
    db = require('../models'),
    secret = process.env.SECRET;

chai.use(chaiHTTP);
let token = '';
let configId = 0;

describe('Drapeau', () => {
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
            db.Flag.destroy({ truncate: { cascade: true } })
        ]);
    });

    describe('Création', () => {
        it('Valide', done => {
            chai.request(app)
                .post(`/configs/${configId}/flags`)
                .set('Authorization', `Bearer ${token}`)
                .send({ coordinates: [39.807222, -76.984722] })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('Sans paramtètre', done => {
            chai.request(app)
                .post(`/configs/${configId}/flags`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(406);
                    done();
                });
        });
    });

    describe("Récupération des drapeaux d'une configuration", () => {
        it('Valide', done => {
            chai.request(app)
                .get(`/configs/${configId}/flags`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.equal(1);
                    done();
                });
        });
    });

    describe('Modification', () => {
        it('Valide', done => {
            db.Flag.findOne({ where: { ConfigId: configId } }).then(flag => {
                chai.request(app)
                    .put(`/configs/${configId}/flags/${flag.id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({ coordinates: [40.0, -77.0] })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.position.coordinates[0].should.be.equal(40.0);
                        done();
                    });
            });
        });
    });

    describe('Suppression', () => {
        it('Valide', done => {
            db.Flag.findOne({ where: { ConfigId: configId } }).then(flag => {
                chai.request(app)
                    .delete(`/configs/${configId}/flags/${flag.id}`)
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
