module.exports = app => {
    const { existsOrError } = app.api.validation
    const { decodeToken } = app.api.decodeToken

    const save = (req, res) => {
        const data = { ...req.body }
        const pixels = JSON.stringify(data.art.pixels)
        try {
            existsOrError(data.art.pixels, 'Pintura inválida')
        } catch (msg) {
            res.status(400).send(msg)
        }

        const user = decodeToken(req.headers.authorization)
        const art = { pixels, authorId: user.id, proportion: data.art.proportion}

        
        app.db('art')
            .insert(art)
            .then(_ => res.sendStatus(200))
            .catch(e => console.log(e))
        res.status(200)

    }
    
    const get = (req, res) => {
        app.db('art')
            .select("*")
            .limit(16).offset(req.query.offset || 0)
            .then(query => res.send(query))
    }

    const getUserArts = (req, res) => {
        const user = decodeToken(req.headers.authorization)

        app.db('art')
            .select("*")
            .where({ authorId: user.id })
            .limit(16).offset(req.query.offset || 0)
            .then(query => res.send(query))
    }

    const getById = (req, res) => {
        app.db('art')
            .select("*")
            .where({ id: req.params.id })
            .first()
            .then(query => res.send(query))
        console.log(req.params)
    }

    return { save, get, getUserArts, getById }
}