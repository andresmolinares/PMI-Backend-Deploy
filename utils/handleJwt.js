import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

const tokenSign = async (user) => {
    const sign = await jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        },
        JWT_SECRET,
        {
            expiresIn: '12h',
        }

    );

    return sign;
};

const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET);
    } catch (error) {
        return false;
    }
};

export { tokenSign, verifyToken };