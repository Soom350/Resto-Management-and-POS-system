async function main() {
  const now = new Date().toISOString();
  console.log(`[RMTS][seed] Phase 0: aucun jeu de données métier n'est encore injecté (${now}).`);
  console.log('[RMTS][seed] La base est prête pour la PHASE 1 (modélisation et seed réaliste).');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
