import jwt from 'jsonwebtoken';

// Base token verification middleware
export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied, not authorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Invalid token" });
    }

    req.user = user;
    next();
  });
};

// Middleware for normal users
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    // Only check if user is authenticated and is a "user"
    if (req.user && (req.user.role === 'user' || req.user.role === 'admin')) {
      next();
    } else {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
  });
};


// Middleware for admins
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'admin') {
      next();
    } else {
      return res.status(403).json({ success: false, message: "Admin access required" });
    }
  });
};
