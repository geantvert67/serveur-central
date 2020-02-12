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

describe('Équipe', () => {
    before(() => {
        let user = null;

        return Promise.all([
            db.User.findOne({ where: { username: 'clement' } }).then(u => {
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
            db.Team.destroy({ truncate: { cascade: true } })
        ]);
    });

    describe('Création', () => {
        it('Valide', done => {
            chai.request(app)
                .post(`/configs/${configId}/teams`)
                .set('Authorization', `Bearer ${token}`)
                .send({ name: 'équipe 1', color: '#e1e1e1' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("Nom d'équipe déjà pris", done => {
            chai.request(app)
                .post(`/configs/${configId}/teams`)
                .set('Authorization', `Bearer ${token}`)
                .send({ name: 'équipe 1', color: '#fff' })
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

        it('Couleur déjà prise', done => {
            chai.request(app)
                .post(`/configs/${configId}/teams`)
                .set('Authorization', `Bearer ${token}`)
                .send({ name: 'équipe 2', color: '#e1e1e1' })
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });

    describe("Récupération des équipes d'une configuration", () => {
        it('Valide', done => {
            chai.request(app)
                .get(`/configs/${configId}/teams`)
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
            db.Team.findOne({ name: 'équipe 1' }).then(team => {
                chai.request(app)
                    .put(`/configs/${configId}/teams/${team.id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({ name: 'équipe 2' })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.name.should.be.equal('équipe 2');
                        done();
                    });
            });
        });
    });

    describe('Suppresion', () => {
        it('Valide', done => {
            db.Team.findOne({ name: 'équipe 2' }).then(team => {
                chai.request(app)
                    .delete(`/configs/${configId}/teams/${team.id}`)
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
