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
let itemModelId = 0;

describe('Item', () => {
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
            db.ItemModel.findOne({ where: { name: 'lunettes' } }).then(
                im => (itemModelId = im.id)
            ),
            db.Item.destroy({ truncate: { cascade: true } })
        ]);
    });

    describe('Création', () => {
        it('Avec une quantité', done => {
            chai.request(app)
                .post(`/configs/${configId}/item-models/${itemModelId}/items`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    quantity: 5,
                    coordinates: [39.807222, -76.984722]
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.quantity.should.be.equal(5);
                    done();
                });
        });

        it('Sans quantité', done => {
            chai.request(app)
                .post(`/configs/${configId}/item-models/${itemModelId}/items`)
                .set('Authorization', `Bearer ${token}`)
                .send({ coordinates: [39.807222, -76.984722] })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.quantity.should.be.equal(1);
                    done();
                });
        });
    });

    describe('Récupération', () => {
        it("A partir d'un modèle d'item", done => {
            chai.request(app)
                .get(`/configs/${configId}/item-models/${itemModelId}/items`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.equal(2);
                    done();
                });
        });

        it("A partir d'une configuration", done => {
            chai.request(app)
                .get(`/configs/${configId}/items`)
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
        let itemModelId = 0;
        let itemId = 0;

        before(() => {
            return db.ItemModel.findOne({ where: { name: 'lunettes' } }).then(
                itemModel => {
                    itemModelId = itemModel.id;
                    return db.Item.findOne({
                        where: { ItemModelId: itemModel.id }
                    }).then(item => (itemId = item.id));
                }
            );
        });

        it('Valide', done => {
            chai.request(app)
                .put(
                    `/configs/${configId}/item-models/${itemModelId}/items/${itemId}`
                )
                .set('Authorization', `Bearer ${token}`)
                .send({ quantity: 9, coordinates: [29.807222, -59.984722] })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.quantity.should.be.equal(9);
                    done();
                });
        });
    });

    describe('Suppression', () => {
        let itemModelId = 0;
        let itemId = 0;

        before(() => {
            return db.ItemModel.findOne({ where: { name: 'lunettes' } }).then(
                itemModel => {
                    itemModelId = itemModel.id;
                    return db.Item.findOne({
                        where: { ItemModelId: itemModel.id }
                    }).then(item => (itemId = item.id));
                }
            );
        });

        it('Valide', done => {
            chai.request(app)
                .delete(
                    `/configs/${configId}/item-models/${itemModelId}/items/${itemId}`
                )
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message');
                    done();
                });
        });
    });
});
