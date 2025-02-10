# PalatePassport

## 📌 Introduction
**PalatePassport** is a mobile application designed to help users explore, document, and share their culinary experiences. Whether you are a food enthusiast, a traveler, or someone who loves trying new dishes, PalatePassport provides an interactive way to track your dining adventures, discover new restaurants, and share recommendations with friends.

## 🌟 Features
- **Restaurant Discovery** – Find new dining spots based on your location and preferences.
- **Meal Logging** – Keep a record of your dining experiences, including photos, reviews, and personal notes.
- **Social Sharing** – Share your favorite meals and restaurant recommendations with friends and the community.
- **Personalized Suggestions** – Receive recommendations based on your dining history and preferences.
- **Offline Mode** – Save restaurant details and meal logs even when you're not connected to the internet.
- **User Profiles** – Create a personalized profile to keep track of your food journey.
- **Bookmark Favorites** – Save your favorite restaurants for easy access later.
- **Review and Rating System** – Rate and review restaurants based on your experiences.

## 🛠️ Tech Stack
- **Frontend:** React Native
- **Backend:** Node.js with Express.js
- **Database:** MongoDB (with Mongoose ORM)
- **Authentication:** Firebase Authentication
- **API Integration:** Google Places API for restaurant discovery
- **Storage:** Cloudinary for image uploads

## 📥 Installation Guide
Follow these steps to set up the project on your local machine:

### 1️⃣ Prerequisites
Before installing, ensure you have the following installed:
- Node.js (Download from [Node.js official website](https://nodejs.org/))
- npm (comes with Node.js) or Yarn
- React Native CLI
- Android Studio (for Android development) or Xcode (for iOS development)

### 2️⃣ Clone the Repository
```sh
git clone https://github.com/Al-Scripting/PalatePassport.git
cd PalatePassport
```

### 3️⃣ Install Dependencies
```sh
npm install  # or yarn install
```

### 4️⃣ Setup Environment Variables
Create a `.env` file in the root directory and add the following variables:
```
MONGO_URI=your_mongodb_connection_string
FIREBASE_API_KEY=your_firebase_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 5️⃣ Start the Development Server
```sh
npm start  # or yarn start
```

For mobile development:
```sh
npx react-native run-android  # For Android
npx react-native run-ios      # For iOS
```

## 📋 Usage Guide
### 🎯 Creating an Account
- Sign up using your email or Google authentication.
- Set up your profile with your name, bio, and profile picture.

### 🏠 Exploring Restaurants
- Use the search function to find restaurants based on location and cuisine.
- View details, including images, ratings, and user reviews.

### 🍽️ Logging a Meal
- Capture a photo of your meal.
- Add details such as restaurant name, dish name, rating, and personal notes.
- Save it to your food journal.

### 🌎 Social Features
- Follow other food enthusiasts and see their recommendations.
- Like and comment on shared meal logs.
- Share your food journey on social media platforms.

## 🏗️ Contributing
We welcome contributions! Follow these steps to contribute:
1. **Fork the repository** on GitHub.
2. **Create a new branch** for your feature or bug fix.
3. **Commit your changes** with descriptive messages.
4. **Push your branch** to your forked repository.
5. **Submit a pull request** and describe your changes.

### 💡 Contribution Guidelines
- Follow best coding practices.
- Write meaningful commit messages.
- Ensure your code does not break existing features.
- Test your code before submitting a pull request.

## 🐛 Reporting Issues
If you find bugs or have feature requests, please open an issue on [GitHub Issues](https://github.com/Al-Scripting/PalatePassport/issues).

## 📜 License
This project is licensed under the **MIT License**. You can use and modify it freely.

## 🤝 Contact
For support or inquiries, reach out via:
- GitHub: [Al-Scripting](https://github.com/Al-Scripting)

---
