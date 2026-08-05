// Provider Controller
const providerService = require('./provider.service');

exports.getAllProviders = async (req, res) => {
  try {
    const providers = await providerService.getAllProviders();
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProviderById = async (req, res) => {
  try {
    const provider = await providerService.getProviderById(req.params.id);
    res.status(200).json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProvider = async (req, res) => {
  try {
    const provider = await providerService.createProvider(req.body);
    res.status(201).json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProvider = async (req, res) => {
  try {
    const updatedProvider = await providerService.updateProvider(req.params.id, req.body);
    res.status(200).json(updatedProvider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProvider = async (req, res) => {
  try {
    await providerService.deleteProvider(req.params.id);
    res.status(200).json({ message: 'Provider deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
