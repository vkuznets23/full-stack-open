const mongoose = require('mongoose');

//define schema for contact
const contactSchema = new mongoose.Schema({
    name: { 
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'must be at least 3 characters long']
    },
    number: { 
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value) {
          return /^\d{2,3}-\d+$/.test(value) && value.length >= 8 && value.length <= 15; // Regex check and length
        },
        message: props => `${props.value} is not a valid phone number! Phone number must be at least 8 characters long and in the format +XXX-XXXXXXX or XX-XXXXXXX.`,
      },
    },
  });

// Add indexes to optimize queries
contactSchema.index({ name: 1 });
contactSchema.index({ number: 1 });

// Export the model
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;