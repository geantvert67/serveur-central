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

describe('Drapeau', () => {
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
            db.Flag.destroy({ truncate: { cascade: true } })
        ]);
    });

    describe('Création', () => {
        it('Valide', done => {
            chai.request(app)
                .post(`/configs/${configId}/flags`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    visibilityRadius: 1.5,
                    actionRadius: 1.25,
                    captureDuration: 60,
                    coordinates: [39.807222, -76.984722]
                })
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

        it("Rayon d'action supérieur au rayon de visibilité", done => {
            chai.request(app)
                .post(`/configs/${configId}/flags`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    visibilityRadius: 1.25,
                    actionRadius: 1.5,
                    captureDuration: 60,
                    coordinates: [39.807222, -76.984722]
                })
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });

    describe('Récupération', () => {
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
});
