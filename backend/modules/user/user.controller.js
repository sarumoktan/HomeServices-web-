const Profile = require('./user.model');

const UserController = {
    async getProfile(req, res) {
        try {
            const userId = req.user.id; // Extracted securely from auth middleware token

            const profile = await Profile.findOne({
                where: { user_id: userId },
                attributes: { exclude: ['id'] }
            });

            if (!profile) {
                return res.status(404).json({ success: false, message: 'Profile not found' });
            }

            return res.status(200).json({ success: true, profile });
        } catch (error) {
            console.error('Error fetching profile:', error.message);
            return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    },

    async updateProfile(req, res) {
        try {
            const userId = req.user.id; 
            const { firstName, lastName, email, phone, address } = req.body;

            if (!userId) {
                return res.status(400).json({ success: false, message: 'User ID is required' });
            }

            // Sequelize upsert handles both insert and update neatly on unique keys
            const [updatedProfile] = await Profile.upsert({
                user_id: userId,
                first_name: firstName,
                last_name: lastName,
                email: email || null,
                phone: phone || null,
                address: address || null
            }, {
                returning: true
            });

            return res.status(200).json({
                success: true,
                message: 'Profile updated successfully!',
                profile: updatedProfile
            });
        } catch (error) {
            console.error('Error updating profile:', error.message);
            return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }
};

module.exports = UserController;