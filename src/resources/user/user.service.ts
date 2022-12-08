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

  public registerUser = async (data: User): Promise<{} | Error> => {
    let user;
    try {
      const email = data.userEmail;
      user = await this.User.findOne({ userEmail: email });
      if (user) {
        throw new Error("this user already exists");
      }

      user = await this.User.create(data);
      const { userName, userEmail, userAvatar, isAdmin } = data;
      const accessToken = token.CreateToken(user);
      const sesUser = { userName, userEmail, userAvatar, accessToken, isAdmin };
      return sesUser;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  public login = async (
    userEmail: string,
    userPwd: string
  ): Promise<{} | Error> => {
    try {
      const user = await this.User.findOne({ userEmail });
      if (!user) {
        throw new Error("Enable to find the user with this user Address");
      }

      const isValid = await user.isValidPassword(userPwd);
      if (isValid) {
        const accessToken = token.CreateToken(user);
        const sesUser = { ...user, accessToken };
        return sesUser;
      } else {
        throw new Error("Wrong credentials given");
      }
    } catch (error) {
      throw new Error("Wrong credentials given");
    }
  };

  public get_All_user = async (): Promise<User[] | Error> => {
    const allUser = await this.User.find({}).select(
      "userName userAvatar userEmail _id isAdmin"
    );

    return allUser;
  };
}

export default UserService;
