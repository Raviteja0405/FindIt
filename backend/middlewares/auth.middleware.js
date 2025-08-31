export const ensureAuth = (req, res, next) => {
  // Check for test environment bypass
  if (process.env.NODE_ENV === 'test' && req.headers['test-user']) {
    try {
      req.user = JSON.parse(req.headers['test-user']);
      req.isAuthenticated = () => true;
      return next();
    } catch (e) {
      // Fall through to normal auth check
      
    }
  }
  
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized. Please log in." });
};
