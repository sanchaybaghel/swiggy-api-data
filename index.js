const expres=require('express')
const fetch=require('node-fetch')
const cors=require('cors')
const app=expres();
app.use(cors())
app.get("/",async (req,res)=>{
    try{
        const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4659992&lng=77.50392149999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const data=await res.json();
    res.json(data);
    
    } catch (err) {
    res.status(500).send("Error fetching from Swiggy");
  }
})
app.listen(3001, () => console.log("Proxy server running at http://localhost:3001"));