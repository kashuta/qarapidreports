const jwt = require('jsonwebtoken');

class TokenService {
    constructor() {
        this.access_secret = process.env.ACCESS_TOKEN_SECRET;
        this.refresh_secret = process.env.REFRESH_TOKEN_SECRET;
    }
    
    /**
     * Generate access and refresh tokens
     * @param payload - data to be stored in the token
     * @returns {Promise<{accessToken: (*), refreshToken: (*)}>}
     */
    async generateTokens(payload) {
        const accessToken = await jwt.sign(payload, this.access_secret, { expiresIn: '1d' });
        const refreshToken = await jwt.sign(payload, this.refresh_secret, { expiresIn: '30d' });
        return { accessToken, refreshToken };
    }
    
    /**
     * Verify access token
     * @param token - access token
     * @returns {Promise<*>}
     */
    async verifyAccessToken(token) {
        try {
            return await jwt.verify(token, this.access_secret);
        }
        catch (e) {
            return null;
        }
    }
}
