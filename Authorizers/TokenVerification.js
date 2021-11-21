const config = require("../config");
const { ENV } = require("../config");
const NodeCache = require("node-cache");
const axios = require("axios");
const auth = require("./adminAuthorizer");
const tokenCache = new NodeCache({ stdTTL: 300, checkperiod: 150 });

exports.checkAuthorized = async function (token, roles) {
  let authUser = {
    success: false,
    user: null,
    error: null,
  };
  try {
    const value = tokenCache.get(token);
    if (value == undefined) {
      console.log("TOKEN CACHED: NO");
      const isAuthorized = await verifyToken(token);
      console.log(isAuthorized);
      if (!isAuthorized.success) {
        authUser.error = "Unauthorized.";
        return authUser;
      } else if (!isAuthorized.result.verified) {
        authUser.error = "Account email not verified..";
        return authUser;
      } else if (!roles.includes(isAuthorized.result.role)) {
        authUser.error = "Access denied.";
        return authUser;
      } else {
        const newUser = {
          name: isAuthorized.result.firstName,
          userId: isAuthorized.result.userId,
          email: isAuthorized.result.email,
        };
        const cacheUser = {
          name: isAuthorized.result.firstName,
          userId: isAuthorized.result.userId,
          email: isAuthorized.result.email,
          role: isAuthorized.result.role,
        };
        authUser.user = newUser;
        authUser.success = true;
        tokenCache.set(token, cacheUser);
        return authUser;
      }
    } else {
      console.log("TOKEN CACHED: YES");
      //console.log(value);
      if (roles.includes(value.role)) delete value.role;
      else {
        console.log("ROLE: INVALID");
        authUser.error = "Unauthorized.";
        return authUser;
      }
      console.log("********VALID*******");
      authUser.success = true;
      authUser.user = value;
      //console.log(authUser);
      return authUser;
    }
  } catch (ex) {
    console.log(ex);
    authUser.success = false;
    return authUser;
  }
};

async function verifyToken(token) {
  try {
    let response = await axios({
      url: config[ENV].AUTHSERVER.URL,
      method: "get",
      headers: {
        "x-auth-token": token,
      },
    });
    //console.log(response.data);
    return response.data;
  } catch (ex) {
    return { success: false };
  }
}
