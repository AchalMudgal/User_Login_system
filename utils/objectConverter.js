//This file will send the only required information to the user request

exports.userResponse = (users) => {

    userResult = [];

    users.forEach(users => {
        userResult.push({
            name : users.name,
            userId : users.userId,
            email : users.email
        })
    })
    return userResult;
};

