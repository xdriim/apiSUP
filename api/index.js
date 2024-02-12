const app = require("express")();
const JsSearch = require("js-search");
const products = require("./products.json");

const search = new JsSearch.Search("nombre");
search.addDocuments(products);
search.addIndex("nombre");

// Ruta para obtener todos los productos
app.get("/api/products", (req, res) => {
  const { query } = req;

  try {
    const productName = query.search;

    if (productName) {
      const searchResults = search.search(productName);
      if (searchResults.length > 0) {
        res.send(searchResults);
      } else {
        res.status(404).send("No se encontraron productos que coincidan con la búsqueda.");
      }
    } else {
      res.send(products);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Ruta para obtener un producto por su ID
app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;

  try {
    const product = products.find((p, index) => index.toString() === id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Ruta para obtener productos por tipo (SUP, Canoa, Bono)
app.get("/api/products/tipo/:type", (req, res) => {
  const { type } = req.params;

  try {
    const productsByType = products.filter(product => product.tipo.toLowerCase() === type.toLowerCase());
    if (productsByType.length > 0) {
      res.send(productsByType);
    } else {
      res.status(404).send(`No se encontraron productos del tipo ${type}`);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error interno del servidor");
  }
});

module.exports = app;
