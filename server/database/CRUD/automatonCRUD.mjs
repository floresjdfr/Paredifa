import automatonModel from '../models/automaton.mjs'


/**
 * Adds a new automaton to the username specified
 * @param username 
 * @param newAutomaton 
 * @param callback 
 * @returns callback(data, error)
 */
export async function addAutomaton(username, newAutomaton, callback) {
  try {

    return automatonModel.findOne({ userID: username })
      .then(async function (automaton) {

        //In case the username doesn't exist
        if (automaton == null) return createAutomaton({ userID: username, dfa: [newAutomaton] }, callback);

        automaton.dfa.push(newAutomaton);
        const newProduct = await automaton.save();

        //Returns the same object inserted
        if (newProduct === automaton) return callback({ userID: username, dfa: [newAutomaton] }, null);

        return callback(null, "Unexpected error"); //Any other error
      })
  }
  catch (error) {
    return callback(null, error);
  }
}


/**
 * Creates a new object for an username that doesn't exist
 * @param automaton 
 * @param callback 
 * @returns
 */
export async function createAutomaton(automaton, callback) {

  try {
    let newAutomaton = automatonModel(automaton);
    await newAutomaton.save();

    return callback(newAutomaton, null);

  } catch (error) {
    return callback(null, error);
  }
}

/**
 * Returns all the automatons that an user has
 * @param userID User ID used to identify the user
 * @param callback 
 * @returns function(data, error)
 */
export async function readAutomatons(userID, callback) {
  try {
    const query = await automatonModel.findOne({ userID: userID });
    return callback(query != null ? query.toObject() : query, null);
  }
  catch (error) {
    return callback(null, error);
  }
}


/**
 * Returns just the automaton object specified
 * @param userId 
 * @param autName 
 * @returns function(data, error)
 */
export const readAutomaton = async (userId, autName, callback) => {
  try {
    const query = await automatonModel.aggregate()
      .match({ userID: userId })
      .unwind('dfa')
      .match({ "dfa.automatonName": autName });

    return callback(query.length != 0 ? query[0] : null, null);

  } catch (error) {
    return callback(null, error);
  }
}



/**
 * Updates the automaton using the "atmName" specified in arguments
 * @param userID used to find the automatons for that user
 * @param atmName automaton name to be updated
 * @param automatonUpdate object containing the new automaton
 * @param callback 
 * @returns function(data, error)
 */
export const updateAutomaton = async (userID, atmName, automatonUpdate, callback) => {
  try {
    const query = await automatonModel.findOneAndUpdate(
      {
        "userID": userID,
        "dfa.automatonName": atmName
      },
      {
        "$set": {
          "dfa.$": automatonUpdate
        }
      },
      {
        new: true,
        setDefaultsOnInsert: true
      }
    );

    return callback(query != null ? automatonUpdate : null, null);

  } catch (error) {
    return callback(null, error);
  }

}