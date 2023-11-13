

const mongoose = require("mongoose");
const carritosRepository = require("../dao/repository/carritos.repository.js");

const obtenerCarrito = async (req, res, next) => {
  const cid = req.params.cid;

  if (!mongoose.Types.ObjectId.isValid(cid)) {
    return res.status(400).json({
      status: "error",
      mensaje: 'Requiere un argumento "cid" de tipo ObjectId válido',
    });
  }

  try {
    const carrito = await carritosRepository.obtenerCarritoPorId(cid);

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


const mongoose = require("mongoose");
//const carritosServices = require("../services/carritos.service.js");
const carritosRepository = require("../dao/repository/carritos.repository.js");

const obtenerCarrito = async (req, res, next) => {
  const cid = req.params.cid;

  if (!mongoose.Types.ObjectId.isValid(cid)) {
    return res.status(400).json({
      status: "error",
      mensaje: 'Requiere un argumento "cid" de tipo ObjectId válido',
    });
  }

  try {
    const carrito = await carritosRepository.obtenerCarrito(cid);

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

*/