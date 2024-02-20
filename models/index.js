const Restaurant = require('./Restaurant');
const Menu = require('./Menu');
const Item = require('./Item');

Restaurant.hasMany(Menu);
Menu.belongsTo(Restaurant);

Menu.belongsToMany(Item, {through: 'menu_item'});
Item.belongsToMany(Menu, {through: 'menu_item'})

module.exports = {
    Restaurant,
    Menu,
    Item
};