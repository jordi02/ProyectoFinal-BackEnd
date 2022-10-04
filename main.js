const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const fs = require("fs");
const Contenedor = require("./constructor");
const constructor = new Contenedor("./data/productos.json");
const productosRouter = require("./src/routes/productos");
const carritoRouter = require("./src/routes/carrito");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("views"));



/////////////////////////
// HANDLE BARS VIEWS/////
/////////////////////////
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    layoutsDir: __dirname + "/views",
    defaultLayout: "main",
  })
);

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("root", {
    layout: "root",
    title: "Página principal",
    Precio: "Precio",
    addProd: "Añadir Producto",
    compras: constructor.getAll().sort((a, b) => a.id - b.id),
    noProd: "No hay productos",
    partialsPath: __dirname + "/views/partials",
  });
});


/////////////////////////
// EXPRESS ROUTER ///////
/////////////////////////


app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritoRouter);


/////////////////////////
// SERVER ON ////////////
/////////////////////////
app.listen(3000, () => {
  console.log("Server ON");
});


/**
Cuando hagas estas modificaciones vas a tener que cambiar un poco la estructura.
Por ej:
Los con
troller se utilizan para modularizar, en esa carpeta irian las funciones que tenemos en el router, es decir,
  lo que ahora trabajos en un mismo archivo => router.put("/:id", (req, res) => {... })
  quedaria separado, por ej en routes/productos.js:

  const updateProduct = require(la ruta al archivo correspondiente dentro de controller)
  router.put("/:id", updateProduct )
  (recordar siempre exportar el router)

  y en controller, podemos tener el archivo productController.js y dentro tendria las funciones exportadas.
  por ej:
  const updateProduct= async (req, res) => {...}
  
  module.exports={ updateProduct }


  Entonces, en routes/productos.js aplicando el middleware te quedaria
  => router.put("/:id", nombreDelMiddleware, updateProduct )
 */