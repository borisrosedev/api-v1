class ProductDto {
  static read(prod) {
    return {
      id: prod.id,
      title: prod.title,
      desc: prod.desc,
      price: prod.price,
      owner: prod.owner.email,
    };
  }
  static update(incomingUserData) {
    const securedData = Object.create({});
    if ("title" in incomingUserData) {
      securedData.title = incomingUserData.title;
    }
    if ("desc" in incomingUserData) {
      securedData.desc = incomingUserData.desc;
    }
    if ("price" in incomingUserData) {
      securedData.price = incomingUserData.price;
    }
    return securedData;
  }
}

module.exports = ProductDto;
