const jwt = require('jwt-simple');
const moment = require('moment');
const { User } = require('../db');

// verificar token
const checkToken = (req, res, next) => {

    if(!req.headers['authorization']){
        res.status('404').json({ error: 'Necesitas icluir el token en la cabecera' })
    }

    const userToken = req.headers['authorization'];
    let payload = {}

    try{
        payload = jwt.decode(userToken, 'deliahResto')
    } catch (err){
        return res.json({ error: 'El token es incorrecto' })
    }

    if(payload.expiredAt < moment().unix()){
        return res.json({ error: 'El token ha expirado'})
    }

    req.usuarioId = payload.usuarioId;
    req.role = payload.role;

    next();
}

// verificar si es admin
const adminRole = async (req, res, next) => {
    const role = req.role;
    if(role == 'admin'){
        next();
    } else {
        return res.status(401).json({
            error: "Usuario no Autorizado!",
        });
    }
}


module.exports = {
    checkToken,
    adminRole
}