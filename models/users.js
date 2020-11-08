module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        fullname: DataTypes.STRING,
        email:  {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        phone: DataTypes.STRING,
        password: DataTypes.STRING(150),
        role: DataTypes.STRING
    }, {});

    User.associate = function (models) {
        // associations can be defined here
        User.hasMany(models.Orders, {
            onDelete: "cascade"
        });
    };

    return User;
}; 

