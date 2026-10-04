async function main() {
  console.log("RMTS seed — à implémenter");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // disconnect prisma when ready
  });
