const app=require('./app');
const db = require('./db');
const createUserTable = require('./src/models/UserModel').createUserTable;

// Create the users table if it doesn't exist
db.query(createUserTable, (err, result) => {
    if (err) {
        console.error('Error creating table:', err);
    } else {
        console.log('User table created successfully!');
    }

app.listen(4000,function(){
    console.log("application start");
})

});
