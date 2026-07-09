
export const isAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

export const isAuthorized = (...guards) => {
  return async (req, res, next) => {
    try {
      const results = await Promise.all(guards.map((guard) => guard(req)));
      const granted = results.some(Boolean);
      if (!granted) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export const hasRole = (...roles) => {
  return (req) => {
    const userRole = req.session.userRole;
    return userRole && roles.includes(userRole);
  };
};

export const isUserOwnResource = (req) => {
  const currentUserId = req.session.userId;
  const targetUserId = req.params.userId;
  return currentUserId && targetUserId && String(currentUserId) === String(targetUserId);
};
