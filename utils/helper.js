import { AsyncStorage } from "react-native";
import { Permissions, Notifications } from "expo";

export const STORAGE_KEY = 'Udacity:FlashCards'
const NOTIFICATION_KEY = 'MobileFlashCards:notifications'

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
        title: 'Quiz Time',
        body: "Don't forget to attempt quiz today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification(day = 0) {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
                    if (status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync()

                        let notificationTime = new Date()
                        notificationTime.setDate(notificationTime.getDate() + day)
                        notificationTime.setHours(12)
                        notificationTime.setMinutes(0)

                        Notifications.scheduleLocalNotificationAsync(
                            createNotification(),
                            {
                                time: notificationTime,
                                repeat: 'day',
                            }
                        )

                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                    }
                })
            }
        })
}