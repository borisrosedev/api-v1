class UserDto {
  static me(user) {
    return {
      id: user.id,
      email: user.email,
      assets: user.assets,
    };
  }
  static update(incomingUserData) {
    const securedData = Object.create({});
    if ("email" in incomingUserData) {
      securedData.email = incomingUserData.email;
    }

    if ("password" in incomingUserData) {
      securedData.password = incomingUserData.password;
    }
    return securedData;
  }
}

module.exports = UserDto;
