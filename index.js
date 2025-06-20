import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
    try {
        const response = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4659992&lng=77.50392149999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    'Accept': 'application/json, text/plain, */*',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Referer': 'https://www.swiggy.com/',
                    'Origin': 'https://www.swiggy.com',
                    'Connection': 'keep-alive',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-origin'
                }
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Successfully fetched data from Swiggy");
        res.json(data);
    } catch (err) {
        console.error("Error fetching from Swiggy:", err);
        res.status(500).json({
            error: "Error fetching from Swiggy",
            details: err.message
        });
    }
});

app.get("/api/menu/:resId", async (req, res) => {
    const { resId } = req.params;
    const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.4659992&lng=77.50392149999999&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`;

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'application/json',
                'Origin': 'https://www.swiggy.com',
                'Referer': 'https://www.swiggy.com/',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`✅ Fetched menu for restaurant ID: ${resId}`);
        res.json(data);
    } catch (err) {
        console.error("❌ Error fetching restaurant menu:", err);
        res.status(500).json({
            error: "Failed to fetch restaurant menu",
            details: err.message
        });
    }
});


app.listen(3001, () => console.log("Proxy server running at http://localhost:3001"));