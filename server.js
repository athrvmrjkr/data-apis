const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Pretty-print JSON responses with 2-space indentation
app.set("json spaces", 2);

// Load JSON dataset
function loadJSON(filename) {
    const filePath = path.join(__dirname, "data", filename);
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

// Home page
app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Customer Data APIs</title>

            <style>
                body {
                    font-family: Arial, sans-serif;
                    background: #f4f6f8;
                    margin: 0;
                    padding: 40px;
                    color: #222;
                }

                .container {
                    max-width: 800px;
                    margin: auto;
                    background: white;
                    padding: 40px;
                    border-radius: 12px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
                }

                h1 {
                    margin-bottom: 10px;
                }

                p {
                    color: #666;
                    margin-bottom: 30px;
                }

                .api {
                    border: 1px solid #ddd;
                    border-radius: 10px;
                    padding: 20px;
                    margin-bottom: 15px;
                }

                .api h2 {
                    margin-top: 0;
                }

                .api a {
                    display: inline-block;
                    background: #2563eb;
                    color: white;
                    text-decoration: none;
                    padding: 10px 16px;
                    border-radius: 6px;
                }

                .api a:hover {
                    background: #1d4ed8;
                }

                code {
                    display: block;
                    background: #f1f5f9;
                    padding: 10px;
                    margin: 12px 0;
                    border-radius: 5px;
                    word-break: break-all;
                }
            </style>
        </head>

        <body>
            <div class="container">

                <h1>Customer Data APIs</h1>

                <p>
                    Select a dataset below to access its JSON API.
                </p>

                <div class="api">
                    <h2>Customer Data</h2>

                    <code>/api/customer-data</code>

                    <a href="/api/customer-data" target="_blank">
                        Open Customer Data API
                    </a>
                </div>

                <div class="api">
                    <h2>E-commerce Customer Data</h2>

                    <code>/api/ecommerce-customer-data</code>

                    <a href="/api/ecommerce-customer-data" target="_blank">
                        Open E-commerce API
                    </a>
                </div>

            </div>
        </body>
        </html>
    `);
});

// Dataset 1: Customer Data
app.get("/api/customer-data", (req, res) => {
    try {
        const data = loadJSON("customer_data.json");
        res.json(data);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Unable to load customer data"
        });
    }
});

// Dataset 2: E-commerce Customer Data
app.get("/api/ecommerce-customer-data", (req, res) => {
    try {
        const data = loadJSON("ecommerce_customer_data.json");
        res.json(data);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Unable to load ecommerce customer data"
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});