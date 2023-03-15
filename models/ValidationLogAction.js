module.exports = (sequelize, DataTypes) => {
    const ValidationLogAction = sequelize.define('ValidationLogAction', {
        id_validation: {
            type: DataTypes.STRING(50),
            allowNull: false,
            primaryKey: true,
        },
        name_action: {
            type: DataTypes.STRING(50),
            allowNull: false,
            indexedDB: true,
        },
        action: {
            type: DataTypes.STRING(50),
            allowNull: false,
            indexedDB: true,
        },
        many_times: {
            type: DataTypes.BIGINT(),
            allowNull: false,
        },
        channel: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    }, {
        tableName: 'validation_logs_action'
    });

    return ValidationLogAction;
}