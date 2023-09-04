// sending token if the user is logged in or newly registered

const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };

  res
    .status(statusCode)
    .cookie("token", token, cookieOptions)
    .json({ user, token });
};

export default sendToken;
