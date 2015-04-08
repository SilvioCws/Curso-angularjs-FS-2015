var movimientosData = require('./data/movimientosData.js');
var usuariosData = require('./data/usuariosData.js');

module.exports.routeMovimientos = function (app) {

	app.route('/api/priv/movimientos')
		.get(function (req, res, next) {
			movimientosData.gettingByUsuario(req.usuario)
				.then(function (data) {
					res.json(data);
				})
				.fail(function (err) {
					res.status(500).send(err);
				});
		})
		.post(function (req, res, next) {
			var movimiento = req.body;
			movimiento.usuario = req.usuario;
			movimientosData.posting(movimiento)
				.then(function (data) {
					usuariosData.updatingTotal(movimiento)
						.then(function (data) {
							res.json(data);
						})
						.fail(function (err) {
							res.status(500).send(err);
						});
				})
				.fail(function (err) {
					res.status(500).send(err);
				});
		});

	app.get('/api/priv/movimientos/:id', function (req, res, next) {
		movimientosData.gettingByIdUsuario(req.params.id, req.usuario)
			.then(function (data) {
				res.json(data);
			})
			.fail(function (err) {
				res.status(500).send(err);
			});
	});

	app.get('/api/priv/total', function (req, res, next) {
		usuariosData.gettingByEmail(req.usuario)
			.then(function (data) {
				res.json(data.total);
			})
			.fail(function (err) {
				res.status(500).send(err);
			});
	});
}