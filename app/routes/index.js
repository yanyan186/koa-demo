module.exports = function(app) {
	var Router 		= require('koa-router'), 
		indexCtrl 	= require('../controllers/index');
		blogCtrl 	= require('../controllers/blog');

	var router = new Router();
	var bodyParser = require('koa-bodyparser')();

	router
		.get('/', indexCtrl.index)
		.get('/link/:id', function *(next) {
			console.log('/link/'+this.params.id);
			this.body = "Get value from params : "+ this.params.id;
		})
		.get('/render/view', indexCtrl.view)
		.get('/view/:id', indexCtrl.test)
                .get('/blog/get/:id', blogCtrl.get)
                .get('/blog/get', blogCtrl.get)
                .post('/blog/post', bodyParser, blogCtrl.post);

	app.use(router.middleware());
};
