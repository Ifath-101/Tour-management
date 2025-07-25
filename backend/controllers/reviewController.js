import Tour from '../models/Tour.js';
import Review from '../models/Review.js';

export const createReview = async (req, res) => {
  try {
    const { reviewText, rating, username } = req.body;
    const { tourId } = req.params;

    if (!reviewText || !rating || !username) {
      return res.status(400).json({ message: "Missing fields in review" });
    }

    const newReview = new Review({
      tourId,
      username,
      reviewText,
      rating,
    });

    await newReview.save();

    // 👉 Embed review ID in Tour (if Tour has `reviews: [ObjectId]`)
    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: newReview._id },
    });

    res.status(200).json({ message: "Review submitted!" });
  } catch (err) {
    console.error("❌ Review creation error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

