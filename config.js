const env = "qa";
const config = {
  qa: {
    DBURL: "mongodb+srv://homelane:homelane@parvaluemongo.qjnom.mongodb.net/HomeLane?retryWrites=true&w=majority",
    JWT_SECRET_KEY: "uXtD3EW4wwwwwwwwwwwwwwwwertyuiooooooooDDVI02nMrEoZDky3ThM",
  },
  dev: {
    DBURL: "mongodb://127.0.0.1:27017/Cambium",
    JWT_SECRET_KEY: "uXtD3EW4DDVI02nMrEoZDky3ThMbgvm",
  },
};
module.exports = config[env];
