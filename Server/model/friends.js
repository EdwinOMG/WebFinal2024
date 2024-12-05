/** @type {{ items: Friends[] }} */
const data = require("../data/friends.json");

/**
 * @template T
 * @typedef {import("../../Client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../Client/src/models/friends").Friends} Friends
 */

/**
 * Get all users
 * @returns {Promise<DataListEnvelope<Friends>>}
 */

async function getAll() {
  return {
    isSuccess: true,
    data: data.items,
    total: data.items.length,
  };
}

/**
 * Get a user's friends (accepted or not) by username
 * @param {string} user_username - The username of the user to fetch friends for
 * @returns {Promise<DataEnvelope<Friends[]>>}
 */
async function get(user_username) {
  const friendsList = data.items.filter(
    (friend) =>
      friend.user_username === user_username ||
      friend.friend_username === user_username
  );

  // return the list of friends
  return {
    isSuccess: friendsList.length > 0,
    data: friendsList,
  };
}

/**
 * add a new Friend entry
 * @param {Friends} FriendEntry
 * @returns {Promise<DataEnvelope<Friends>>}
 */
async function add(FriendEntry) {
  data.items.push(FriendEntry);
  return {
    isSuccess: true,
    data: FriendEntry,
  };
}

/**
 * Update a Friend entry (change status of friendship)
 * @param {string} user_username - The username of the current user
 * @param {string} friend_username - The username of the friend
 * @param {Partial<Friends>} updates - Contains what property to update (e.g., changing friend_request status)
 * @returns {Promise<DataEnvelope<Friends>>}
 */
async function update(user_username, friend_username, updates) {
  // Find the friend entry with both user_username and friend_username
  const friendEntry = data.items.find(
    (entry) =>
      (entry.user_username === user_username &&
        entry.friend_username === friend_username) ||
      (entry.user_username === friend_username &&
        entry.friend_username === user_username)
  );

  if (!friendEntry) {
    throw {
      isSuccess: false,
      message: "Friend entry not found",
      data: { user_username, friend_username },
      status: 404,
    };
  }
  Object.assign(friendEntry, updates);
  // if its changing to true, handle it
  if (updates.friend_request !== undefined && updates.friend_request === true) {
    friendEntry.friend_request = true;
  }

  return {
    isSuccess: true,
    data: friendEntry,
  };
}

/**
 * Remove a Friend entry
 * @param {string} user_username - The username of the current user
 * @param {string} friend_username - The username of the friend
 * @returns {Promise<DataEnvelope<number>>}
 */
async function remove(user_username, friend_username) {
  const itemIndex = data.items.findIndex(
    (entry) =>
      (entry.user_username === user_username &&
        entry.friend_username === friend_username) ||
      (entry.user_username === friend_username &&
        entry.friend_username === user_username)
  );

  if (itemIndex === -1) {
    throw {
      isSuccess: false,
      message: "Friend entry not found",
      data: { user_username, friend_username },
      status: 404,
    };
  }

  // remove entry
  data.items.splice(itemIndex, 1);

  return {
    isSuccess: true,
    message: "Friend entry deleted",
    data: { user_username, friend_username },
  };
}
module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
};
