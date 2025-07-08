export const googleCallback = (req, res) => {
  res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/`);
};

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}`);
  });
};
