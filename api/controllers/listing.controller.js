import Listing from "../models/listing.model.js";

export const createListing = async (req, res) => {
  try {
    const listingData = {
      ...req.body,
      owner: req.user.id,
    };

    const newListing = await Listing.create(listingData);

    res.status(201).json({
      status: "success",
      data: {
        listing: newListing,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    const mappedListings = listings.map((l) => ({
      id: l._id,
      name: l.propertyName,
      location: `${l.city}, ${l.state}`,
      price: l.price,
      status: "Active",
      occupancy: l.capacity,
      propertyType: l.propertyType,
      roomType: l.roomType,
      amenities: l.amenities,
    }));
    res.status(200).json(mappedListings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).select({
      _id: 1,
      propertyName: 1,
      city: 1,
      state: 1,
      price: 1,
      capacity: 1,
      propertyType: 1,
      roomType: 1,
      amenities: 1,
    });

    if (!listing) {
      console.log(`No listing found with id: ${req.params.id}`);
      return res.status(404).json({
        status: "fail",
        message: "Listing not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        listing,
      },
    });
  } catch (error) {
    console.error(`Error fetching listing with id ${req.params.id}:`, error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!listing) {
      return res.status(404).json({
        status: "fail",
        message: "No listing found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        listing,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);

    if (!listing) {
      return res.status(404).json({
        status: "fail",
        message: "No listing found with that ID",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
