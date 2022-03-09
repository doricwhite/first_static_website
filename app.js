"use strict";

const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");

// Add Port information for Heroku
const port = process.env.PORT || 3000;

/* INCLUDING EJS (Embedded JavaScript) AND VIEW */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

/* SERVING STATICS FILES (IMAGES AND CSS) */
app.use("/public", express.static(path.join(__dirname, "public")));

/* HOME PAGE */
app.get("/display/index-v2", (req, res, next) => {
  res.render("display/index-v2");
});

/* PRODUCTS */
app.get("/display/products", (req, res) => {
  res.render("display/products");
});

/* FAQS */
app.get("/display/faqs", (req, res) => {
  res.render("display/faqs");
});

/* CONTACT US */
app.get("/display/contact-us", (req, res) => {
  res.render("display/contact-us");
});

/* PROCESS */
app.get("/display/process", (req, res) => {
  res.render("display/process");
});

/* ABOUT US */
app.get("/display/about-us", (req, res) => {
  res.render("display/about-us");
});

/* EXISTING CUSTOMERS */
app.get("/display/existing-customers", (req, res) => {
  res.render("display/existing-customers");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

/* ERROR PAGE */
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) {
    err.message = "Something went wrong!";
  }
  res.status(statusCode).render("display/error");
});

/*LISTEN FOR LOCALHOST PORT */
app.listen((port) => {
  console.log("Localhost port open successfully");
});
