const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ 1. Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role = 'member' } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
    const user = new User({ 
      name: name.trim(), 
      email: email.toLowerCase(), 
      password: hashedPassword, 
      role 
    });
    await user.save();

    // JWT Token
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET || 'supersecretfallback',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      },
      token
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
};

// ✅ 2. Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'supersecretfallback',
      { expiresIn: '7d' }
    );

    res.json({
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

// ✅ 3. Get current user
exports.getMe = async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// ✅ 4. Test user creator (temporary)
exports.createTestUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash('password123', 12);
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
      role: 'admin'
    });
    await user.save();
    res.json({ message: 'Test user created! Email: test@example.com, Pass: password123' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};