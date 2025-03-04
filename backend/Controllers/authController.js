app.post("/api/auth/register", (req, res) => {
    console.log("Received Data:", req.body);  
    
    const { username, name, email, password } = req.body;
  
    if (!username || !name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    res.send("Received");  
  });
  
