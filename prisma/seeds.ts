import prisma from "../src/database.js";

//need update down below
async function main() {
    console.log('seeds.ts needs update')
// 	await prisma.memes.upsert({
//     where: { title: "meu meme" },
//     update: {},
//     create: {
//       title: "meu meme",
//       description: "meu memezin",
//       url: "http://google.com",
//     },
//   });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });