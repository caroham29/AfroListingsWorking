var fs = require("fs");
var XLSX = require("xlsx");
var nodemailer = require("nodemailer");
const express = require("express");
const next = require("next");
var https = require("https");
const cors = require("cors");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
var pg = require("pg");
pg.defaults.ssl = true;
var connectionString =
    "postgres://gmarhpkkaewwzl:eecd6dd38b7a47ca042db24d3e57fc8a04f614f0747808e6f77273bf7cc40674@ec2-52-204-195-41.compute-1.amazonaws.com:5432/ddt2lq49iioqla";
const client = new pg.Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false },
});

const businessArr = [
    {
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/tutor.jpeg",
        user: "Nancy Cooks",
        type: "business",
        city: "Oakland",
        zip: 94501,
        subtype: "education",
        title: "Private tutoring with Nancy",
        desc: "Give a child a headstart with tutoring. I'm a teacher with 5 years teaching experience",
    },
    {
        userid: 1,
        city: "Oakland",
        zip: 94501,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/creditOption.jpeg",
        user: "Credit Master Sean",
        type: "business",
        subtype: "finance",
        title: "Have an 800 Credit Score Yet",
        desc: "We can get you there! 5 star credit repair at Valley Wide Credit Repair",
    },
    {
        city: "Fresno",
        zip: 93722,
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/stylist.jpg",
        user: "Kesha Kay",
        type: "business",
        subtype: "stylist",
        title: "Is Your Hair Ready For The Big Event",
        desc: "Licensed stylist specializing in braids, and dreadlocks",
    },
    {
        city: "Fresno",
        zip: 93722,
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/business_4.jpg",
        user: "Don McStashinbuggle",
        type: "business",
        subtype: "finance",
        title: "Guaranteed Issue Whole Life Policy Up To 1 Million",
        desc: "Licensed insurance agent to secure generational wealth for your family",
    },
    {
        city: "Fresno",
        zip: 93722,
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/rest_1.jpg",
        user: "Honey Tea LLC",
        type: "food",
        subtype: "restaurant",
        title: "Have You Heard of Just Add Honey Tea Company",
        desc: "Blended tea's for everyone! Sweetened and served just for you",
    },
    {
        city: "Fresno",
        zip: 93722,
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/rest_2.jpg",
        user: "Hammin's All Star BBQ",
        type: "food",
        subtype: "restaurant",
        title: "Lip Smackin Hammin's BBQ Will Leave You Speachless",
        desc: "Award winning BBQ for the entire family. Pull up and see what everyone's talking about",
    },
    {
        city: "Oakland",
        zip: 94501,
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/rest_3.jpg",
        user: "Wendy's Kitchen",
        type: "food",
        subtype: "restaurant",
        title: "Wendy's Southern Kitchen Is The Best in the Midwest",
        desc: "Traditional Souther Cousine with a midwest twist",
    },
    {
        city: "Oakland",
        zip: 94501,
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/rest_4.jpg",
        user: "Carl Kitchens",
        type: "food",
        subtype: "food truck",
        title: "Have You Tasted What The Hype is About At Cartel's Kitchen",
        desc: "Our signature fried wings and thigs are quickly becoming legendary",
    },
    {
        city: "Oakland",
        zip: 94501,
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/housing_1.jpg",
        user: "Paramount Properties LLC",
        type: "housing",
        subtype: "rent",
        title: "Modern 1 Bedroom Studio in Heart of Downtown",
        desc: "In the heart of the much desired downtown district",
    },
    {
        city: "Oakland",
        zip: 94501,
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/housing_2.jpg",
        user: "Yannique Golden",
        type: "housing",
        subtype: "rent",
        title: "3 Bedroom 2 Bath Home For Rent in Central Fresno",
        desc: "Spacious home recently remodeled in Central Unified school district",
    },
    {
        city: "Fresno",
        zip: 93722,
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/housing_3.jpg",
        user: "AJ For The Win",
        type: "housing",
        subtype: "rent",
        title: "2 Bedroom 1.5 Bath Apartment For Rent in Anticoch",
        desc: "Two story apartment with spacious patio and attached garage",
    },
    {
        city: "Fresno",
        zip: 93722,
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/housing_4.jpg",
        user: "New Beginnings Properties LLC",
        type: "housing",
        subtype: "sale",
        title: "4 Bedroom 2 Bath Home for Sale in Clovis",
        desc: "Over 2500 square feet of modern living with a hint of country charm",
    },
    {
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/politics_1.jpg",
        user: "Johnny the Activist",
        type: "politics",
        subtype: "standard",
        city: "Oakland",
        zip: 94501,
        title: "Gun Rights Activist Says Black Guns Matter",
        desc: "Private tutoring with Nancy",
    },
    {
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/politics_2.jpg",
        user: "Highlife Movements",
        type: "politics",
        city: "Oakland",
        zip: 94501,
        subtype: "standard",
        title: "Why Reparations 2023 May Be Reality For Californian's",
        desc: "5 star credit repair at Valley Wide Credit Repair",
    },
    {
        city: "Fresno",
        zip: 93722,
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/politics_3.jpg",
        user: "Tremale Jacobs",
        type: "politics",
        subtype: "standard",
        title: "Why Mattlock Belives He Has The Winning Ticket",
        desc: "We belive in results and let our actions do the talking",
    },
    {
        city: "Fresno",
        zip: 93722,
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/politics_4.jpg",
        user: "Black Insider",
        type: "politics",
        subtype: "standard",
        title: "Why These Two California Politians Are Causing a Stir This Election Season",
        desc: "Looking for solutions in 2023? Look no further than these two local activist running for office",
    },
];

