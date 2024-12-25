// src/middleware/authMiddleware.js
import express from 'express';
import jwt from 'jsonwebtoken';

export const verifyAuthToken = (req, res, next) => {
  const token = req.cookies.authToken; // Extract the token from cookies

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Please log in to access this resource' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode and verify token
    req.user = decoded.userId; // Attach userId from token payload to the request
    next(); // Proceed to the next middleware or route
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
