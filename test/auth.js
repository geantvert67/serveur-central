const chai = require('chai'),
    chaiHTTP = require('chai-http'),
    should = chai.should(),
    app = require('../api'),
    db = require('../models');

chai.use(chaiHTTP);

describe('Authentification', () => {
    before(() => {
        return db.User.destroy({ truncate: { cascade: true } });
    });

    describe('Inscription', () => {
        it('Valide', done => {
            chai.request(app)
                .post('/signup')
                .send({ username: 'clement', password: 'clement' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('user');
                    res.body.should.have.property('token');
                    done();
                });
        });

        it('Sans paramètre', done => {
            chai.request(app)
                .post('/signup')
                .end((err, res) => {
                    res.should.have.status(406);
                    done();
                });
        });

        it("Avec un nom d'utilisateur déjà utilisé", done => {
            chai.request(app)
                .post('/signup')
                .send({ username: 'clement', password: 'clement' })
                .end((err, res) => {
                    res.should.have.status(409);
                    done();
                });
        });
    });

    describe('Connexion', () => {
        it('Valide', done => {
            chai.request(app)
                .post('/signin')
                .send({ username: 'clement', password: 'clement' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('user');
                    res.body.should.have.property('token');
                    done();
                });
        });

        it('Sans paramètre', done => {
            chai.request(app)
                .post('/signin')
                .end((err, res) => {
                    res.should.have.status(406);
                    done();
                });
        });

        it('Mauvais identifiants', done => {
            chai.request(app)
                .post('/signin')
                .send({ username: 'clement', password: 'oublié' })
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });
});
