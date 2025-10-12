const { Store, Rating, User } = require('../models');
const { fn, col } = require('sequelize');

exports.dashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;
    if (!ownerId) return res.status(401).json({ msg: 'Unauthorized' });
    const stores = await Store.findAll({
      where: { ownerId },
      attributes: ['id','name'],
      raw: true,
    });

    
    const result = [];
    for (const s of stores) {
      const avgQ = await Rating.findAll({
        where: { storeId: s.id },
        attributes: [[fn('ROUND', fn('AVG', col('rating')), 1), 'averageRating']],
        raw: true,
      });
      const averageRating = avgQ[0] && avgQ[0].averageRating ? parseFloat(avgQ[0].averageRating) : null;

      const raters = await Rating.findAll({
        where: { storeId: s.id },
        include: [{ model: User, attributes: ['id','name','email'] }],
        attributes: ['userId','rating','createdAt'],
        raw: true,
        nest: true,
      });

      
      const ratersClean = raters.map(r => ({
        userId: r.userId,
        name: r.User?.name || r['User.name'],
        email: r.User?.email || r['User.email'],
        rating: r.rating,
        createdAt: r.createdAt,
      }));

      result.push({ id: s.id, name: s.name, averageRating, raters: ratersClean });
    }

    return res.json({ stores: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
};
