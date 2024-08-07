import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const dbConnection = async () => {
  mongoose.connect('mongodb+srv://zkargi:Zeynep02.@cluster0.ti5riqt.mongodb.net/gysDB?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('MongoDB\'ye bağlantı başarılı.');
  })
  .catch((err) => {
    console.error('MongoDB\'ye bağlantı hatası:', err);
  });

// Sunucunuzun dinlediği port
const port = 3000;


};

export const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // Change sameSite from strict to none when you deploy your app
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict", //prevent CSRF attack
    maxAge: 1 * 24 * 60 * 60 * 1000, //1 day
  });
};
