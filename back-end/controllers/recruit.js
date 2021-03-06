'use strict';

const db = require(__dirname + '/../lib/mysql');

exports.update_profile = (req, res, next) => {
    const query_string ='UPDATE recruit SET username = ?, password = ?, studno = ?, surname = ?, givenname = ?, middlename = ?, suffix = ?, emailadd = ?, contactnum = ?, degreeprog = ?, adviser = ?, year = ?, gwa = ?, prefproglang = ?, essay1 = ?, essay2 = ?, sched = ? WHERE studno = ?';
    const id = req.body.studno;
    const payload = [req.body.username, 
                    req.body.password, 
                    req.body.studno, 
                    req.body.surname, 
                    req.body.givenname, 
                    req.body.middlename, 
                    req.body.suffix, 
                    req.body.emailadd, 
                    req.body.contactnum, 
                    req.body.degreeprog, 
                    req.body.adviser, 
                    req.body.year, 
                    req.body.gwa, 
                    req.body.prefproglang, 
                    req.body.essay1, 
                    req.body.essay2, 
                    req.body.sched, 
                    id];

    db.query(query_string, payload, (err, data) => {
        if(!err) {
            console.log('PROFILE SUCCESSFULLY UPDATED!');
        } else {
            console.log(err);
        }
    });
};

exports.send_announcements = (req, res, next) => {
    const query_string = 'INSERT INTO announcements SET ?';
    var datetime = new Date();
    var date = datetime.getFullYear() + "-" + datetime.getMonth() + "-" + datetime.getDay();
    var time = datetime.getHours() + ":" + datetime.getMinutes() + ":" + datetime.getSeconds();
    const payload = {
        announcement: req.body.announcements,
        dateposted: date,
        timeposted: time,
        recipient: req.body.recipient
    }
    
    db.query(query_string, payload, (err, data) => {
        if(!err) {
            console.log('ANNOUNCEMENT SUCCESSFULLY SENT!');
            res.send(payload);
        } else {
            console.log(err);
        }
    });
};