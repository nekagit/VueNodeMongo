const express = require("express");
const { MongoClient } = require("mongodb");
const axios = require("axios");
const cors = require("cors");

const corsOptions = { origin: 'http://localhost:5173', credentials: true };

const url =
  "mongodb+srv://njoco:pSVJjBxVVFfRRhwq@soprotterdam.v4bx2oh.mongodb.net/?retryWrites=true&w=majority";

  
  const app = express();
  const client = new MongoClient(url);
  const productApi = require("./app/controllers/ProductsController.js");
  
  app.use(cors(corsOptions));
  app.use(express.json());
app.use(
  express.urlencoded({ extended: true })
  );
app.use("/api/products", productApi);

app.listen(8080, () => {
  console.log(`Server is running on port ${8080}.`);
});

async function run() {
  try {
    const product = {
      name: "John",
      unitPrice: 1000,
    };
    console.log(product)
    await client.connect().then(console.log("Successfully connected to Atlas"));
    const createdProduct = await axios.post("http://localhost:8080/api/products/",product).then(console.log("Product created"));
    await axios.get("http://localhost:8080/api/products/").then(console.log("Got All"))
    await axios.delete("http://localhost:8080/api/products/",createdProduct.id).then(console.log("Deleted prijave"));
    console.log("all ready")
  } catch (err) {

    console.log(err.stack);

  } finally {
    
    await client.close();
    
  }
}

run().catch(console.dir);
