import 'dotenv/config'; 
import 'module-alias/register'; 
import validateEnv from '@utils/validateEnv'; 
import App from './app'; 
import UserController from '@resources/user/user.controller';
import MessageController from '@resources/messages/message.controller';




validateEnv()

const app =new App([new UserController(), new MessageController()], Number(process.env.PORT))

app.listen()