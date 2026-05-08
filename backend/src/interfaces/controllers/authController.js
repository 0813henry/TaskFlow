const RegisterUserUseCase = require("../../application/use-cases/auth/RegisterUserUseCase");
const LoginUserUseCase = require("../../application/use-cases/auth/LoginUserUseCase");
const MongoUserRepository = require("../../infrastructure/repositories/MongoUserRepository");
const JwtService = require("../../infrastructure/services/JwtService");

// Dependency injection — wire use cases with their adapters at the composition root
const userRepository = new MongoUserRepository();
const jwtService = new JwtService();
const registerUseCase = new RegisterUserUseCase(userRepository);
const loginUseCase = new LoginUserUseCase(userRepository, jwtService);

/**
 * POST /api/auth/register
 */
const register = async (req, res, next) => {
  try {
    const user = await registerUseCase.execute(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/login
 */
const login = async (req, res, next) => {
  try {
    const result = await loginUseCase.execute(req.body);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
