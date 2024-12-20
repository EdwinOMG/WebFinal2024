/** @type {{ items: User[] }} */
const data = require("../data/users.json");
const bcrypt = require("bcryptjs");
/**
 * @template T
 * @typedef {import("../../Client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../Client/src/models/users").User} User
 */

/**
 * Get all users
 * @returns {Promise<DataListEnvelope<User>>}
 */

async function getAll() {
  return {
    isSuccess: true,
    data: data.items,
    total: data.items.length,
  };
}

/**
 * Get a user by username
 * @param {string} username
 * @returns {Promise<DataEnvelope<User>>}
 */
async function get(username) {
  const item = data.items.find((user) => user.username == username);
  return {
    isSuccess: !!item,
    data: item,
  };
}

/**
 * Add a new user
 * @param {User} user
 * @returns {Promise<DataEnvelope<User>>}
 */
async function add(user) {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = { ...user, password: hashedPassword };
  data.items.push(newUser);
  return {
    isSuccess: true,
    data: newUser,
  };
}

/**
 * Update a user
 * @param {string} user // contains original user object
 * @param {Partial<User>} updates // contains what property to update
 * @returns {Promise<DataEnvelope<User>>}
 */
async function update(user, updates) {
  if (updates.password) {
    // if password is updated, hash it
    updates.password = await bcrypt.hash(updates.password, 10);
  }
  Object.assign(user, updates);
  return {
    isSuccess: true,
    data: user,
  };
}

/**
 * Remove a user
 * @param {string} username
 * @returns {Promise<DataEnvelope<number>>}
 */
async function remove(username) {
  const itemIndex = data.items.findIndex((user) => user.username == username);
  if (itemIndex === -1)
    throw {
      isSuccess: false,
      message: "Item not found",
      data: username,
      status: 404,
    };
  data.items.splice(itemIndex, 1);
  return { isSuccess: true, message: "Item deleted", data: username };
}

module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
};
