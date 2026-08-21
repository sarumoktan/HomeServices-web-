const db = require('../../config/database');

const UserModel = {
    // Fetch user profile data by ID
    async findById(userId) {
        const query = `SELECT id, first_name, last_name, email, phone, address FROM profiles WHERE user_id = $1`;
        const result = await db.query(query, [userId]);
        return result.rows[0];
    },

    // Update or insert user profile data automatically
    async upsertProfile(userId, data) {
        const { firstName, lastName, email, phone, address } = data;
        const query = `
            INSERT INTO profiles (user_id, first_name, last_name, email, phone, address, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
            ON CONFLICT (user_id) 
            DO UPDATE SET 
                first_name = EXCLUDED.first_name,
                last_name = EXCLUDED.last_name,
                email = EXCLUDED.email,
                phone = EXCLUDED.phone,
                address = EXCLUDED.address,
                updated_at = CURRENT_TIMESTAMP
            RETURNING *;
        `;
        const values = [userId, firstName, lastName, email || '', phone || '', address];
        const result = await db.query(query, values);
        return result.rows[0];
    }
};

module.exports = UserModel;