require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

/**
 * @typedef {import('../../Client/src/models/supabase').Database} UserDatabase
 * @typedef {import('@supabase/supabase-js').SupabaseClient<UserDatabase>} UserClient
 */

// get supabase url and secret key through .env file
const VITE_SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const VITE_SUPABASE_SECRET_KEY = process.env.VITE_SUPABASE_SECRET_KEY;

console.log("Supabase URL:", VITE_SUPABASE_URL);
console.log("Supabase Secret Key:", !!VITE_SUPABASE_SECRET_KEY);

// check if there is a url and key available, if not throw an error.
if (!VITE_SUPABASE_URL || !VITE_SUPABASE_SECRET_KEY) {
  throw new Error("Missing Supabase configuration in environment variables.");
}

// export the connection to the database
module.exports = {
  /**
   * @returns {UserClient}
   */
  getConnection() {
    return createClient(VITE_SUPABASE_URL, VITE_SUPABASE_SECRET_KEY);
  },
};
