const bcrypt = require("bcryptjs");

module.exports = {
  postUser: {
   saltAndHashPassword:function(user){
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    return user;
   }
  },
};
