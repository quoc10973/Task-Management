# 📝 Task Management System with RabbitMQ & Kubernetes (Kind)

## 📌 Project Description

![Image](https://github.com/user-attachments/assets/47d37211-ff78-4e67-8828-005e84cbab30)

This is a simple **task management system** where users can:

- Receive a task
- Update task status (e.g. Completed)

When a user marks a task as **Completed**, the system:

1. Sends an update event to **RabbitMQ** asynchronously
2. A separate **Mail Sender Service** consumes the event and sends an email notification to the user confirming the successful task update

---

## 🛠️ Technologies Used

| Component         | Technology                         |
|------------------|-------------------------------------|
| Frontend         | React + Vite                        |
| Backend          | NestJS                              |
| Queue Messaging  | RabbitMQ                            |
| Email Service    | Nodemailer                          |
| Local Deployment | Kubernetes (via Kind)               |

---

## ⚙️ Project Structure

```bash
.
├── backend/               # Main backend service (NestJS)
├── frontend/              # User interface (React + Vite)
├── mail-sender-service/   # Email service that consumes RabbitMQ
├── k8s/                   # Kubernetes manifests (Deployment, Service, etc.)
