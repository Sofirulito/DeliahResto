module.exports = (sequelize, type) => {
    return sequelize.define('user',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: type.STRING,
            unique: true,
            allowNull: false,
        },
        fullname: type.STRING,
        email:  {
            type: type.STRING,
            unique: true,
            allowNull: false,
        },
        phone: type.STRING,
        password: type.STRING(150),
        role: type.STRING
    })
}