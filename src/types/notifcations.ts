export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  time: string;   // Example: "2 min ago"
  type: "info" | "warning" | "success" | "error";
}
