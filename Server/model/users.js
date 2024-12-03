/** @type {{ items: User[] }} */
const data = require("../data/users.json");

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
 * Get a user by id
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
  data.items.push(user);
  return {
    isSuccess: true,
    data: user,
  };
}

/**
 * Update a user
 * @param {User} user
 * @returns {Promise<DataEnvelope<User>>}
 */
async function update(user) {
  Object.assign(user);
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
