import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';

try {
  await prisma.$queryRaw`TRUNCATE reviews, menu_items, restaurants, users RESTART IDENTITY CASCADE;`;

  const usersData = [
    { email: 'alice@test.com', password: 'alice1234' },
    { email: 'bob@example.com', password: 'bob1234' },
    { email: 'charlie@demo.com', password: 'charlie1234', role: 'ADMIN' },
  ];

  const users = [];

  for (const userData of usersData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        role: userData.role || 'USER',
      },
    });

    users.push(user);
  }

  const [alice, bob, charlie] = users;

  const aliceRestaurant = await prisma.restaurant.create({
    data: {
      name: 'Sakura Sushi',
      description: 'Authentic Japanese cuisine in the heart of the city',
      cuisine: 'Japanese',
      location: 'Charlotte, NC',
      ownerId: alice.id,
    },
  });

  const bobRestaurant = await prisma.restaurant.create({
    data: {
      name: "Bob's Burgers",
      description: 'Classic American burgers and fries since 1998',
      cuisine: 'American',
      location: 'Raleigh, NC',
      ownerId: bob.id,
    },
  });

  const charlieRestaurant = await prisma.restaurant.create({
    data: {
      name: 'Seoul Kitchen',
      description: 'Traditional Korean BBQ and stews',
      cuisine: 'Korean',
      location: 'Durham, NC',
      ownerId: charlie.id,
    },
  });

  await prisma.menuItem.createMany({
    data: [
      {
        name: 'Spicy Tuna Roll',
        description: 'Fresh tuna with spicy mayo and cucumber',
        price: 12.99,
        category: 'main',
        restaurantId: aliceRestaurant.id,
      },
      {
        name: 'Miso Soup',
        description: 'Traditional soybean paste soup with tofu',
        price: 4.5,
        category: 'appetizer',
        restaurantId: aliceRestaurant.id,
      },
      {
        name: 'Classic Cheeseburger',
        description: 'Beef patty with cheddar, lettuce, and tomato',
        price: 10.99,
        category: 'main',
        restaurantId: bobRestaurant.id,
      },
      {
        name: 'Bulgogi',
        description: 'Marinated grilled beef with rice',
        price: 15.99,
        category: 'main',
        restaurantId: charlieRestaurant.id,
      },
    ],
  });

  await prisma.review.createMany({
    data: [
      {
        rating: 5,
        comment: 'Best sushi in Charlotte, highly recommend.',
        userId: bob.id,
        restaurantId: aliceRestaurant.id,
      },
      {
        rating: 4,
        comment: 'Great burgers but a bit pricey for the portion.',
        userId: alice.id,
        restaurantId: bobRestaurant.id,
      },
      {
        rating: 5,
        comment: 'Authentic Korean flavors, just like home.',
        userId: alice.id,
        restaurantId: charlieRestaurant.id,
      },
    ],
  });

  console.log('Seed completed successfully!');
} catch (error) {
  console.error('Seed failed:', error);
} finally {
  await prisma.$disconnect();
}