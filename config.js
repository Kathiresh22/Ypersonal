const env = "qa";
const config = {
  qa: {
    DBURL: "mongodb+srv://ypersonal:ypersonal@cluster0.rzskx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    JWT_SECRET_KEY: "uXtD3EW4wwwwwwwwwwwwwwwwertyuiooooooooDDVI02nMrEoZDky3ThM",
  },
  dev: {
    DBURL: "mongodb+srv://ypersonal:ypersonal@cluster0.rzskx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
   // DBURL: "mongodb://127.0.0.1:27017/Cambium",
    JWT_SECRET_KEY: "uXtD3EW4DDVI02nMrEoZDky3ThMbgvm",
  },
};
module.exports = config[env];
