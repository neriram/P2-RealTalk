//user model declaration
'use strict';
const bcrypt = require('bcrypt')
//declare user model format
module.exports = function(sequelize, DataTypes) {
    //define user object
    const user = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: 'Invalid email address'
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1, 99], 
                    msg: 'Name must be between 1 and 99 characters'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    arg: [8, 99],
                    msg: 'Password incorrect length'
                }
            }
        }
        

    }, {
        hooks: {
            //before new record creation
            beforeCreate: function(createdUser, options) {
            //take inputed password
                if (createdUser && createdUser.password){
                //hash password 
                    let hash = bcrypt.hashSync(createdUser.password, 12);
                    createdUser.password = hash;
                    //return new password as password for new record
                }
            } 
        }
    });
    user.associate = function(models) {
        //user associations here
    }    
    //take inputed password and compare to hashed password in user table. validPassword definition to validate password at user login

    user.prototype.validPassword = function(passwordTyped) {
       return bcrypt.compareSync(passwordTyped, this.password);
    } 
    //remove password setup before any serialization of user object
    user.prototype.toJSON = function() {
        let userData = this.get();
        delete userData.password;
        return userData; 
    }
    //return user model
    return user;
};




