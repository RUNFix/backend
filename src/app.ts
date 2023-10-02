import "dotenv/config"
import  express  from "express";
import  cors  from "cors";
import {router} from "./routes";
import db from "./config/mongo";
import cookieParser from "cookie-parser"; // Import cookie-parser
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
// Use cookie-parser middleware
app.use(cookieParser());
app.use(router);
db().then(()=> console.log("Conexion ready"));

app.listen(PORT, ()=> console.log(`Listo por el puerto ${PORT}`))