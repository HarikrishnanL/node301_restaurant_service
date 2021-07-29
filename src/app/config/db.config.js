module.exports = {
    HOST:process.env.host,
    USER:process.env.user,
    Password:process.env.password,
    DB:process.env.database,
    dialect:process.env.dialect || "postgres",
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
}