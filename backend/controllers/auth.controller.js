export const googleCallback = (req, res) => {
  res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/`);
};


export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Logout failed" });
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("Session destruction error:", err);
        return res.status(500).json({ message: "Failed to clear session" });
      }

      res.clearCookie("connect.sid", {
        path: "/",
        httpOnly: true,
        sameSite: "lax", // make sure this matches your auth flow
      });

      // ❗️DO NOT REDIRECT HERE
      return res.status(200).json({ message: "Logged out successfully" });
    });
  });
};
