module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)
    
    
    app.route('/art')
    .all(app.config.passport.authenticate())
    .post(app.api.art.save)
    .get(app.api.art.get)
    
    app.route('/art/:id')
    .all(app.config.passport.authenticate())
    .get(app.api.art.getById)
    
    
    app.route('/myarts')
        .all(app.config.passport.authenticate())
        .get(app.api.art.getUserArts)
}