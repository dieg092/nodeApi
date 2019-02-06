const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');
const { Schema } = mongoose;

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// checking if password is valid
userSchema.methods.validPassword = function (password)  {
	if(this.password != null) {
			 return bcrypt.compareSync(password, this.password);
	 } else {
			 return false;
	 }
};

module.exports = mongoose.model('User', userSchema);
