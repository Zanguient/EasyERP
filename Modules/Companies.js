var Company = function (logWriter, mongoose) {

    var CompanySchema = mongoose.Schema({
        image: { type: String, default: '' },
        isOwnCompany: { type: Boolean, default: false },
        cemail: { type: String, default: '' },
        cname: { type: String, default: 'emptyCompany' },
        caddress: {
            street1: { type: String, default: '' },
            city: { type: String, default: '' },
            state: { type: String, default: '' },
            zip: { type: String, default: '' },
            country: { type: String, default: '' }
        },
        cwebsite: { type: String, default: '' },
        contacts: { type: Array, default: [] },
        cphones: {
            phone: { type: String, default: '' },
            mobile: { type: String, default: '' },
            fax: { type: String, default: '' },
        },
        cinternalNotes: { type: String, default: '' },
        csalesPurchases: {
            isCustomer: { type: Boolean, default: false },
            isSupplier: { type: Boolean, default: false },
            salesPerson: { type: String, default: '' },
            salesTeam: { type: String, default: '' },
            active: { type: Boolean, default: true },
            reference: { type: String, default: '' },
            language: { type: String, default: 'English' },
            date: { type: Date, default: null },
            receiveMessages: { type: Number, default: 0 }
        },
        social: {
            FB: { type: String, default: '' },
            LI: { type: String, default: '' }
        },
        chistory: { type: Array, default: [] }
    }, { collection: 'Companies' });

    var company = mongoose.model('Companies', CompanySchema);

    return {
        create: function (data, res) {
            try {
                if (typeof (data) == 'undefined') {
                    logWriter.log('Company.create Incorrect Incoming Data');
                    res.send(400, { error: 'Company.create Incorrect Incoming Data' });
                    return;
                } else {
                    company.find({ cname: data.cname }, function (error, doc) {
                        if (error) {
                            logWriter.log("Company.js. create Company.find" + error);
                            res.send(500, { error: 'Company.create find error' });
                        }
                        if (doc.length > 0) {
                            if (doc[0].ulogin === data.ulogin) {
                                res.send(400, { error: 'An company with the same Name already exists' });
                            }
                        } else if (doc.length === 0) {
                            savetoBd(data);
                        }
                    });
                }
                function savetoBd(data) {
                    try {
                        _company = new company();
                        if (typeof (data.isOwnCompany) != 'undefined') {
                            _company.isOwnCompany = data.isOwnCompany;
                        }
                        if (typeof (data.cemail) != 'undefined') {
                            _company.cemail = data.cemail;
                        }
                        if (typeof (data.cname) != 'undefined') {
                            _company.cname = data.cname;
                        }
                        if (typeof (data.cinternalNotes) != 'undefined') {
                            _company.cinternalNotes = data.cinternalNotes;
                        }
                        if (typeof (data.caddress) != 'undefined') {
                            if (typeof (data.caddress.street1) != 'undefined') {
                                _company.caddress.street1 = data.caddress.street1;
                            }
                            if (typeof (data.caddress.street2) != 'undefined') {
                                _company.caddress.street2 = data.caddress.street2;
                            }
                            if (typeof (data.caddress.city) != 'undefined') {
                                _company.caddress.city = data.caddress.city;
                            }
                            if (typeof (data.caddress.state) != 'undefined') {
                                _company.caddress.state = data.caddress.state;
                            }
                            if (typeof (data.caddress.zip) != 'undefined') {
                                _company.caddress.zip = data.caddress.zip;
                            }
                            if (typeof (data.caddress.country) != 'undefined') {
                                _company.caddress.country = data.caddress.country;
                            }
                        }
                        if (typeof (data.cwebsite) != 'undefined') {
                            _company.cwebsite = data.cwebsite;
                        }
                        if (typeof (data.cphones) != 'undefined') {
                            if (typeof (data.cphones.phone) != 'undefined') {
                                _company.cphones.phone = data.cphones.phone;
                            }
                            if (typeof (data.cphones.mobile) != 'undefined') {
                                _company.cphones.mobile = data.cphones.mobile;
                            }
                            if (typeof (data.cphones.fax) != 'undefined') {
                                _company.cphones.fax = data.cphones.fax;
                            }
                        }
                        if (typeof (data.cinternalNotes) != 'undefined') {
                            _company.cinternalNotes = data.cinternalNotes;
                        }
                        if (typeof (data.csalesPurchases) != 'undefined') {
                            if (typeof (data.csalesPurchases.active) != 'undefined') {
                                _company.csalesPurchases.active = data.csalesPurchases.active;
                            }
                            if (typeof (data.csalesPurchases.language) != 'undefined') {
                                _company.csalesPurchases.language = data.csalesPurchases.language;
                            }
                            if (typeof (data.csalesPurchases.isCustomer) != 'undefined') {
                                _company.csalesPurchases.isCustomer = data.csalesPurchases.isCustomer;
                            }
                            if (typeof (data.csalesPurchases.isSupplier) != 'undefined') {
                                _company.csalesPurchases.isSupplier = data.csalesPurchases.isSupplier;
                            }
                            if (typeof (data.csalesPurchases.salesPerson) != 'undefined') {
                                _company.csalesPurchases.salesPerson = data.csalesPurchases.salesPerson;
                            }
                            if (typeof (data.csalesPurchases.salesTeam) != 'undefined') {
                                _company.csalesPurchases.salesTeam = data.csalesPurchases.salesTeam;
                            }
                            if (typeof (data.csalesPurchases.reference) != 'undefined') {
                                _company.csalesPurchases.reference = data.csalesPurchases.reference;
                            }
                            if (typeof (data.csalesPurchases.date) != 'undefined') {
                                _company.csalesPurchases.date = data.csalesPurchases.date;
                            }
                            if (typeof (data.csalesPurchases.receiveMessages) != 'undefined') {
                                _company.csalesPurchases.receiveMessages = data.csalesPurchases.receiveMessages;
                            }
                        }
                        if (typeof (data.chistory) != 'undefined') {
                            _company.chistory = data.chistory;
                        }
                        _company.save(function (err, company) {
                            if (err) {
                                console.log(err);
                                logWriter.log("Company.js create savetoBd _company.save" + err);
                                res.send(500, { error: 'Company .save BD error' });
                            } else {
                                res.send(201, { success: 'A new Company crate success' });
                            }
                        });
                    }
                    catch (error) {
                        console.log(error);
                        logWriter.log("Company.js create savetoBd" + error);
                        res.send(500, { error: 'Company .save Script error' });
                    }
                }
            }
            catch (Exception) {
                console.log(Exception);
                logWriter.log("Company.js  " + Exception);
                res.send(500, { error: 'Company .save Script error' });
            }
        },//End create

        getById: function (id, func) {
            try {
                var res = {}
                res['data'] = {};
                res['result'] = {
                    'status': '1',
                    'description': 'No user was finde with this Login'
                };

                if (uid != null) {
                    company.findById(id, function (err, _company) {
                        try {
                            console.log(_company);
                            if (err) {
                                res['result'] = {
                                    'status': '2',
                                    'description': err
                                };

                                logWriter.log("Company.js findById Company.findById " + err);
                                func(res);
                            }

                            if (_company) {
                                //res['data']['uid'] = _company._id;
                                //res['data']['utype'] = _company.utype;
                                //res['data']['ulogin'] = _company.ulogin;
                                //res['data']['uemail'] = _company.uemail;
                                //res['data']['uname'] = _company.uname;
                                //res['data']['ucompanyid'] = _company.ucompanyid;
                                //res['data']['uactive'] = _company.uactive;
                                //res['data']['ulang'] = _company.ulang;
                                //res['data']['utimezone'] = _company.utimezone;
                                res['data'] = _company;
                                res['result'] = {
                                    'status': '0',
                                    'description': 'No errors'
                                };

                                func(res);
                            }
                                //???? ????? ???????, ? ?????? ??
                            else {
                                res['result'] = {
                                    'status': '3',
                                    'description': 'Incorrect uid'
                                };
                                func(res);
                            }
                        }
                        catch (error) {
                            logWriter.log("Company.js findById Company.findById " + error);
                        }
                    }); //End find method
                    //console.log('qqqqqqqqqqqqqqqqqqqqqqqqqq');
                }
                //End Validating input data for login

            }
            catch (Exception) {
                logWriter.log("CompanyB.js  getById" + Exception);
            }
        },

        getForDd: function (data, func) {
            var res = {};
            res['result'] = {};
            res['result']['status'] = '2';
            res['result']['description'] = 'An error was find';
            res['data'] = [];
            var query = (data.isOwnCompany) ? { isOwnCompany: true } : {};
            Company.find(query, { _id: 1, cname: 1 }, function (err, companies) {
                try {
                    if (err) {
                        //func();
                        console.log(err);
                        logWriter.log("Company.js geForDd Company.find " + err);
                        res['result']['description'] = err;
                        func(res);
                    } else {
                        if (companies) {
                            console.log(companies);
                            res['result']['status'] = '0';
                            res['result']['description'] = 'returned User is success';
                            res['data'] = companies;
                            func(res);
                        }
                    }
                }
                catch (Exception) {
                    logWriter.log("Company.js geForDd Company.find " + Exception);
                }
            });
        },

        get: function (response) {
            var res = {};
            res['data'] = [];
            var query = company.find({});
            query.sort({ cname: 1 });
            query.exec(function (err, companies) {
                if (err) {
                    console.log(err);
                    logWriter.log("Company.js get Company.find " + err);
                    response.send(500, { error: "Can't find Person" });
                } else {
                    res['data'] = companies;
                    response.send(res);
                }
            });
        },

        remove: function (_id, res) {
            company.remove({ _id: _id }, function (err, companies) {
                if (err) {
                    console.log(err);
                    logWriter.log("Companies.js remove company.remove " + err);
                    res.send(500, { error: "Can't remove Company" });
                } else {
                    res.send(200, { success: 'Company removed' });
                }
            });
        },

        update: function (id, data, res) {
            try {
                delete data._id;
                company.update({ _id: id }, data, function (err, companies) {

                    if (err) {
                        console.log(err);
                        logWriter.log("Company.js update company.update " + err);
                        res.send(500, { error: "Can't update Company" });
                    } else {
                        res.send(200, { success: 'Company updated success' });
                    }
                });
            }
            catch (Exception) {
                console.log(Exception);
                logWriter.log("Companies.js update " + Exception);
                res.send(500, { error: 'Person updated error' });
            }
        },

        getForCompanies: function (func) {
            var res = {};
            res['result'] = {};
            res['result']['status'] = '2';
            res['result']['description'] = 'An error was find';
            res['data'] = [];
            company.find({ isOwnCompany: true }, { __v: 0 }, function (err, companies) {
                try {
                    if (err) {
                        //func();
                        console.log(err);
                        logWriter.log("Company.js get Company.find " + err);
                        res['result']['description'] = err;
                        func(res);
                    } else {
                        if (companies) {
                            console.log(companies);
                            res['result']['status'] = '0';
                            res['result']['description'] = 'returned User is success';
                            res['data'] = companies;
                            func(res);
                        }
                    }
                }
                catch (Exception) {
                    logWriter.log("Company.js get Company.find " + Exception);
                }
            });
        },

        getCustomersForDd: function (func) {
            var res = {};
            res['result'] = {};
            res['result']['status'] = '2';
            res['result']['description'] = 'An error was find';
            res['data'] = [];
            company.find({ 'csalesPurchases.isCustomer': true }, { _id: 1, cname: 1 }, function (err, companies) {
                try {
                    if (err) {
                        //func();
                        console.log(err);
                        logWriter.log("Company.js getCustomersForDd Company.find " + err);
                        res['result']['description'] = err;
                        func(res);
                    } else {
                        if (companies) {
                            //console.log(companies);
                            for (var i in companies) {
                                var obj = {};
                                obj.type = 'Company';
                                obj._id = companies[i]._id;
                                obj.name = companies[i].cname;
                                res['data'].push(obj);
                            }
                            res['result']['status'] = '0';
                            res['result']['description'] = 'returned CompanyCustomers is success';
                            //res['data'] = companies;
                            func(res);
                        }
                    }
                }
                catch (Exception) {
                    logWriter.log("Company.js getCustomersForDd Company.find " + Exception);
                }
            });
        },

        getAllForCustomers: function (func) {
            var res = {};
            res['result'] = {};
            res['result']['status'] = '2';
            res['result']['description'] = 'An error was find';
            res['data'] = [];
            company.find({}, {
                _id: 1,
                cname: 1,
                cemail: 1,
                caddress: 1,
                cphones: 1
            }, function (err, companies) {
                try {
                    if (err) {
                        //func();
                        console.log(err);
                        logWriter.log("Company.js getAllCustomers Company.find " + err);
                        res['result']['description'] = err;
                        func(res);
                    } else {
                        if (companies) {
                            for (var i in companies) {
                                var obj = {};
                                obj._id = companies[i]._id;
                                obj.name = companies[i].cname;
                                obj.type = 'Company';
                                obj.email = companies[i].cemail;
                                obj.address = companies[i].caddress;
                                obj.phones = companies[i].cphones;
                                obj.tags = [];
                                res['data'].push(obj);
                                console.log(obj);
                                console.log(res['data']);
                            }
                            res['result']['status'] = '0';
                            res['result']['description'] = 'returned CompanyCustomers is success';
                            //res['data'] = accounts;
                            func(res);
                        }
                    }
                }
                catch (Exception) {
                    logWriter.log("Company.js getAllCustomers Company.find " + Exception);
                }
            });
        },
        Company: Company
    };
};

module.exports = Company;