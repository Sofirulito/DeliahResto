module.exports = (sequelize, type) => {
    return sequelize.define('order',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        state: type.STRING,
        description: type.STRING,
        total: type.STRING,
        direccion: type.STRING,
    })
}