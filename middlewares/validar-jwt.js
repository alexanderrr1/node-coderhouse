const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // Leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( uid );

        if( !usuario ){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existente'
            })
        }

        // Verificar si el uid tiene estado true (Esta activo)
        if(!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario inactivo'
            })
        }

        req.usuario = usuario;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });

    }


}

module.exports = {
    validarJWT
}