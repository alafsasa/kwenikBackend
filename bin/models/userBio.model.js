module.exports = (sequelize, Sequelize) => {
    const UserBio = sequelize.define("userbio", {
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        town: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        }
    });
    return UserBio;
};