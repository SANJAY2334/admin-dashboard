const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  console.error("❌ Password mismatch for user:", user.email);
  return res.status(400).json({ message: "Invalid email or password" });
}
