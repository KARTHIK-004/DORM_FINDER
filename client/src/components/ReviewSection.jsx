import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Rating = ({ value, onChange, editable = false, size = "default" }) => {
  const stars = [1, 2, 3, 4, 5];

  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-5 h-5",
    large: "w-6 h-6",
  };

  return (
    <div className="flex items-center">
      {stars.map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= value ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          } ${
            editable
              ? "cursor-pointer transition-colors hover:text-yellow-400"
              : ""
          }`}
          onClick={() => editable && onChange(star)}
        />
      ))}
    </div>
  );
};

const Review = ({
  id,
  author,
  content,
  createdAt,
  avatar,
  rating,
  userId,
  onDelete,
  currentUserId,
}) => (
  <Card className="mb-6">
    <CardContent className="pt-6">
      <div className="flex items-start space-x-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={avatar} alt={author} />
          <AvatarFallback>{author[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-lg">{author}</h4>
              <div className="flex items-center space-x-2">
                <Rating value={rating} size="small" />
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
            {userId === currentUserId && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your review.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
          <p className="text-sm text-gray-600">{content}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function ReviewSection({
  reviews: initialReviews,
  currentUserId,
}) {
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.trim() && newRating > 0) {
      const review = {
        id: Date.now(),
        author: "Current User", // Replace with actual user name
        avatar: "/placeholder.svg?height=40&width=40", // Replace with actual user avatar
        content: newReview,
        rating: newRating,
        createdAt: new Date().toISOString(),
        userId: currentUserId,
      };
      setReviews([review, ...reviews]);
      setNewReview("");
      setNewRating(0);
    }
  };

  const handleDeleteReview = (reviewId) => {
    setReviews(reviews.filter((review) => review.id !== reviewId));
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-2xl">Guest Reviews</CardTitle>
        <CardDescription className="flex items-center space-x-2">
          <span className="text-lg font-semibold">{averageRating}</span>
          <Rating value={parseFloat(averageRating)} size="small" />
          <span className="text-sm text-muted-foreground">
            ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmitReview} className="mb-8 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
          <div className="mb-4 flex items-center space-x-2">
            <span>Your Rating:</span>
            <Rating
              value={newRating}
              onChange={setNewRating}
              editable
              size="large"
            />
          </div>
          <Textarea
            placeholder="Share your experience..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="mb-4"
            rows={4}
          />
          <Button
            type="submit"
            disabled={newRating === 0 || newReview.trim() === ""}
          >
            Post Review
          </Button>
        </form>
        <div className="space-y-6">
          {reviews.map((review) => (
            <Review
              key={review.id}
              {...review}
              currentUserId={currentUserId}
              onDelete={handleDeleteReview}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
