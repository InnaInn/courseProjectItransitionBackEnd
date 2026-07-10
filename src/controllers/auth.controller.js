import * as userService from '../services/users.service.js';

const sessionMapping = new Map();

function destroySession(userId) {
    const session = sessionMapping.get(userId);
    if (session) {
        session.destroy();
        sessionMapping.delete(userId);
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await userService.getUserByEmail(email, password);

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const userId = user.id;
    req.session.userId = userId;
    req.session.userEmail = user.email;
    req.session.userRole = user.roleId;

    await req.session.save();

    sessionMapping.set(userId, req.session);

    res.status(200).json({
        message: 'Login successful',
        user: {
            id: userId,
            email: user.email,
            role: user.roleId
        }
    });
}

export const logout = async (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('LogOut Error');
        }
        res.clearCookie('connect.sid');
        res.status(204).send();
    });
}

export const me = async (req, res, next) => {
    try {
        const user = await userService.getUser(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

      
        const { password, ...userWithoutPassword } = user;

        res.status(200).json(userWithoutPassword);
    } catch (err) {
        next(err);
    }
};