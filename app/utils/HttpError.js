class HttpError extends Error {
  constructor(status, detail, title, instance, type = null) {
    super(detail);
    this.title = title;
    this.instance = instance;
    this.type = type;
    this.status = status;
    this.expose = status < 500;
  }
}

module.exports = HttpError;
