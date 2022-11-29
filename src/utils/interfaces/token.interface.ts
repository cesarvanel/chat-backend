import { Schema } from "mongoose";

interface Token extends Object{
    id:Schema.Types.ObjectId, 
    expriredIn:number
}

export default Token ;