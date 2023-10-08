const User = require('../models/user.model');

async function findLastInsertedUser() {
    console.log('Find last inserted user into db');

    try {
        const result = await User.find({})
                                 .sort({ _id: -1 })
                                 .limit(1);                              
        return result[0];                            
    } catch (err) {
        console.log('Error:', err);
        return false;
    }
}

module.exports = { findLastInsertedUser };
