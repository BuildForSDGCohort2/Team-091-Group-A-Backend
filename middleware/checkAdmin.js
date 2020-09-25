module.exports = function (req, res, next) {
  try {
    const { isAdmin } = req.user;
    if (isAdmin) {
      return next();
    }
    return res.status(401).json({
      message: 'error',
      error: 'Sorry Only Admin can perform this action'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'error',
      error: 'Invalid Request!2'
    });
  }
};

