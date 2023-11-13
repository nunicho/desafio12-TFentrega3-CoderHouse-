//const carritosModelo = require("../dao/DB/models/carritos.modelo.js");
const Carrito = require("../DB/models/carritos.modelo.js");
const Producto = require("../DB/models/productos.modelo.js");

class CarritosRepository {
  async obtenerCarritoPorId(id) {
    try {
      const carrito = await Carrito.findOne({ _id: id })
        .populate({
          path: "productos.producto",
          model: Producto,
        })
        .lean();
      return carrito;
    } catch (error) {
      throw new Error("Error al obtener el carrito desde la base de datos");
    }
  }

  // Puedes agregar más métodos según tus necesidades, como crearCarrito, actualizarCarrito, eliminarCarrito, etc.
}

module.exports = new CarritosRepository();

/*
//const carritosModelo = require("../dao/DB/models/carritos.modelo.js");
const prodModelo = require("../DB/models/productos.modelo.js");
const mongoose = require("mongoose");

//const carritoMongoDao = require("../carritosMongoDao.js");
const carritosMongoDao = require("../carritosMongoDao.js");

const obtenerCarrito = async (req, res, next) => {
  const cid = req.params.cid;

  if (!mongoose.Types.ObjectId.isValid(cid)) {
    return res.status(400).json({
      status: "error",
      mensaje: 'Requiere un argumento "cid" de tipo ObjectId válido',
    });
  }

  const carrito = await carritosMongoDao
    .findOne({ _id: cid })
    .populate({
      path: "productos.producto",
      model: prodModelo,
    })
    .lean();

  if (!carrito) {
    return res.status(404).json({
      status: "error",
      mensaje: `El carrito con ID ${cid} no existe`,
    });
  }

  res.locals.carritoDB = carrito;
  next();
};

module.exports = {
  obtenerCarrito,
};
*/