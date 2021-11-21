const env = "dev";
const config = {
  prod: {
    DBURL: "mongodb+srv://ypersonal:ypersonal@cluster0.rzskx.mongodb.net/PROD?retryWrites=true&w=majority",
    JWT_SECRET_KEY: "uXtD3EW4wwwwwwwwwwwwwwwwertyuiooooooooDDVI02nMrEoZDky3ThM",
  },
  dev: {
    DBURL: "mongodb+srv://ypersonal:ypersonal@cluster0.rzskx.mongodb.net/DEV?retryWrites=true&w=majority",
   //DBURL: "mongodb://127.0.0.1:27017/myFirstDatabase",
    JWT_SECRET_KEY: "uXtD3EW4DDVI02nMrEoZDky3ThMbgvm",
  },
};
module.exports = config[env];
