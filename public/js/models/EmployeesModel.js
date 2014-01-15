﻿define(['Validation'],function (Validation) {
    var EmployeeModel = Backbone.Model.extend({
        idAttribute: "_id",
        initialize: function(){
            this.on('invalid', function(model, errors){
                if(errors.length > 0){
                    if(errors.length > 0){
                        var msg = errors.join('\n');
                        alert(msg);
                    }
                }
            });
        },
        
        validate: function(attrs){
            var errors = [];

            Validation.checkNameField(errors, true, attrs.name.first, "First name");
            Validation.checkNameField(errors, true, attrs.name.last, "Last name");
            Validation.checkPhoneField(errors, false, attrs.workPhones.phone, "Phone");
            Validation.checkPhoneField(errors, false, attrs.workPhones.mobile, "Mobile");
            Validation.checkCountryCityStateField(errors, false, attrs.workAddress.country, "Country");
            Validation.checkCountryCityStateField(errors, false, attrs.workAddress.state, "State");
            Validation.checkCountryCityStateField(errors, false, attrs.workAddress.city, "City");
            Validation.checkZipField(errors, false, attrs.workAddress.zip, "Zip");
            Validation.checkStreetField(errors, false, attrs.workAddress.street, "Street");
            Validation.checkCountryCityStateField(errors, false, attrs.homeAddress.country, "Country");
            Validation.checkCountryCityStateField(errors, false, attrs.homeAddress.state, "State");
            Validation.checkZipField(errors, false, attrs.homeAddress.zip, "Zip");
            Validation.checkStreetField(errors, false, attrs.homeAddress.street, "Street");
            Validation.checkNameField(errors, true, attrs.department._id || attrs.department, "Department");

            if(errors.length > 0)
                return errors;
        },
        defaults: {
            isEmployee: true,
            imageSrc: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAAAAACPAi4CAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAABAAAAAQADq8/hgAAAEaElEQVRYw82X6XLbNhCA+f4PVomk5MRyHDtp63oEgDcl3vfRBQhQIEVKSvsnO+OxRBEfFnthV+n/pyi/NaCryzzL8rJu/wOgzQPXJBgjhDExnXPW/Aqgy30DI0yIwYQQ4Bhe2j0I6BIbI1jL9meC2TdkRu0jgMxCGN5H2HT8IIzjKPAdE9NngEjuAhqfv3rOpe3aIrDAFoB1qtuA3ADlMXKuz9vlLqZokt4CxPAOQXa2bPDCRVSJYB0QIDA4ibp+TVKDbuCvAeh6YpX9DWkcUGJCkAARXW9UfXeL0PmUcF4CZBA4cALv5nqQM+yD4mtATQMOGMi9RzghiKriCuBiAzsB1e8uwUUGtroZIAEsqfqHCI2JjdGZHNDSZzHYb0boQK4JOTVXNQFEoJXDPskEvrYTrJHgIwOdZEBrggXzfkbo+sY7Hp0Fx9bUYbUEAAtgV/waHAcCnOew3arbLy5lVXGSXIrKGQkrKKMLcnHsPjEGAla1PYi+/YCV37e7DRp1qUDjwREK1wjbo56hezRoPLxt9lzUg+m96Hvtz3BMcU9syQAxKBSJ/c2Nqv0Em5C/97q+BdGoEuoORN98CkAqzsAAPh690vdv2tOOEcx/dodP0zq+qjpoQQF7/Vno2UA0OgLQQbUZI6t/1+BlRgAlyywvqtNXja0HFQ7jGVwoUA0HUBNcMvRdpW8PpzDPYRAERfmNE/TDuE8Ajis4oJAiUwB2+g+am3YEEmT5kz4HgOdRygHUIPEMsFf/YvXJYoSKbPczQI4HwysSbKKBdk4dLAhJsptrUHK1lSERUDYD6E9pGLsjoXzRZgAIJVaYBCCfA57zMBoJYfV9CXDigHhRgww2Hgngh4UjnCUbJAs2CEdCkl25kbou5ABh0KkXPupA6IB8fOUF4TpFOs5Eg50eFSOBfOz0GYCWoJwDoJzwcjQBfM2rMAjD0CEsL/Qp4ISG/FHkuJ4A9toXv66KomosMMNAuAA6GxOWPwqP64sb3kTm7HX1Fbsued9BXjACZKNIphLz/FF4WIps6vqff+jaIFAONiBbTf1hDITti5RLg+cYoDOxqJFwxb0dXmT5Bn/Pn8wOh9dQnMASK4aaSGuk+G24DObCbm5XzkXs9RdASTuytUZO6Czdm2BCA2cSgNbIWedxk0AV4FVYEYFJpLK4SuA3DrsceQEQl6svXy33CKfxIrwAanqZBA8R4AAQWeUMwJ6CZ7t7BIh6utfos0uLwxqP7BECMaTUuQCoawhO+9sSUWtjs1kA9I1Fm8DoNiCl64nUCsp9Ym1SgncjoLoz7YTl9dNOtbGRYSAjWbMDNPKw3py0otNeufVYN2wvzha5g6iGzlTDebsfEdbtW9EsLOvYZs06Dmbsq4GjcoeBgThBWtRN2zZ1mYUuGZ7axfz9hZEns+mMQ+ckzIYm/gn+WQvWWRq6uoxuSNi4RWWAYGfRuCtjXx25Bh25MGaTFzaccCVX1wfPtkiCk+e6nh/ExXps/N6z80PyL8wPTYgPwzDiAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDExLTAxLTE5VDAzOjU5OjAwKzAxOjAwaFry6QAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMC0xMi0yMVQxNDozMDo0NCswMTowMGxOe/8AAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC",
            name: {
                first: '',
                last: ''
            },
            gender: '',
            martial: '',
            tags: [],
            workAddress: {
                street: '',
                city: '',
                state: '',
                zip: '',
                country: ''
            },
            workEmail: '',
            personalEmail: '',
            workPhones: {
                mobile: '',
                phone: ''
            },
            skype: '',
            officeLocation: '',
            relatedUser: null,
            visibility: 'Public',
            department: '',
            jobPosition: '',

            nationality: '',
            identNo: '',
            passportNo: '',
            bankAccountNo: '',
            otherId: '',
            homeAddress: {
                street: '',
                city: '',
                state: '',
                zip: '',
                country: ''
            },
            dateBirth: null,
            active: true
        },

        urlRoot: function () {
            return "/Employees";
        }
    });

    return EmployeeModel;
});