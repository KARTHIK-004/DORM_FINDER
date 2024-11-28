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
    res.status(200).json({
      status: "success",
      results: listings.length,
      data: {
        listings,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
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
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) {
      return res.status(404).json({
        status: "fail",
        message: "Listing not found",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
