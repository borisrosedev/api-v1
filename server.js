const dbClient = require("./database/db-client");
/**
 * L'application utilise un programme qui peut se connecter à la base de données
 */
const app = require("./app");
/**
 * En réalité l'application représente toute la logique métier du serveur
 * Cette logique je l'ai mise dans un fichier qui s'appelle app
 */

async function start() {
  /**
   * Il s'agit du corps d'une fonction asynchrone autrement dit
   * certains événements qui lui sont liés peuvent prendre plus ou moins de temps
   * donc le programme doit savoir qu'il peut attendre ces événements avant de continuer à s'exécuter
   * de façon séquentielle.
   */

  try {
    /**
     * Voici l'événement asychrone
     *
     */
    await dbClient.authenticate();
    /**
     * On vérifie de façon asynchrone la connectivité entre ce programme ( dbClient )
     * et la base de données (shop)
     */

    console.log("✅ La connexion à la base de données a réussi");

    app.listen(app.get("port"), app.get("host"), () =>
      console.log(`Listening at http://${app.get("host")}:${app.get("port")}`),
    );
  } catch (err) {
    /**
     * Si une instruction du bloc try échoue
     * on arrive ici
     */

    console.log("🛑La connexion à la base de données a échoué", err);
    process.exit(1);
  }
}

start();
