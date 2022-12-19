const jwt = require("jsonwebtoken");
const { USERS, jwt: jwtConfig } = require("../config");

class AuthService {
  async generateToken(requestBody) {
    let authUser = USERS.find(
      (user) =>
        user.name === requestBody.name && user.apiKey === requestBody.apiKey
    );
    if (authUser) {
      return {
        msg: "Login Successful",
        token: {
          name: authUser.name,
          token: jwt.sign(authUser, jwtConfig.secret, {
            expiresIn: "1h",
          }),
        },
        image: authUser.image,
      };
    }
    return null;
  }
  async getTokenInfo(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, jwtConfig.secret, async (error, tokenInfo) => {
        if (error) resolve(false);
        else resolve(tokenInfo);
      });
    });
  }
}
module.exports = new AuthService();
