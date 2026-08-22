const UserModel = require('./user.model');

const UserController = {
    async getProfile(req, res) {
        try {
            const { userId } = req.params;
            
            if (!userId) {
                return res.status(400).json({ success: false, message: 'User ID is required' });
            }

            const profile = await UserModel.findById(userId).select('-password'); // Exclude sensitive fields if any
            
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
            const { userId } = req.params; // Typically passed via route params for RESTful conventions
            const updateData = req.body;

            if (!userId) {
                return res.status(400).json({ success: false, message: 'User ID is required' });
            }

            // Using standard findByIdAndUpdate with runValidators
            const updatedProfile = await UserModel.findByIdAndUpdate(
                userId,
                { $set: updateData },
                { new: true, runValidators: true }
            );

            if (!updatedProfile) {
                return res.status(404).json({ success: false, message: 'Profile not found to update' });
            }

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