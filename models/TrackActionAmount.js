module.exports = (sequelize, DataTypes) => {
    const TrackActionAmount = sequelize.define('TrackActionAmount', {
        id_track_amount: {
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
            addIndex: true,
        },
        action: {
            type: DataTypes.STRING(50),
            allowNull: false,
            addIndex: true,
        },
        action_amount: {
            type: DataTypes.BIGINT(),
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
        tableName: 'track_action_amounts'
    });

    return TrackActionAmount;
}