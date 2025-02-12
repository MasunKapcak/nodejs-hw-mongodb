/* src/db klasöründe Contact adında bir iletişim modeli oluşturun. */
//createdAt ve updatedAt alanlarının otomatik olarak oluşturulması için model oluştururken 
// timestamps: true parametresini kullanabilirsiniz. 
// Bu, nesneye iki alan ekler: createdAt (oluşturulma tarihi) ve updatedAt (güncellenme tarihi); bunları manuel olarak eklemenize gerek yoktur.


import { Schema, model} from 'mongoose';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      enum: ['male', 'female', 'other'],
    },
    isFavourite: {
        type: Boolean,
        required: true,
        enum: ['male', 'female', 'other'],
      },
    contactType: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other'],
    },

  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsCollection = model('contacts', contactsSchema);