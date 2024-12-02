require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

/**
 * @typedef {import('../../Client/src/models/supabase').Database} UserDatabase
 * @typedef {import('@supabase/supabase-js').SupabaseClient<UserDatabase>} UserClient
 */

module.exports = {
  /**
   * @returns {UserClient}
   */
  getConnection() {
    return createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY
    );
  },
};
