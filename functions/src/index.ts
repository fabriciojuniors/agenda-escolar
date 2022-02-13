import functions = require("firebase-functions");
import admin = require("firebase-admin");
import moment = require("moment");

admin.initializeApp(functions.config().firebase);

exports.enviarNotificacaoCompromisso = functions.pubsub
    .schedule("every 30 minutes")
    .onRun(async (context) => {
      const db = admin.firestore();

      const compromissosRef = db.collection("compromissos");
      const notificationTokenRef = db.collection("notification_token");

      const querySnapshot = await compromissosRef.get();
      querySnapshot.forEach(async (doc) => {
        const nome = doc.data().nome;
        const descricao = doc.data().descricao;
        const data = doc.data().data.split("T");
        const lembrarEm = doc.data().lembrarEm.split("T");
        const lembrarEmDT = doc.data().lembrarEm;
        const usuario = doc.data().usuario;
        const hoje = moment().format("yyyy-MM-DD");
        const hora = moment(new Date()).subtract(3, "hours").format("HH");
        const minuto = moment(new Date()).format("mm");
        const lembrarEmHora = moment(lembrarEmDT).format("HH");
        const lembrarEmMinuto = moment(lembrarEmDT).format("mm");

        if (hoje.toString() == lembrarEm[0].toString() &&
            hora.toString() == lembrarEmHora.toString() &&
            parseInt(minuto) >= parseInt(lembrarEmMinuto)) {
          const querySnapshotToken = await notificationTokenRef.get();
          querySnapshotToken.forEach((notification) => {
            const token = notification.data().token.value;
            const usuarioToken = notification.data().user_id;

            if (usuario.toString() == usuarioToken.toString()) {
              const payload = {
                token: token,
                notification: {
                  title: nome,
                  body: `O evento ocorre em ${moment(data[0]).format(
                      "DD/MM/yyyy"
                  )} as ${data[1]}. Detalhes: ${descricao}`,
                },
                data: {
                  body: `O evento ocorre em ${moment(data[0]).format(
                      "dd/MM/yyyy"
                  )} as ${data[1]}. Detalhes: ${descricao}`,
                },
              };

              admin
                  .messaging()
                  .send(payload)
                  .then((res) => {
                    console.log("Notificação enviada com sucesso.");
                  })
                  .catch((err) => {
                    console.log(`Erro eo enviar notificação: ${err}`);
                  });
            }
          });
        }
      });

      return null;
    });
