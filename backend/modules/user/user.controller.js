const UserModel = require('./user.model');

const UserController = {
    async getProfile(req, res) {
        try {
            const { userId } = req.params;
            const profile = await UserModel.findById(userId);
            
            if (!profile) {
                return res.status(404).json({ success: false, message: 'Profile not found' });
            }
            
            res.status(200).json({ success: true, profile });
        } catch (error) {
            console.error('Error fetching profile:', error.message);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    },

    async updateProfile(req, res) {
        try {
            const { userId, firstName, lastName, email, phone, address } = req.body;
            
            const updatedProfile = await UserModel.upsertProfile(userId, {
                firstName,
                lastName,
                email,
                phone,
                address
            });

            res.status(200).json({
                success: true,
                message: 'Profile updated successfully!',
                profile: updatedProfile
            });
        } catch (error) {
            console.error('Error updating profile:', error.message);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }
};

module.exports = UserController;