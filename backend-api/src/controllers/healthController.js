export const healthCheck = (req, res) => {
  res.json({ status: "ok", service: "backend-api", timestamp: Date.now() });
};
