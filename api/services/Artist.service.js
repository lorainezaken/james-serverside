const Artist = require('../models/Artist.js');

module.exports = {
    getArtists(ids = []) {
        return Artist.find({
            _id: {
                $in: ids
            }
        });
    }
}