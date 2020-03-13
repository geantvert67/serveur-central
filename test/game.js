const chai = require('chai'),
    chaiHTTP = require('chai-http'),
    should = chai.should(),
    app = require('../api'),
    db = require('../models');

chai.use(chaiHTTP);
let configId = 0;
let gameId = 0;

describe('Partie', () => {
    before(() => {
        return Promise.all([
            db.Config.findOne({
                where: { name: 'configuration publique' }
            }).then(c => {
                configId = c.id;
            }),
            db.Game.destroy({ truncate: { cascade: true } })
        ]);
    });

    it('Création', done => {
        chai.request(app)
            .post(`/games`)
            .send({ ip: '127.0.0.1', port: 8081, configId })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                gameId = res.body.id;
                done();
            });
    });

    it('Récupération', done => {
        chai.request(app)
            .get(`/games`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.equal(1);
                done();
            });
    });

    it('Suppression', done => {
        chai.request(app)
            .delete(`/games/${gameId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});
