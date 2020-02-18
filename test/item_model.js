const chai = require('chai'),
    chaiHTTP = require('chai-http'),
    should = chai.should(),
    app = require('../api'),
    jwt = require('jsonwebtoken'),
    db = require('../models'),
    secret = process.env.SECRET;

chai.use(chaiHTTP);
let token = '';
let configId = 0;

describe("Modèle d'item", () => {
    before(() => {
        let user = null;

        return Promise.all([
            db.User.findOne({ where: { username: 'thomas' } }).then(u => {
                user = u;
                token = jwt.sign({ id: u.id }, secret, {
                    expiresIn: '1m'
                });
            }),
            db.Config.findOne({
                where: { name: 'configuration publique' }
            }).then(c => {
                configId = c.id;
            }),
            db.ItemModel.destroy({ truncate: { cascade: true } })
        ]);
    });

    describe('Création', () => {
        it('Avec peu de détails', done => {
            chai.request(app)
                .post(`/configs/${configId}/item-models`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'lunettes',
                    visibilityRadius: 1.5,
                    actionRadius: 1.25
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('Avec des détails', done => {
            chai.request(app)
                .post(`/configs/${configId}/item-models`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'mine',
                    visibilityRadius: 1.5,
                    actionRadius: 1.25,
                    waitingPeriod: 600,
                    autoMove: false
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('Avec un nom déjà utilisé', done => {
            chai.request(app)
                .post(`/configs/${configId}/item-models`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'lunettes',
                    visibilityRadius: 1.5,
                    actionRadius: 1.25
                })
                .end((err, res) => {
                    res.should.have.status(409);
                    done();
                });
        });
    });

    describe("Récupération des modèles d'item d'une configuration", () => {
        it('Valide', done => {
            chai.request(app)
                .get(`/configs/${configId}/item-models`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.equal(2);
                    done();
                });
        });
    })
});