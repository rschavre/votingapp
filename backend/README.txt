// NORMAL Run + existing data in db
node server.js


// OPTIONS Run + create vote option in db + empty votes
    // TO CHANGE VOTE OPTIONS
    Change vote option in conf_validvotes.txt
    Each vote option in new line

    Run db_init.js for filling db with valid vote options
node db_init.js
node server.js

// EMPTY Run + create vote option in db + empty votes + clear users
node db_init.js --clear
node server.js
