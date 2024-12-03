/** @type {{ items: Workout[] }} */
const data = require("../data/workouts.json");

/**
 * @template T
 * @typedef {import("../../Client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../Client/src/models/workouts").Workout} Workout
 */

/**
 * Get all workouts
 * @returns {Promise<DataListEnvelope<Workout>>}
 */

async function getAll() {
  return {
    isSuccess: true,
    data: data.items,
    total: data.items.length,
  };
}

/**
 * Get users workouts by getting workouts with the same
 * @param {string} username
 * @returns {Promise<{ isSuccess: boolean, data: Workout[] }>}
 */
async function getAll(username) {
  const workouts = data.items.filter(
    (workout) => username == workouts.username
  );
  return {
    isSuccess: workouts.length > 0,
    data: workouts,
  };
}

/**
 * Get a workout by username and the id of the workout
 * @param {string} username
 * @param {number} id
 * @returns {Promise<{ isSuccess: boolean, data: Workout }>}
 */
async function get(id, username) {
  const workout = data.items.find(
    (workout) => workout.username == username && workout.id == id
  );
  return {
    isSuccess: !!workout,
    data: workout,
  };
}

/**
 * Add a new workout to the users workouts
 * @param {Workout} workout
 * @returns {Promise<DataEnvelope<Workout>>}
 */
async function add(workout) {
  workout.id =
    data.items.reduce((prev, x) => (x.id > prev ? x.id : prev), 0) + 1;
  data.items.push(workout);
  return {
    isSuccess: true,
    data: workout,
  };
}

/**
 * Update a workout
 * @param {number} id
 * @param {Workout} workout
 * @returns {Promise<DataEnvelope<Workout>>}
 */
async function update(id, workout) {
  const workoutToUpdate = get(workout.id, workout.username);
  Object.assign(workoutToUpdate, workout);
  return {
    isSuccess: true,
    data: workoutToUpdate,
  };
}

/**
 * Remove a workout
 * @param {number} id
 * @param {string} username
 * @returns {Promise<DataEnvelope<number>>}
 */
async function remove(id, username) {
  const itemIndex = data.items.findIndex(
    (workout) => workout.id == id && workout.username == username
  );
  if (itemIndex === -1)
    throw {
      isSuccess: false,
      message: "Workout not found",
      data: id,
      status: 404,
    };
  data.items.splice(itemIndex, 1);
  return { isSuccess: true, message: "Item deleted", data: id };
}

module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
};
