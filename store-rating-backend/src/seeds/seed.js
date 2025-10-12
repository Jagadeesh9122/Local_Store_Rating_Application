require('dotenv').config();
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/db');
const { User, Store, Rating } = require('../models');

async function seed() {
  try {
    await sequelize.sync({ force: true });

    
    const hash = async pass => await bcrypt.hash(pass, 10);

   
    const admin = await User.create({
      name: 'System Administrator NameMin20Chars',
      email: 'admin@example.com',
      password: await hash('Admin@1234'),
      address: 'Headquarters',
      role: 'admin'
    });


    const owners = await Promise.all([
      User.create({ name: 'Venkatachalam Reddy', email: 'owner1@example.com', password: await hash('Owner@1234'), address: 'Street 101', role: 'owner' }),
      User.create({ name: 'Chandramouli Babu', email: 'owner2@example.com', password: await hash('Owner@1234'), address: 'Street 102', role: 'owner' }),
      User.create({ name: 'Ramalingeswara Rao', email: 'owner3@example.com', password: await hash('Owner@1234'), address: 'Street 103', role: 'owner' }),
      User.create({ name: 'Bhavanisankar Raju', email: 'owner4@example.com', password: await hash('Owner@1234'), address: 'Street 104', role: 'owner' }),
      User.create({ name: 'Satyavratamma Devi', email: 'owner5@example.com', password: await hash('Owner@1234'), address: 'Street 105', role: 'owner' }),
    ]);

 
   /*const users = [];
    for (let i = 1; i <= 10; i++) {
      users.push(await User.create({
        name: `Regular User ${i} LongEnoughNameOK`,
        email: `user${i}@example.com`,
        password: await hash('User@1234'),
        address: `User Address ${i}`,
        role: 'user'
      }));
    }*/
    const users = [];

    const userPass = await bcrypt.hash('User@1234', 10); 
    const u1 = await User.create({ name: 'Ghattamaneni Mahesh', email: 'user1@example.com', password: userPass, address: 'Addr1', role: 'user' }); 
    const u2 = await User.create({ name: 'Konidela Ram Charan Tej', email: 'user2@example.com', password: userPass, address: 'Addr2', role: 'user' });
    const u3 = await User.create({ name: 'Vijay Deverakonda Sai', email: 'user3@example.com', password: userPass, address: 'Addr3', role: 'user' });
    const u4 = await User.create({ name: 'Allu Venkatesh Arjun', email: 'user4@example.com', password: userPass, address: 'Addr4', role: 'user' });
    const u5 = await User.create({ name: 'Ravi Shankar Raju Bhupat', email: 'user5@example.com', password: userPass, address: 'Addr5', role: 'user' });
    const u6 = await User.create({ name: 'Venkatesh Daggubati', email: 'user6@example.com', password: userPass, address: 'Addr6', role: 'user' });
    const u7 = await User.create({ name: 'Akkineni Nagarjuna Rao', email: 'user7@example.com', password: userPass, address: 'Addr7', role: 'user' });
    const u8 = await User.create({ name: 'Nandamuri Taraka Rama', email: 'user8@example.com', password: userPass, address: 'Addr8', role: 'user' });
    const u9 = await User.create({ name: 'Pawan Kalyan Konidela', email: 'user9@gmail.com', password: userPass, address: 'Addr9', role: 'user' });
    const u10 = await User.create({ name: 'Konidela Siva Shankar vara Prasad', email: 'user10@gmail.com', password: userPass, address: 'Addr10', role: 'user' });
    users.push(u1, u2, u3, u4, u5, u6, u7, u8, u9, u10);

    
    const stores = await Promise.all([
      Store.create({ name: 'Alpha Store', email: 'alpha@store.com', address: 'Alpha Lane 1', ownerId: owners[0].id }),
      Store.create({ name: 'Beta Electronics', email: 'beta@store.com', address: 'Beta Road 2', ownerId: owners[0].id }),
      Store.create({ name: 'Gamma Grocers', email: 'gamma@store.com', address: 'Gamma Street 3', ownerId: owners[1].id }),
      Store.create({ name: 'Delta Mart', email: 'delta@store.com', address: 'Delta Block 4', ownerId: owners[2].id }),
      Store.create({ name: 'Epsilon Fashion', email: 'epsilon@store.com', address: 'Epsilon Avenue 5', ownerId: owners[2].id }),
      Store.create({ name: 'Zeta Café', email: 'zeta@store.com', address: 'Zeta Plaza 6', ownerId: owners[3].id }),
      Store.create({ name: 'Eta Hardware', email: 'eta@store.com', address: 'Eta Crossroad 7', ownerId: owners[4].id }),
      Store.create({ name: 'Theta Books', email: 'theta@store.com', address: 'Theta Corner 8', ownerId: owners[4].id }),
    ]);

   
    for (let i = 0; i < 20; i++) {
      const user = users[i % users.length];
      const store = stores[i % stores.length];
      const ratingValue = Math.floor(Math.random() * 5) + 1;
      await Rating.create({ userId: user.id, storeId: store.id, rating: ratingValue });
    }

    console.log('✅ Database seeded successfully!');
    console.log('Admin: admin@example.com / Admin@1234');
    console.log('Owner: owner1@example.com / Owner@1234');
    console.log('User: user1@example.com / User@1234');
    process.exit(0);

  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seed();
