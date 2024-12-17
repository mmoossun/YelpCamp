# YelpCamp Project

This is the **YelpCamp** application, a full-stack web app for campgrounds where users can add, view, and review campgrounds.

---

## **Live Demo**
You can view the live project here:  
[Live Deployment Link](https://yelpcamp-cjsc.onrender.com)

---

## **Project Setup**

This project is deployed using **Render**. The `Practice` folder is configured as the root directory.

### **Steps to Deploy on Render**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mmoossun/YelpCamp.git
   cd YelpCamp
   ```

2. **Set the root directory on Render**:
   - Go to the **Render Dashboard**.
   - Under the **Settings** tab, set the **Root Directory** to:
     ```
     Practice
     ```

3. **Configure Build and Start Commands**:  
   In the Render dashboard:
   - **Build Command**:
     ```bash
     cd Practice && npm install
     ```
   - **Start Command**:
     ```bash
     cd Practice && npm start
     ```

4. **Environment Variables**:  
   Add the required environment variables in the Render dashboard under the **Environment** section:
   ```plaintext
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_KEY=your_cloudinary_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   MAPTILER_API_KEY=your_maptiler_api_key
   ```

5. **Deploy the project**:  
   - Connect your GitHub repository to Render.  
   - Click **Deploy** and ensure all dependencies are installed successfully.

---

## **Technologies Used**
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Frontend**: EJS Templates, Bootstrap
- **Deployment**: Render
- **APIs**:
   - Cloudinary (for image uploads)
   - MapTiler (for maps and geolocation)

---

## **Local Development Setup**

To run this project locally:

1. Install dependencies:
   ```bash
   cd Practice
   npm install
   ```

2. Set up environment variables:
   - Create a `.env` file in the `Practice` folder and add the following:
     ```plaintext
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_KEY=your_cloudinary_key
     CLOUDINARY_SECRET=your_cloudinary_secret
     MAPTILER_API_KEY=your_maptiler_api_key
     ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

---

## **Folder Structure**

Below is the folder structure for this project:

```plaintext
YelpCamp/
├── Practice/          # Root directory for Render deployment
│   ├── app.js         # Main application file
│   ├── package.json   # Node.js dependencies and scripts
│   ├── public/        # Static files
│   ├── views/         # EJS templates
│   └── .env           # Environment variables
├── README.md          # Project documentation
└── Other files...
```

---

## **Known Issues**
- Ensure MongoDB Atlas IP Whitelist is properly configured to allow Render's IPs.
- If deployment fails, check the Render **Logs** for detailed error messages.

---

## **Contributing**
Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Commit your changes and push:
   ```bash
   git commit -m "Add new feature"
   git push origin feature-branch
   ```
4. Open a Pull Request.

---

## **License**

---

## **Contact**
If you have questions or need support, please reach out:  
- **GitHub**: [@mmoossun](https://github.com/mmoossun)

