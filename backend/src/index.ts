import app  from "./app.js"
import { connectToDatabase } from "./controllers/db/connection.js";
// Connections and Listeners
connectToDatabase()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
    console.log(`your server is listening on port http://localhost:${process.env.PORT}`);
    })
  })
  .catch((err) => {console.log(err)})