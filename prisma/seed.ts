import { PrismaClient, RoleUser } from "@prisma/client";
import * as argon from "argon2";

const prisma = new PrismaClient();
async function main() {
  const fakeUsernames = [
    "user1234",
    "johnDoe2024",
    "coolCat99",
    "sunshine_girl",
    "techGeek007",
    "noobMaster69",
    "spaceWalker42",
    "ninjaTurtle99",
    "galaxyTraveler",
    "mysticShadow",
    "gamerDudeX",
    "queenBee123",
    "silentHunter",
    "codeWizard",
    "hipsterCoder",
    "futureCoder",
    "pixelArtist",
    "rockStarDev",
    "theIronHacker",
    "cryptoQueen",
    "xXx_osu_master_xXx",
    "jeb",
    "notch",
    "gaben",
  ];

  for (const username of fakeUsernames) {
    const randomBoolean = Math.random() > 0.2;

    const user = await prisma.user.create({
      data: {
        username: username,
        email: `${username}@false.on`,
        password: await argon.hash(username),
        role: RoleUser.USER,
        is_active: randomBoolean,
      },
    });
  }

  const falseUsers = await prisma.user.findMany();

  for (const user of falseUsers) {
    const randomNumberOfFollows = Math.floor(
      Math.random() * fakeUsernames.length,
    );
    if (user.id !== falseUsers[randomNumberOfFollows].id) {
      const follow = await prisma.user_has_Follow.create({
        data: {
          user_id: user.id,
          follower_id: falseUsers[randomNumberOfFollows].id,
        },
      });
    }
  }

  const subjects = [
    "Technology",
    "Sports",
    "Health & Wellness",
    "Travel",
    "Fashion",
    "Food & Recipes",
    "Education",
    "Science",
    "Art & Design",
    "Music",
    "Movies & TV Shows",
    "Books & Literature",
    "Gaming",
    "Politics",
    "Finance & Investing",
    "Personal Development",
    "Relationships",
    "Parenting",
    "Career Advice",
    "Environment",
    "Entrepreneurship",
    "Real Estate",
    "History",
    "Automotive",
    "Pets & Animals",
    "Fitness & Exercise",
    "Photography",
    "Philosophy",
    "Spirituality",
    "DIY & Crafts",
  ];

  for (const subject of subjects) {
    await prisma.tag.create({ data: { name: subject } });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
