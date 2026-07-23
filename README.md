# Smart Security System Builder: 
A fully responsive, interactive React & TypeScript configuration builder designed to let users customize, price, and save their ideal security system bundles step-by-step.

## ✨ Features & Architecture
- **Custom React Hook (`useSystemConfig`)**: Centralizes state logic, variant selections, quantities, localStorage persistence, and real-time subtotal/savings calculations.
- **Modular Component Design**: Clean separation of concerns with dedicated `LeftSide` (interactive accordion product selector) and `RightSide` (sticky summary panel) components.
- **Persistent State**: Utilizes browser `localStorage` to save user configuration seamlessly, ensuring selections aren't lost on refresh.
- **Type-Safe Development**: Written entirely in TypeScript with strict interface definitions for products, variants, line items, and configurations.
- **branded web page**: browser icons, a custom theme color, and optimized SEO and social media sharing metadata.

## 🛠️ Tech Stack
- **Framework**: React (Vite / Next.js compatible setup)
- **Styling**: Tailwind CSS, Motion for Animation
- **Language**: TypeScript
- **Backend**: Node.js, Express, CORS 

## 🚀 Clear run instructions
   ```bash
   git clone https://github.com/ZIYAD-MOHAMID/Frontend-Take-Home-Bundle-Builder.git
   cd ./Frontend-Take-Home-Bundle-Builder
   npm install
   npm run dev:all
   ```
