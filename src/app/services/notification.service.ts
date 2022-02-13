import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { ActionPerformed, PushNotifications, PushNotificationSchema, Token } from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private router: Router, private auth : AngularFireAuth, private db : AngularFirestore) { }

  public initPush() {
    if (Capacitor.platform !== "web") {
      this.registerPush();
    }
  }

  private registerPush() {
    PushNotifications.requestPermissions().then((permission) => {
      if (permission.receive === 'granted') {
        PushNotifications.register();
      } else {
        console.log("Sem acesso");

      }
    })

    PushNotifications.addListener('registration',
      (token: Token) => {
        this.auth.authState.subscribe( state => {
          this.db.collection("notification_token", (ref) => ref.where("user_id", "==", state.uid)).snapshotChanges()
            .subscribe(data => {
              data.map(item => {
                this.db.collection("notification_token").doc(item.payload.doc.id).delete();
              })
            }).unsubscribe()
          this.db.collection("notification_token").add({user_id: state.uid, token: token});
        }) 
      }
    );
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        //alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        //alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }

}
