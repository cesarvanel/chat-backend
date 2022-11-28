
import express, { Application } from 'express'; 
import dotenv from 'dotenv'; 
import cors from 'cors'; 

const app:Application = express(); 

app.use(express.json())

// here we import  routes 


// here we declare the route path 

export {app}