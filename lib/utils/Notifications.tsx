import { createContext, Dispatch, SetStateAction, useState } from "react";
import { v4 as uuid } from "uuid";

type Notifications = { id: string; element: JSX.Element }[];

export class NotificationStore {
  notifications: Notifications;
  set_notificatons: Dispatch<SetStateAction<Notifications>>;

  constructor() {
    let [notifications, set_notificatons] = useState<Notifications>([]);

    this.notifications = notifications;
    this.set_notificatons = set_notificatons;
  }

  add_notification(id: string, element: JSX.Element) {
    this.set_notificatons((notifications) => [
      ...notifications,
      {
        id: id,
        element: element,
      },
    ]);
  }

  clear_notification(id: string) {
    this.set_notificatons(
      this.notifications.filter((notification) => notification.id != id)
    );
  }

  update_notification(id: string, element: JSX.Element) {
    this.set_notificatons((notifications) =>
      notifications.map((notification) => {
        if (notification.id != id) {
          return notification;
        }

        return {
          id,
          element,
        };
      })
    );
  }

  notify(element: JSX.Element): string {
    let id = uuid();
    this.add_notification(id, element);
    return id;
  }

  render() {
    return (
      <div>
        {this.notifications.map((notification) => (
          <div key={notification.id}>{notification.element}</div>
        ))}
      </div>
    );
  }
}

export const NotificationContext = createContext<NotificationStore>({} as any);
