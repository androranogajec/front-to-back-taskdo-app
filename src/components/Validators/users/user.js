import validator from "validator";

export function isPasswordMatch(user) {
  /* 
  if passwords match return true or false
  */

  for (const property in user) {
    if (user["passwordCheck"] === user["password"]) {
      return true;
    } else {
      return false;
    }
  }
}

export function filterUserObjectFromPasswordMatch(user) {
  /* 
    filter user object from password check
  */

  let userCopy = Object.assign({}, user);
  for (const property in userCopy) {
    if (property === "passwordCheck") {
      delete userCopy["passwordCheck"];
      return userCopy;
    }
  }
}

export function setPasswordToFalse(user) {
  /* 
if password and password check don't match,
then this function sets password to false, to manipulate the state further 
*/

  let userCopy = Object.assign({}, user);
  for (const property in userCopy) {
    if (property === "password") userCopy["password"] = false;
  }
  return userCopy;
}
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
  }
  return userValidation;
}

export function isEveryFieldTrue(user) {
  /* 
  if every object value is true, then true
  */
  return Object.values(user).every((e) => e === true);
}
