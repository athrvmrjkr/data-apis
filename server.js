const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

function loadJSON(filename) {
    const filePath = path.join(__dirname, "data", filename);
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

app.get("/api/customer-data", (req, res) => {
    try {
        const data = loadJSON("customer_data.json");
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Unable to load customer data" });
    }
});

app.get("/api/ecommerce-customer-data", (req, res) => {
    try {
        const data = loadJSON("ecommerce_customer_data.json");
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Unable to load ecommerce customer data" });
    }
});

app.get("/", (req, res) => {
    res.json({
        status: "API is running",
        endpoints: [
            "/api/customer-data",
            "/api/ecommerce-customer-data"
        ]
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
