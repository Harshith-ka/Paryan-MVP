import { Star, ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Review, User } from "@shared/schema";

interface ReviewCardProps {
  review: Review;
  user?: User;
}

export default function ReviewCard({ review, user }: ReviewCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-amber fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-start space-x-6">
        <Avatar className="w-16 h-16">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-charcoal">
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-gray-600">
                Verified guest • {review.isVerified ? 'Verified Stay' : 'Guest'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex">{renderStars(review.rating)}</div>
              <span className="text-lg font-semibold">{review.rating}.0</span>
            </div>
          </div>
          
          {review.title && (
            <h4 className="text-lg font-medium mb-3">{review.title}</h4>
          )}
          
          <p className="text-gray-700 mb-4 leading-relaxed">{review.content}</p>
          
          {review.images && review.images.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-4">
              {review.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Review image ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-terra">
                <ThumbsUp className="w-4 h-4 mr-1" />
                Helpful (23)
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-terra">
                <MessageCircle className="w-4 h-4 mr-1" />
                Reply
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-terra">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
            <span className="text-sm text-gray-500">
              {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
