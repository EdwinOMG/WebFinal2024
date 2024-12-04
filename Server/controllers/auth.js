const jwt = require("jsonwebtoken");
const VITE_JWT_SECRET = process.env.VITE_JWT_SECRET;

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function login(req, res) {
  const { username, password } = req.body;
  const { data: user, error } = await supabase
    .from("User")
    .select("*")
    .eq("username", username)
    .single();

  if (error || !user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    VITE_JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
}
module.exports = { login };
