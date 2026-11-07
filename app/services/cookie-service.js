const cookieService = {
  params(env) {
    return {
      maxAge: 900000,
      httpOnly: true,
      secure: env == "dev" ? false : true,
    };
  },
};

module.exports = cookieService;
