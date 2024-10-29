const getSender = (loggedInUser, users) => {
  // console.log("LOGGED IN USER = ", loggedInUser);
  // console.log("USERS = ", users);

  return users.find((user) => user._id !== loggedInUser.id);
};

export { getSender };
