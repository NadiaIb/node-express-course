const express = require("express");
const path = require("path");
const { products } = require("./data");
const app = express();

// setup static and middleware, app.use= middleware, static= built in middleware
// app.use(express.static("./public")); // files server doesn't have to change

app.get("/", (req, res) => {
  res.send('<h1>Home page</h1><a href="api/products">products</a>');
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});

app.get("/api/products/:productID", (req, res) => {
  // console.log(req.params)
  const {productID} = req.params;
  const singleProduct= products.find((product)=> product.id === Number(productID))
  if(!singleProduct){
    return res.status(404).send('Product does not exist!')
  }
  return res.json(singleProduct);
});

app.get(`/api/v1/query`, (req,res)=>{
  // console.log(req.query)
  const {search, limit} = req.query
  let sortedProducts = [...products]

  if (search){
    sortedProducts = sortedProducts.filter((product)=>{
      return product.name.startsWith(search)
    })
  }
  if(limit){
    sortedProducts = sortedProducts.slice(0, Number(limit))
  }
  if(sortedProducts < 1){
    // res.status(200).send('no products matched your search')
    return res.status(200).json({success: true, data: [] })
  }
  return res.status(200).json(sortedProducts)
})

// app.all("*", (req, res) => {
//   res.status(404).send(`<h1>Resource not found</h1>`);
// });

app.listen(3500, () => {
  console.log("server listening on port 5000");
});

//6:01:33
