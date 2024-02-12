const app = require("express")()

const JsSearch = require("js-search")

const breeds = require("./products.json")

const search = new JsSearch.Search("name") // remember the name key from breeds.json
// search.addIndex("name")
search.addDocuments(breeds)
search.addIndex("product")

app.get("/api/products", (req, res) => {
  const { query } = req

  try {
    const product = query.search

    if (product) {
      //   res.send(product.find((p) => p.product === product)) . //old impleentation
      res.send(search.search(product))
    }
    res.send(product.map((b) => ({ product: p })))
  } catch (error) {
    console.log("error", error)
  }
})

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params
  res.send(product[id])
})

module.exports = app
