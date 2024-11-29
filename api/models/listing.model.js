import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    propertyName: {
      type: String,
      required: true,
    },
    propertyType: {
      type: String,
      required: true,
      enum: ["hostel", "guesthouse", "dormitory"],
    },
    roomType: {
      type: String,
      required: true,
      enum: ["dorm", "private", "mixed", "female", "male"],
    },
    genderPolicy: {
      type: String,
      required: true,
      enum: ["mixed", "female", "male"],
    },
    pricingPeriod: {
      type: String,
      required: true,
      enum: ["monthly", "yearly"],
    },
    price: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    hostelId: {
      type: String,
      required: true,
    },
    totalBeds: {
      type: Number,
      required: true,
    },
    bedType: {
      type: String,
      required: true,
      enum: ["single", "bunk", "mixed"],
    },
    totalRooms: {
      type: Number,
      required: true,
    },
    bathroomsPerFloor: {
      type: Number,
      required: true,
    },
    floors: {
      type: Number,
      required: true,
    },
    commonAreaSize: {
      type: Number,
      required: true,
    },
    availableFrom: {
      type: Date,
      required: true,
    },
    yearEstablished: {
      type: Number,
      required: true,
    },
    amenities: {
      airConditioning: {
        type: Boolean,
        default: false,
      },
      balcony: {
        type: Boolean,
        default: false,
      },
      gym: {
        type: Boolean,
        default: false,
      },
      parking: {
        type: Boolean,
        default: false,
      },
      pool: {
        type: Boolean,
        default: false,
      },
      elevator: {
        type: Boolean,
        default: false,
      },
      furnished: {
        type: Boolean,
        default: false,
      },
      petFriendly: {
        type: Boolean,
        default: false,
      },
      washerDryer: {
        type: Boolean,
        default: false,
      },
      securitySystem: {
        type: Boolean,
        default: false,
      },
      internet: {
        type: Boolean,
        default: false,
      },
      tvCable: {
        type: Boolean,
        default: false,
      },
    },
    images: {
      type: [String],
      required: true,
      validate: [
        arrayLimit,
        "{PATH} must have at least 3 and no more than 7 items",
      ],
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    nearbyLocations: {
      type: [
        {
          name: String,
          distance: Number,
        },
      ],
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length >= 3 && val.length <= 7;
}

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
