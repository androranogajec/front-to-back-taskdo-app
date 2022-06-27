import validator from "validator";

export function isUser(user) {
  /* 
    
    validate user object, 
    return boolean user object
    
    */
  let userValidation = {};
  let userCopy = Object.assign({}, user);

  for (const property in userCopy) {
    if (property === "username") {
      userValidation.username = validator.isLength(user[property].toString(), {
        min: 0,
        max: 24,
      });
    }

    if (property === "name") {
      userValidation.name = validator.isLength(userCopy[property].toString(), {
        min: 0,
        max: 24,
      });
    }

    if (property === "email") {
      userValidation.email =
        validator.isLength(userCopy[property].toString(), {
          min: 0,
          max: 42,
        }) && validator.isEmail(userCopy[property].toString());
    }

    if (property === "password") {
      userValidation.password = validator.isLength(
        userCopy[property].toString(),
        {
          min: 0,
          max: 42,
        }
      );
    }

    if (property === "passwordCheck") {
      userValidation.passwordCheck = validator.isLength(
        userCopy[property].toString(),
        {
          min: 0,
          max: 42,
        }
      );
    }

    if (userCopy["password"] !== userCopy["passwordCheck"]) {
      userValidation.password = false;
      userValidation.passwordCheck = false;
    }
   
  }  

return userValidation;
}


export function isSemiFilterUserObject(userValidation, user){
    /* 
    
    if true return modified user object without passwordCheck field
    if false return the same userValidation object 
    
    */
    let userCopy  = Object.assign({}, user);
    let isEveryPropertyTrue = Object.values(userValidation).every(function (e) {
        return e === true;
      })
    if (isEveryPropertyTrue) {
        for (const property in userCopy) {
          if (property === "passwordCheck") {
            delete userCopy["passwordCheck"];
            return userCopy;
          }
        } 
  }else{
    return userValidation;
  }
}