

const mongoose = require("mongoose");
//const carritosServices = require("../services/carritos.service.js");
const carritosMongoDao = require("../dao/carritosMongoDao.js");

const obtenerCarrito = async (req, res, next) => {
  const cid = req.params.cid;

  if (!mongoose.Types.ObjectId.isValid(cid)) {
    return res.status(400).json({
      status: "error",
      mensaje: 'Requiere un argumento "cid" de tipo ObjectId válido',
    });
  }

  try {
    const carrito = await carritosMongoDao.obtenerCarritoPorId(cid);

    if (!carrito) {
      return res.status(404).json({
        status: "error",
        mensaje: `El carrito con ID ${cid} no existe`,
      });
    }

    res.locals.carritoDB = carrito;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  obtenerCarrito,
};



/*
const carritosServices = require("../services/carritos.service.js");

const obtenerCarrito = async (req, res, next) => {
  try {
    await carritosServices.obtenerCarrito(req, res, next);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  obtenerCarrito,
};
*/