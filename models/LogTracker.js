module.exports = (sequelize, DataTypes) => {
    const LogTracker = sequelize.define('LogTracker', {
        id_log: {
            type: DataTypes.BIGINT(),
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        id_user: {
            type: DataTypes.STRING(50),
            allowNull: false,
            indexedDB: true,
        },
        name_user: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email_user: {
            type: DataTypes.STRING(),
            allowNull: false,
            indexedDB: true,
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
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    }, {
        tableName: 'logs_tracker'
    });

    return LogTracker;
}