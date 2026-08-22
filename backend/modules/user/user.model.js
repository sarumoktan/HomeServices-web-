const db = require('../../config/database');

const UserModel = {
    // Fetch user profile data by ID
    async findById(userId) {
        const query = `SELECT id, user_id, first_name, last_name, email, phone, address, created_at, updated_at FROM profiles WHERE user_id = $1`;
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
        const values = [userId, firstName, lastName, email || null, phone || null, address || null];
        const result = await db.query(query, values);
        return result.rows[0];
    },

    // Delete a user profile by user_id
    async findByIdAndDelete(userId) {
        const query = `DELETE FROM profiles WHERE user_id = $1 RETURNING *`;
        const result = await db.query(query, [userId]);
        return result.rows[0];
    },

    // Get all profiles with pagination and sorting
    async findAll(limit = 10, offset = 0) {
        const query = `
            SELECT id, user_id, first_name, last_name, email, phone, address, created_at, updated_at 
            FROM profiles 
            ORDER BY created_at DESC 
            LIMIT $1 OFFSET $2
        `;
        const result = await db.query(query, [limit, offset]);
        return result.rows;
    }
};

module.exports = UserModel;