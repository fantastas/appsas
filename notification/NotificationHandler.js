import PushNotification from 'react-native-push-notification';
import { storeData } from '../functions/StoreData';
class NotificationHandler {
  onNotification(notification) {
    console.log('NotificationHandler:', notification);
    localNotif(notification)
    if (typeof this._onNotification === 'function') {
      this._onNotification(notification);
    }
  }

  onRegister(token) {
    // console.log('NotificationHandler:', token);
    storeData(token,'fire_token')
    if (typeof this._onRegister === 'function') {
      this._onRegister(token);
    }
  }

  onAction(notification) {
    console.log ('Notification action received:');
    console.log(notification.action);
    console.log(notification);

    if(notification.action === 'Yes') {
      PushNotification.invokeApp(notification);
    }
  }

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError(err) {
    console.log(err);
  }
  
  attachRegister(handler) {
    this._onRegister = handler;
  }

  attachNotification(handler) {
    this._onNotification = handler;
  }
}

const handler = new NotificationHandler();

PushNotification.configure({
  onRegister: handler.onRegister.bind(handler),

  onNotification: handler.onNotification.bind(handler),
  onAction: handler.onAction.bind(handler),
  onRegistrationError: handler.onRegistrationError.bind(handler),
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

export default handler;

const localNotif= (notification)=> {
  console.log('notification',notification)
  // let data = notification
  // let title = notification.title
  // console.log(title)
    let soundName = false
    PushNotification.localNotification({ 
      channelId:  'sound-channel-id' ,
      title: notification.title, // (optional)
      message: notification.message, // (required)
    });
  }
