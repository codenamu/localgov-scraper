var scraper = require('node-scrape');
var serveStatic = require('serve-static');
var express = require('express');
var client = require('mongodb').MongoClient;

var dbUrl = "mongodb://localhost:27017/localdebt-dev"

var app = express();

var PORT = 4000;
var PATH = "http://localhost:" + PORT + "/";

// configurations for scraping
var config = require('./config');

// existing years of debt data
var DEBT_YEAR_OLD = [2009, 2010, 2011];
var DEBT_YEAR = [2012, 2013];
var ENTERPRISE_DEBT_YEAR = [2012, 2013];

var db_provinces;
var db_municipalities;

client.connect(dbUrl, function (err, db) {
  db_municipalities = db.collection("municipalities");
  db_enterprises = db.collection("enterprises");

  db_municipalities.drop();
  db_enterprises.drop();

  // Path to static html files
  app.use(serveStatic(__dirname + '/html'));

  // serve static html files for scraping
  app.listen(PORT, function () {

    // Pass different scraping options according to year and type
    scrape(DEBT_YEAR_OLD, "debtratio", config.debtRatio_old, storeDebtToMongo);
    scrape(DEBT_YEAR, "debtratio", config.debtRatio, storeDebtToMongo);
    scrape(ENTERPRISE_DEBT_YEAR, "enterpriseratio", config.enterprise, storeEnterpriseToMongo);
  });
})



var scrape = function (years, field, scrape_options, callback) { // parameter 'years' is array.
  years.forEach(function (y) {
    scraper.scrape(PATH + y + "_" + field + ".html", scrape_options)
    .then(function (data) {
      callback(data, y);
    })
  })
};

var storeDebtToMongo = function (data, year) {
  var provinces = [];
  var municipalities = []; 
  var debtratio = data[0].collections.debtratio;

  debtratio.forEach(function (el) {
    // skip non-data
    if ( el.name == null || el.name == '') return;

    // Provinces
    if (el.name.slice(-1) == "계") {
      el.name = el.name.slice(0, -1);
      el.year = year;
      el.ratio = el.ratio.slice(0, -1);
      el.code = config.provincesCode[el.name];
      el.cat = 'province';
      provinces.push(el);

    // Municipalities
    } else {

      el.code = config.provincesCode[el.name.slice(0, 2)];
      el.year = year;
      el.ratio = el.ratio.slice(0, -1);
      el.cat = 'municipal';
      municipalities.push(el);
    }
  });

  db_municipalities.insert(provinces, function (err, result) {
    console.log("=====");
    console.log(year + "년도 자치단체 데이터 저장");
    db_municipalities.insert(municipalities, function (err, result) {
      console.log("=====");
      console.log(year + "년도 시/군/구 데이터 저장");
    });
  });
};

var storeEnterpriseToMongo = function (data, year) {
  var provinces = [];
  var municipalities = [];
  var enterprise = data[0].collections.enterprise;

  enterprise.forEach(function (el) {
    // skip non-data
    if ( el.name == null || el.name == '') return;

    // Provinces
    if (el.name.slice(-1) == "계") {
      el.name = el.name.slice(0, -1);
      el.year = year;
      el.ratio = el.ratio.slice(0, -1);
      el.code = config.provincesCode[el.name];
      el.cat = "province";
      provinces.push(el);

    // Municipalities
    } else {
      el.code = config.provincesCode[el.name.slice(0, 2)];
      el.year = year;
      el.ratio = el.ratio.slice(0, -1);
      el.cat = "municipal";
      if (el.code == undefined) console.log(el.name);
      municipalities.push(el);
    }
  });

  db_enterprises.insert(provinces, function (err, result) {
    console.log("=====");
    console.log(year + "년도 자치단체 공기업 부채 데이터 저장");
    db_enterprises.insert(municipalities, function (err, result) {
      console.log("=====");
      console.log(year + "년도 시/군/구 공기업 부채 데이터 저장");
    });
  });
};