//     userid INTEGER REFERENCES users(id),\
//     type varchar(50),\
//     title varchar(250),\
//     description varchar(500),\
//     zip varchar(100),\
//     likes INTEGER,\
//     shares INTEGER,\
//     bookmarks INTEGER,\
//     city varchar(150),\
//     creationdate TIMESTAMP)",

client.connect(function (err) {
    if (err) console.log(err, " ...Error connecting to PSQL");
    // Create Users Table
    // client.query(
    //     "CREATE TABLE users(id SERIAL PRIMARY KEY,\
    //     email varchar(100),\
    //     fn varchar(50),\
    //     ln varchar(50),\
    //     type varchar(50),\
    //     username varchar(100),\
    //     pw varchar(150),\
    //     creationdate varchar(100))",
    //     (err, resp) => {
    //         if (err) {
    //             console.log(err, " Error ");
    //         } else {
    //             console.log(resp, " SUCCESS ");
    //         }
    //     }
    // );

    // Listings table create
    // client.query(
    //     "CREATE TABLE listing(id SERIAL PRIMARY KEY,\
    //     userid INTEGER REFERENCES users(id),\
    //     type varchar(50),\
    //     title varchar(250),\
    //     description varchar(500),\
    //     zip varchar(100),\
    //     likes INTEGER,\
    //     shares INTEGER,\
    //     bookmarks INTEGER,\
    //     city varchar(150),\
    //     creationdate TIMESTAMP)",
    //     (err, resp) => {
    //         if (err) {
    //             console.log(err, " Error ");
    //         } else {
    //             console.log(resp, " SUCCESS ");
    //         }
    //     }
    // );

    //Media table
    // client.query(
    //     "CREATE TABLE media(id SERIAL PRIMARY KEY,\
    //     type varchar(20),\
    //     format varchar(20),\
    //     postid INTEGER REFERENCES listing(id),\
    //     url varchar(250))",
    //     (err, resp) => {
    //         if (err) {
    //             console.log(err, " Error ");
    //         } else {
    //             console.log(resp, " SUCCESS ");
    //         }
    //     }
    // );

    // city: "Fresno",
    // zip: 93722,
    // userid: 1,
    // src: "https://newbucketpj.s3.us-west-1.amazonaws.com/politics_4.jpg",
    // user: "Black Insider",
    // type: "politics",
    // subtype: "standard",
    // title: "Why These Two California Politians Are Causing a Stir This Election Season",
    // desc: "Looking for solutions in 2023? Look no further than these two local activist running for office",

    // const createValues = async () => {
    //     for await (const {
    //         city,
    //         zip,
    //         userid,
    //         src,
    //         user,
    //         type,
    //         subtype,
    //         title,
    //         desc,
    //     } of businessArr) {
    //         const data = await client.query(
    //             "INSERT INTO listing(userid, type, title, description, zip, likes, shares, bookmarks, city, creationdate) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id",
    //             [userid, type, title, desc, zip, 0, 0, 0, city, new Date()]
    //         );
    //         console.log(data.rows[0].id);
    //         const media = await client.query(
    //             "INSERT INTO media(type, format, postid, url) VALUES($1, $2, $3, $4)",
    //             ["image", ".jpg", data.rows[0].id, src]
    //         );
    //     }
    // };

    // createValues();

    client.query("SELECT * FROM listing", (er, resp) => {
        console.log(resp.rows, " REsponse... ");
    });

    client.query("SELECT * FROM media", (er, resp) => {
        console.log(resp.rows, " REsponse... ");
    });

    // client.query(
    //     "ALTER TABLE listing ADD COLUMN subtype varchar(100)",
    //     (err, resp) => {
    //         if (err) {
    //             console.log(err, " Error ");
    //         } else {
    //             console.log(resp, " SUCCESS ");
    //         }
    //     }
    // );
});