const { Op, fn, col } = require('sequelize');
const bcrypt = require('bcryptjs');
const { User, Store, Rating } = require('../models');

exports.dashboard = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();
    return res.json({ totalUsers, totalStores, totalRatings });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, address = '', password, role = 'user' } = req.body;
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ msg: 'Email exists' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, address, password: hashed, role });
    return res.status(201).json({ msg: 'Created', user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

exports.createStore = async (req, res) => {
  try {
    const { name, email, address = '', ownerId = null } = req.body;
    const store = await Store.create({ name, email, address, ownerId });
    return res.status(201).json({ msg: 'Store created', store });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const { q, role, sort = 'name', order = 'asc' } = req.query;
    const where = {};
    if (q) {
      where[Op.or] = [
        { name: { [Op.like]: `%${q}%` } },
        { email: { [Op.like]: `%${q}%` } },
        { address: { [Op.like]: `%${q}%` } },
      ];
    }
    if (role) where.role = role;
    const users = await User.findAll({ where, order: [[sort, order]] , attributes: ['id','name','email','address','role'] });
    return res.json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

exports.listStores = async (req, res) => {
  try {
    const { q, sort = 'name', order = 'asc' } = req.query;
    const where = {};
    if (q) where[Op.or] = [
      { name: { [Op.like]: `%${q}%` } },
      { email: { [Op.like]: `%${q}%` } },
      { address: { [Op.like]: `%${q}%` } },
    ];

    
    const stores = await Store.findAll({
      where,
      attributes: [
        'id','name','email','address','ownerId',
        [fn('ROUND', fn('AVG', col('Ratings.rating')), 1), 'averageRating']
      ],
      include: [{ model: Rating, attributes: [] }],
      group: ['Store.id'],
      order: [[sort, order]],
      raw: true,
    });

   
    return res.json(stores);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id, { attributes: ['id','name','email','address','role'] });
    if (!user) return res.status(404).json({ msg: 'Not found' });

    
    if (user.role === 'owner') {
      const stores = await Store.findAll({
        where: { ownerId: user.id },
        attributes: ['id','name',[fn('ROUND', fn('AVG', col('Ratings.rating')), 1), 'averageRating']],
        include: [{ model: Rating, attributes: [] }],
        group: ['Store.id'],
        raw: true,
      });
      return res.json({ ...user.toJSON(), stores });
    }

    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
};
