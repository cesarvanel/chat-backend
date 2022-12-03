import userModels from "@resources/user/user.models";
import User from "@resources/user/user.interface";
import token from "@utils/interfaces/token";

class UserService {
  private User = userModels;

  /**
   * register e new user
   * @param data
   * @returns a token
   */

  public registerUser = async (
    userName: string,
    userEmail: string,
    userPwd: string
  ): Promise<string | Error> => {
    try {
      const user = await this.User.create({
        userName,
        userEmail,
        userPwd,
      });
      const accessToken = token.CreateToken(user);
      return accessToken;
    } catch (error) {
      throw new Error("enable to create user");
    }
  };

  public login = async (
    userEmail: string,
    userPwd: string
  ): Promise<string | Error> => {
    try {
      const user = await this.User.findOne({ userEmail });
      if (!user) {
        throw new Error("Enable to find the user with this user Address");
      }

      const isValid = await user.isValidPassword(userPwd);
      if (isValid) {
        return token.CreateToken(user);
      } else {
        throw new Error("Wrong credentials given");
      }
    } catch (error) {
      throw new Error("enable to login user");
    }
  };

  public update_profile = async (userAvatar: string) => {};
}

export default UserService;
