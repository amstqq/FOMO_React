import express from "express";
import mongoose from "mongoose";
import assert from "assert";

mongoose.connect(process.env.mongodbUri, { useNewUrlParser: true }, err => {
  // If err is not equal to null, we exit the program with error
  assert.equal(null, err);
});

const router = express.Router();

import Test from "./models/Test";
import Dev from "./models/Dev";

router.get("/search/:pageNo", (req, res) => {
  if (req.query.search) {
    var pageNo = parseInt(req.params.pageNo);
    var query = {};
    var response;

    if (pageNo < 0 || pageNo === 0) {
      response = {
        error: true,
        message: "invalid page number, should start with 1"
      };
      return res.json(response);
    }
    query.skip = 1000 * (pageNo - 1);
    query.limit = 1000;
    Dev.find(
      {
        $or: [
          { title: { $regex: req.query.search, $options: "i" } },
          { time: { $regex: req.query.search, $options: "i" } },
          { location: { $regex: req.query.search, $options: "i" } },
          { descript: { $regex: req.query.search, $options: "i" } }
        ]
      },
      {},
      query,
      (err, data) => {
        if (err) {
          response = { error: true, message: "Error fetching data" };
        } else {
          response = { error: false, message: data };
        }
        res.json(response);
      }
    );
  } else {
    response = { error: false, message: "No param input" };
    return res.json(response);
  }
});

router.get("/test", (req, res) => {
  Test.find({}, (err, tests) => {
    if (err) throw err;
    res.send(tests);
  });
});

router.get("/test/:pageNo", (req, res) => {
  var pageNo = parseInt(req.params.pageNo);
  var query = {};
  var response;
  if (pageNo < 0 || pageNo === 0) {
    response = {
      error: true,
      message: "invalid page number, should start with 1"
    };
    return res.json(response);
  }
  query.skip = 3 * (pageNo - 1);
  query.limit = 3;
  // Find some documents
  Test.find({}, {}, query, function(err, data) {
    // Mongo command to fetch all data from collection.
    if (err) {
      response = { error: true, message: "Error fetching data" };
    } else {
      response = { error: false, message: data };
    }
    res.json(response);
  });
});

router.get("/dev/:pageNo", (req, res) => {
  var pageNo = parseInt(req.params.pageNo);
  var query = {};
  var response;
  if (pageNo < 0 || pageNo === 0) {
    response = {
      error: true,
      message: "invalid page number, should start with 1"
    };
    return res.json(response);
  }
  query.skip = 1000 * (pageNo - 1);
  query.limit = 1000;
  // Find some documents
  Dev.find({}, {}, query, function(err, data) {
    // Mongo command to fetch all data from collection.
    if (err) {
      response = { error: true, message: "Error fetching data" };
    } else {
      response = { error: false, message: data };
    }
    res.json(response);
  });
});

export default router;
