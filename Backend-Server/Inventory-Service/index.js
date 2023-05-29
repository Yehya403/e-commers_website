const express = require("express");
const app = express();
const PORT = process.env.PORT || 6000;
const mongoose = require("mongoose");
const Product = require("./Product"); // Import Product Schema database
const Redis = require("ioredis");
const default_expiration = 3600;

// Redis setup
const redisClient = new Redis({
  host: "127.0.0.1",
  port: 6379,
  password: "Yehya403",
});

redisClient.on("error", (error) => console.error(`Error: ${error}`));
redisClient.on("connect", () => {
  console.log("Redis client connected");
});

// Middleware to handle JSON request bodies
app.use(express.json());

// Initialize Database for the Inventory Service
mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://127.0.0.1/inventory-service", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Inventory Service DB Connected`);
  })
  .catch((err) => {
    console.log(`Error while connecting to the database: ${err}`);
  });

// Route to create a new product //POST
app.post("/products", async (req, res) => {
  const {
    ID,
    name,
    price,
    quantity,
    imageUrl,
    title,
    slug,
    description,
    ratingAverage,
  } = req.body;

  // Check if the requested ID already exists in the database
  const existingProduct = await Product.findOne({ ID });
  if (existingProduct) {
    return res.status(400).json({ message: "ID already exists" });
  }

  const newProduct = new Product({
    ID,
    name,
    price,
    quantity,
    imageUrl,
    title,
    slug,
    description,
    ratingAverage,
  });

  try {
    await newProduct.save();
    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Route to update the quantity of a product
// Route to update a product by ID
app.put("/products/:productId", async (req, res) => {
  //ID that you want to update
  const { productId } = req.params; //object contain the requested id
  const {
    name,
    price,
    quantity,
    imageUrl,
    title,
    slug,
    description,
    ratingAverage,
  } = req.body; //extract the value of of name and price and quantity and image from the requested body

  try {
    const product = await Product.findOneAndUpdate(
      //Method takes 3 parameters
      { ID: productId }, // used to find the product
      {
        name,
        price,
        quantity,
        imageUrl,
        title,
        slug,
        description,
        ratingAverage,
      }, // the new values to update the product with
      { new: true } //options object that tells Mongoose to return the updated product instead of the original.
    );

    if (!product) {
      //If there's no product
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(product); //if product exists return the updated product
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

// Route to get all products
app.get("/products", async (req, res) => {
  try {
    const cachedProducts = await getOrSetCache("products", async () => {
      console.log("Cache Miss");
      const products = await Product.find();
      return products;
    });

    return res.json(cachedProducts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server error" });
  }
});

app.get("/products/:productId", async (req, res) => {
  //ID that you want to update
  const productId = req.params.productId; //object contain the requested id
  try {
    const product = await getOrSetCache(`product:${productId}`, async () => {
      console.log(`Cache Miss for product:${productId}`);
      const product = await Product.findOne({ ID: productId });
      return product;
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internet Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Inventory Service is running at ${PORT}`);
});

function getOrSetCache(key, cb) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (error, data) => {
      if (error) return reject(error);
      if (data != null) {
        console.log("Cache Hit");
        return resolve(JSON.parse(data));
      }
      const freshData = await cb();
      redisClient.set(key, JSON.stringify(freshData), "EX", default_expiration);
      resolve(freshData);
    });
  });
}
