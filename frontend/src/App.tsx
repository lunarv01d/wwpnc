import { useEffect, useState } from "react";
import "./App.css";

type Notification = {
  id: number;
  source: string;
  title: string;
  message: string;
  timestamp: string;
};

function App() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  async function loadNotifications() {
    const res = await fetch("http://localhost:3000/api/notifications");
    const data: Notification[] = await res.json();
    setNotifications(data);
  }

  useEffect(() => {
    loadNotifications();

    const interval = setInterval(loadNotifications, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="plaza">
      <header className="title-area">
        <h1>WWPNC</h1>
        <p>Wara Wara Plaza Notification Center</p>
      </header>

      <section className="notification-plaza">
        {notifications.length === 0 ? (
          <p className="empty">No notifications in the plaza yet.</p>
        ) : (
          notifications.map((notification) => (
            <div className="mii-card" key={notification.id}>
              <div className="mii-head">🙂</div>
              <div className="speech-bubble">
                <strong>{notification.title}</strong>
                <p>{notification.message}</p>
                <span>{notification.source}</span>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

export default App;