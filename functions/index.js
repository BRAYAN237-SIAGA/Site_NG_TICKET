/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

//const {setGlobalOptions} = require("firebase-functions");
//const {onRequest} = require("firebase-functions/https");
//const logger = require("firebase-functions/logger");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
//setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getMessaging } = require("firebase-admin/messaging");

initializeApp();


// 🔹 Fonction déclenchée quand un bus est ajouté
exports.sendBusNotification = onDocumentCreated(
  "CONTROLE/BUS/NG_TICKET/{busId}",
  async (event) => {
    const newBus = event.data.data();

    // le topic correspond à l’agence
    const topic = newBus.uidagence;

    const message = {
      notification: {
        title: `${newBus.nomagence} — Nouveau bus ajouté `,
        body: `Bus n°${newBus.numerobus}\nCatégorie: ${newBus.categories}\n
        Départ: ${newBus.ville_depart} (${newBus.quartier_depart})\nArrivée: ${newBus.ville_arriver} (${newBus.quartier_arriver})`,
      },
      data: {
        topicagence: topic, // 🔹 essentiel pour filtrer côté Android
        nomagence: newBus.nomagence ?? "",
      },
      topic: topic,
      android: { priority: "high" },
      apns: { headers: { "apns-priority": "10" } },
    };

    try {
      const response = await getMessaging().send(message);
      console.log("✅ Notification envoyée :", response);
      return response;
    } catch (error) {
      console.error("❌ Erreur envoi FCM :", error);
      throw error;
    }
  }
);

//fonction pour declencher une notification a ajout d'une destination
exports.senddestinationNotification = onDocumentCreated(
  "CONTROLE/DESTINATION/NG_TRAVEL/{destinationId}",
  async (event) => {
    const newdestination = event.data.data();

    // le topic correspond à la destinaion
    const topic = newdestination.uid;

    const message = {
      notification: {
        title: `${newdestination.nomagence} — Nouvelle destination ajouté `,
        body: `Départ :${newdestination.ville1} - ${newdestination.quartier1} \nArrivée: ${newdestination.ville2} - ${newdestination.quartier2}`,
      },
      data: {
        topicagence: topic, // 🔹 essentiel pour filtrer côté Android
        nomagence: newdestination.nomagence ?? "",
      },
      topic: topic,
      android: { priority: "high" },
      apns: { headers: { "apns-priority": "10" } },
    };

    try {
      const response = await getMessaging().send(message);
      console.log("✅ Notification envoyée :", response);
      return response;
    } catch (error) {
      console.error("❌ Erreur envoi FCM :", error);
      throw error;
    }
  }
);


//fonction pour envoyer les notificqtion pour ngticket
exports.sendinfongticketandagenceNotification = onDocumentCreated(
  "CONTROLE/MESSAGE_NOTIFICATION/NG_TICKET/{infongticketId}",
  async (event) => {
    const newinfongticketandagence = event.data.data();

    // le topic correspond à l'information
    const topic = newinfongticketandagence.topicagence;

    const message = {
      notification: {
        title: `${newinfongticketandagence.nomagence} — Information importante `,
        body: `${newinfongticketandagence.message}`,
      },
      data: {
        topicagence: topic, // 🔹 essentiel pour filtrer côté Android
        nomagence: newinfongticketandagence.nomagence ?? "",
      },
      topic: topic,
      android: { priority: "high" },
      apns: { headers: { "apns-priority": "10" } },
    };

    try {
      const response = await getMessaging().send(message);
      console.log("✅ Notification envoyée :", response);
      return response;
    } catch (error) {
      console.error("❌ Erreur envoi FCM :", error);
      throw error;
    }
  }
);

