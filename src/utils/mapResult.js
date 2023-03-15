const { formatDateTimeForDB } = require("./formatDateTime");

const mapValidationLogActions = ({
    id_validation,
    name_action,
    action
}) => ({
    id_validation,
    nameAction: name_action,
    action,
});

const mapLogTracker = ({
    id_log,
    id_user,
    name_user,
    email_user,
    name_action,
    action,
    createdAt
}) => ({
    idLog: id_log,
    idUser: id_user,
    nameUser: name_user,
    emailUser: email_user,
    nameAction: name_action,
    action,
    createdAt: formatDateTimeForDB(createdAt)
})

const mapValidationLogActionsCMS = ({
    id_validation,
    name_action,
    action,
    many_times,
    channel,
    createdAt,
    updatedAt,
}) => ({
    idValidation: id_validation,
    nameAction: name_action,
    action,
    manyTimes: many_times,
    channel,
    createdAt: formatDateTimeForDB(createdAt),
    updatedAt: formatDateTimeForDB(updatedAt),
});

const mapTrackActionAmounts = ({
    id_track_amount,
    name_user,
    email_user,
    name_action,
    action,
    action_amount,
    createdAt,
    updatedAt,
}) => ({
    idTrackAmount: id_track_amount,
    name: name_user,
    email: email_user,
    nameAction: name_action,
    action,
    actionAmount: action_amount,
    createdAt: formatDateTimeForDB(createdAt),
    updatedAt: formatDateTimeForDB(updatedAt),
})

module.exports = {
    mapValidationLogActions,
    mapLogTracker,
    mapValidationLogActionsCMS,
    mapTrackActionAmounts
}