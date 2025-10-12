const { Op, fn, col } = require('sequelize');
const { Store, Rating, User } = require('../models');

exports.listStores = async (req, res) => {
  try {
    const { name, address, sort = 'name', order = 'asc' } = req.query;
    const where = {};
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (address) where.address = { [Op.like]: `%${address}%` };

   
    const storesRaw = await Store.findAll({
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

   
    const userId = req.user?.id;
    let userRatingsMap = {};
    if (userId) {
      const myRatings = await Rating.findAll({ where: { userId } });
      myRatings.forEach(r => userRatingsMap[r.storeId] = r.rating);
    }

  
    const stores = storesRaw.map(s => ({
      id: s.id,
      name: s.name,
      email: s.email,
      address: s.address,
      ownerId: s.ownerId,
      averageRating: s.averageRating === null ? null : parseFloat(s.averageRating),
      userRating: userRatingsMap[s.id] ?? null,
    }));

    return res.json(stores);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

exports.getStore = async (req, res) => {
  try {
    const id = req.params.id;
    const store = await Store.findByPk(id);
    if (!store) return res.status(404).json({ msg: 'Not found' });

    const avg = await Rating.findAll({
      where: { storeId: id },
      attributes: [[fn('ROUND', fn('AVG', col('rating')), 1), 'avgRating']],
      raw: true,
    });

    const averageRating = avg[0] ? (avg[0].avgRating ? parseFloat(avg[0].avgRating) : null) : null;

    let userRating = null;
    if (req.user) {
      const my = await Rating.findOne({ where: { storeId: id, userId: req.user.id } });
      if (my) userRating = my.rating;
    }

    return res.json({ id: store.id, name: store.name, address: store.address, averageRating, userRating });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
};

exports.submitRating = async (req, res) => {
  try {
    const storeId = req.params.id;
    const userId = req.user.id;
    const { rating } = req.body;
    const parsed = parseInt(rating, 10);
    if (!parsed || parsed < 1 || parsed > 5) return res.status(400).json({ msg: 'Rating must be 1-5' });

  
    const store = await Store.findByPk(storeId);
    if (!store) return res.status(404).json({ msg: 'Store not found' });

   
    const existing = await Rating.findOne({ where: { storeId, userId } });
    if (existing) {
      existing.rating = parsed;
      await existing.save();
      return res.json({ msg: 'Rating updated' });
    } else {
      await Rating.create({ storeId, userId, rating: parsed });
      return res.status(201).json({ msg: 'Rating created' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
};
