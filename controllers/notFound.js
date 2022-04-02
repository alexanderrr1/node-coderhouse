const { response, request } = require('express');

const getNotFound = async(req = request, res = response) => {
    return res.status(404).json({
        msg: "Error 404, no existe el recurso solicitado"
    });
};

const postNotFound = async(req = request, res = response) => {
    return res.status(404).json({
        msg: "Error 404, no existe el recurso solicitado"
    });
};

const putNotFound = async(req = request, res = response) => {
    return res.status(404).json({
        msg: "Error 404, no existe el recurso solicitado"
    });
};

const deleteNotFound = async(req = request, res = response) => {
    return res.status(404).json({
        msg: "Error 404, no existe el recurso solicitado"
    });
};


module.exports = {
    getNotFound,
    postNotFound,
    putNotFound,
    deleteNotFound
}