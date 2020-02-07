const chai = require('chai'),
    chaiHTTP = require('chai-http'),
    should = chai.should(),
    app = require('../api');

chai.use(chaiHTTP);
let token = '';

describe('Utilisateur', () => {
    before(done => {
        chai.request(app)
            .post('/signin')
            .send({ username: 'clement', password: 'clement' })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    describe('Récupérer son profil', () => {
        it('Valide', done => {
            chai.request(app)
                .get('/user')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('Sans token', done => {
            chai.request(app)
                .get('/user')
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });

    describe("Modifier son nom d'utilisateur", () => {
        it('Valide', done => {
            chai.request(app)
                .put('/user')
                .set('Authorization', `Bearer ${token}`)
                .send({ username: 'thomas' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('Sans paramètre', done => {
            chai.request(app)
                .put('/user')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(406);
                    done();
                });
        });

        it('Déjà utilisé', done => {
            chai.request(app)
                .put('/user')
                .set('Authorization', `Bearer ${token}`)
                .send({ username: 'thomas' })
                .end((err, res) => {
                    res.should.have.status(409);
                    done();
                });
        });
    });

    describe('Modifier son mot de passe', () => {
        it('Valide', done => {
            chai.request(app)
                .put('/user/password')
                .set('Authorization', `Bearer ${token}`)
                .send({ currentPassword: 'clement', newPassword: 'thomas' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message');
                    done();
                });
        });

        it('Sans paramètre', done => {
            chai.request(app)
                .put('/user/password')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(406);
                    done();
                });
        });

        it('Mauvais mot de passe', done => {
            chai.request(app)
                .put('/user/password')
                .set('Authorization', `Bearer ${token}`)
                .send({ currentPassword: 'clement', newPassword: 'thomas' })
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });
});
