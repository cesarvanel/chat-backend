import userModels from "@resources/user/user.models";
import User from "@resources/user/user.interface";

class UserService {
  private userModel = userModels;

  // ** create a new user ;

  public createUser = async (data: User): Promise<User> => {
    try {
      const user = await this.userModel.create(data);
      return user;
    } catch (error) {
      throw new Error("enable to create user");
    }
  };
}

export default UserService;
