const chai = require('chai'),
    chaiHTTP = require('chai-http'),
    should = chai.should(),
    app = require('../api'),
    jwt = require('jsonwebtoken'),
    db = require('../models'),
    secret = process.env.SECRET;

chai.use(chaiHTTP);
let user = null;
let token = '';
let configId = 0;
let teamId = 0;

describe("Membre d'une équipe", () => {
    before(() => {
        return Promise.all([
            db.User.findOne({ where: { username: 'thomas' } }).then(u => {
                user = u;
                token = jwt.sign({ id: u.id }, secret, {
                    expiresIn: '1m'
                });
            }),
            db.User.create({ username: 'louis', password: 'louis' }),
            db.Config.findOne({
                where: { name: 'configuration publique' }
            }).then(c => {
                configId = c.id;
                return c
                    .createTeam({
                        name: 'équipe 3',
                        color: '#fff'
                    })
                    .then(t => (teamId = t.id));
            })
        ]);
    });

    describe('Ajout', () => {
        it('Valide', done => {
            chai.request(app)
                .post(`/configs/${configId}/teams/${teamId}/users`)
                .set('Authorization', `Bearer ${token}`)
                .send({ username: 'thomas' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.username.should.be.equal('thomas');
                    done();
                });
        });

        it("Utilisateur faisant déjà partie de l'équipe", done => {
            chai.request(app)
                .post(`/configs/${configId}/teams/${teamId}/users`)
                .set('Authorization', `Bearer ${token}`)
                .send({ username: 'thomas' })
                .end((err, res) => {
                    res.should.have.status(409);
                    done();
                });
        });

        it('Équipe pleine', done => {
            chai.request(app)
                .post(`/configs/${configId}/teams/${teamId}/users`)
                .set('Authorization', `Bearer ${token}`)
                .send({ username: 'louis' })
                .end((err, res) => {
                    chai.request(app)
                        .post(`/configs/${configId}/teams/${teamId}/users`)
                        .set('Authorization', `Bearer ${token}`)
                        .send({ username: 'thomas' })
                        .end((err, res) => {
                            res.should.have.status(400);
                            done();
                        });
                });
        });
    });

    describe('Récupération', () => {
        it('Valide', done => {
            chai.request(app)
                .get(`/configs/${configId}/teams/${teamId}/users`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.equal(2);
                    done();
                });
        });
    });

    describe('Retrait', () => {
        it('Valide', done => {
            chai.request(app)
                .delete(`/configs/${configId}/teams/${teamId}/users/${user.id}`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message');
                    done();
                });
        });
    });
});
