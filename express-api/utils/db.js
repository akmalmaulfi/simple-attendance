const mongoose = require("mongoose")
mongoose.connect(
  "mongodb+srv://akmal:akmal14@cluster0.15mw4r2.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      console.log(`Error connecting to MongoDB: ${err}`)
    } else {
      console.log("Connected to MongoDB")
    }
  }
)
