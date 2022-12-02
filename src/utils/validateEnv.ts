import { cleanEnv, str, port } from "envalid";

const validateEnv = () =>{

    cleanEnv(process.env, {
        NODE_ENV:str({
            choices:['development', 'production']
        }), 
        MONGO_USER:str(), 
        MONGO_PASSWORD:str(), 
        MONGO_CLUSTER:str(), 
        JWT_SECRET : str(), 
        PORT:port({default:4500})
    })

}

export default validateEnv; 