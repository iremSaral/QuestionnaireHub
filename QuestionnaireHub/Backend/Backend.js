import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import surveyRoutes from './routes/SurveyRoutes.js';
import userRoutes from './routes/UserRoutes.js';
import questionRoutes from './routes/QuestionRoutes.js';
import responseRoutes from './routes/ResponseRoutes.js';

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Front-End URL, sorgu atılacak url bilgisi 
  credentials: true,
}));
app.use(express.json()); //req.body'yi doğru bir şekilde parse etmeye yardımcı olur
app.use(cookieParser())

app.use(userRoutes)
app.use(surveyRoutes) //Survey Operations
app.use(questionRoutes)//Question Operations
app.use(responseRoutes)//Response Opretions
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
 
