const chai = require('chai'),
    chaiHTTP = require('chai-http'),
    should = chai.should(),
    app = require('../api'),
    jwt = require('jsonwebtoken'),
    db = require('../models'),
    secret = process.env.SECRET;

chai.use(chaiHTTP);
let token = '';

describe('Configuration', () => {
    before(() => {
        let user = null;

        return Promise.all([
            db.User.findOne({ where: { username: 'thomas' } }).then(u => {
                user = u;
                token = jwt.sign({ id: u.id }, secret, {
                    expiresIn: '1m'
                });
            }),
            db.Config.destroy({ truncate: { cascade: true } })
        ]);
    });

    describe('Création', () => {
        it('Confidentialité => privée', done => {
            chai.request(app)
                .post('/configs')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'configuration privée',
                    gameMode: 'SUPREMACY',
                    flagVisibilityRadius: 1.5,
                    flagActionRadius: 1.25,
                    flagCaptureDuration: 60,
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.isPrivate.should.be.true;
                    done();
                });
        });

        it('Confidentialité => publique', done => {
            chai.request(app)
                .post('/configs')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'configuration publique',
                    isPrivate: false,
                    gameMode: 'SUPREMACY',
                    flagVisibilityRadius: 1.5,
                    flagActionRadius: 1.25,
                    flagCaptureDuration: 60,
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.isPrivate.should.be.false;
                    done();
                });
        });

        it('Mode de jeu SUPREMACY avec une durée', done => {
            chai.request(app)
                .post('/configs')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'configuration',
                    gameMode: 'SUPREMACY',
                    duration: 100,
                    flagVisibilityRadius: 1.5,
                    flagActionRadius: 1.25,
                    flagCaptureDuration: 60,
                })
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

        it('Mode de jeu FLAG ou TIME sans durée', done => {
            chai.request(app)
                .post('/configs')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'configuration',
                    gameMode: 'TIME',
                    flagVisibilityRadius: 1.5,
                    flagActionRadius: 1.25,
                    flagCaptureDuration: 60,
                })
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

        it("Rayon d'action des drapeaux supérieur au rayon de visibilité", done => {
            chai.request(app)
                .post('/configs')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'configuration privée',
                    gameMode: 'SUPREMACY',
                    flagVisibilityRadius: 1.25,
                    flagActionRadius: 1.5,
                    flagCaptureDuration: 60,
                })
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });

    describe('Récupération', () => {
        it('Configurations publiques', done => {
            chai.request(app)
                .get('/configs')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.length.should.be.eql(1);
                    done();
                });
        });

        it('Mes configurations', done => {
            chai.request(app)
                .get('/user/configs')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.length.should.be.equal(2);
                    done();
                });
        });

        it("A partir d'un ID", done => {
            db.Config.findOne({
                name: 'configuration privée'
            }).then(config => {
                chai.request(app)
                    .get(`/configs/${config.id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.id.should.be.equal(config.id);
                        done();
                    });
            });
        });

        it("A partir d'un ID qui n'existe pas", done => {
            chai.request(app)
                .get(`/configs/-1`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe('Modification', () => {
        it('Changement de nom et de confidentialité', done => {
            db.Config.findOne({
                name: 'configuration privée'
            }).then(config => {
                chai.request(app)
                    .put(`/configs/${config.id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                        name: 'configuration publique 2',
                        isPrivate: false
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.isPrivate.should.be.false;
                        res.body.name.should.be.equal(
                            'configuration publique 2'
                        );
                        done();
                    });
            });
        });
    });

    describe('Suppression', () => {
        it('Avec succès', done => {
            db.Config.findOne({
                name: 'configuration publique 2'
            }).then(config => {
                chai.request(app)
                    .delete(`/configs/${config.id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('message');
                        done();
                    });
            });
        });
    });

    describe('Clonage', () => {
        it('Valide', done => {
            db.Config.findOne({
                name: 'configuration publique'
            }).then(config => {
                chai.request(app)
                    .post(`/configs/${config.id}/clone`)
                    .set('Authorization', `Bearer ${token}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.name.should.be.equal(config.name);
                        res.body.gameMode.should.be.equal(config.gameMode);
                        done();
                    });
            });
        });
    });
});
