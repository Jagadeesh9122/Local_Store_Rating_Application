const User = require('./user.model');
const Store = require('./store.model');
const Rating = require('./rating.model');


User.hasMany(Rating, { foreignKey: 'userId', onDelete: 'CASCADE' });
Rating.belongsTo(User, { foreignKey: 'userId' });

Store.hasMany(Rating, { foreignKey: 'storeId', onDelete: 'CASCADE' });
Rating.belongsTo(Store, { foreignKey: 'storeId' });

User.hasMany(Store, { foreignKey: 'ownerId' });
Store.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

module.exports = { User, Store, Rating };
