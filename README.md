# Smart Security System Builder

A fully responsive, interactive React & TypeScript configuration builder designed to let users customize, price, and save their ideal security system bundles step-by-step.

## ✨ Features & Architecture

- **Custom React Hook (`useSystemConfig`)**: Centralizes state logic, variant selections, quantities, localStorage persistence, and real-time subtotal/savings calculations.
- **Modular Component Design**: Clean separation of concerns with dedicated `LeftSide` (interactive accordion product selector) and `RightSide` (sticky summary panel) components.
- **Persistent State**: Utilizes browser `localStorage` to save user configuration seamlessly, ensuring selections aren't lost on refresh.
- **Type-Safe Development**: Written entirely in TypeScript with strict interface definitions for products, variants, line items, and configurations.

## 🛠️ Tech Stack

- **Framework**: React (Vite / Next.js compatible setup)
- **Styling**: Tailwind CSS
- **Language**: TypeScript

---

## 🚀 Getting Started (Run Instructions)

Follow these steps to run the project locally from a clean clone:

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd <repository-folder>
   ```
