const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotEnv = require("dotenv");

const app = express();
const PORT = process.env.PORT || 5000;

dotEnv.config({ path: "./api/.env" });

app.use(express.json());
app.use(cors());

app.get("/api/products", async (req, res) => {
  try {
    const { page, size } = req.query;
    const response = await axios.get(
      `https://timbu-get-all-products.reavdev.workers.dev/`,
      {
        params: {
          organization_id: "2e9285e1bbce4b55afe9b33258add851",
          reverse_sort: false,
          page,
          size,
          Appid: "DG9K9DJ3ZWC3JMH",
          Apikey: process.env.NEXT_PUBLIC_API_URL,
        },
      }
    );
    console.log(response, "response");

    return res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

app.get("/", (req, res) => {
  res.send(`Welcome to Express & TypeScript Server`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
