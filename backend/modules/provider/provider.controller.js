const Provider = require("./provider.model");

// Create Provider
const createProvider = async (req, res) => {
  try {
    const {
      userId,
      businessName,
      description,
      category,
      phone,
      address,
      city,
      experience,
    } = req.body;

    // Check required fields
    if (!userId || !businessName || !category) {
      return res.status(400).json({
        success: false,
        message: "userId, businessName and category are required",
      });
    }

    // Check if provider already exists
    const existingProvider = await Provider.findOne({
      where: { userId },
    });

    if (existingProvider) {
      return res.status(409).json({
        success: false,
        message: "Provider profile already exists",
      });
    }

    const provider = await Provider.create({
      userId,
      businessName,
      description,
      category,
      phone,
      address,
      city,
      experience,
    });

    return res.status(201).json({
      success: true,
      message: "Provider created successfully",
      provider,
    });
  } catch (error) {
    console.error("Create Provider Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create provider",
      error: error.message,
    });
  }
};

// Get All Providers
const getAllProviders = async (req, res) => {
  try {
    const providers = await Provider.findAll();

    return res.status(200).json({
      success: true,
      count: providers.length,
      providers,
    });
  } catch (error) {
    console.error("Get Providers Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch providers",
      error: error.message,
    });
  }
};

// Get Provider By ID
const getProviderById = async (req, res) => {
  try {
    const { id } = req.params;

    const provider = await Provider.findByPk(id);

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    return res.status(200).json({
      success: true,
      provider,
    });
  } catch (error) {
    console.error("Get Provider Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch provider",
      error: error.message,
    });
  }
};

// Update Provider
const updateProvider = async (req, res) => {
  try {
    const { id } = req.params;

    const provider = await Provider.findByPk(id);

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    await provider.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Provider updated successfully",
      provider,
    });
  } catch (error) {
    console.error("Update Provider Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update provider",
      error: error.message,
    });
  }
};

// Delete Provider
const deleteProvider = async (req, res) => {
  try {
    const { id } = req.params;

    const provider = await Provider.findByPk(id);

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    await provider.destroy();

    return res.status(200).json({
      success: true,
      message: "Provider deleted successfully",
    });
  } catch (error) {
    console.error("Delete Provider Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete provider",
      error: error.message,
    });
  }
};

module.exports = {
  createProvider,
  getAllProviders,
  getProviderById,
  updateProvider,
  deleteProvider,
};
