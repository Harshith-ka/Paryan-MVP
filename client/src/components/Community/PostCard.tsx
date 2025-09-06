import { Heart, MessageCircle, Share, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommunityPost } from "../../types";

interface PostCardProps {
  post: CommunityPost;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

export default function PostCard({ post, onLike, onComment, onShare }: PostCardProps) {
  const timeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  return (
    <Card className="border-amber/20">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h4 className="font-semibold text-charcoal">{post.author.name}</h4>
              {post.author.badge && (
                <Badge variant="secondary" className="text-xs">{post.author.badge}</Badge>
              )}
              <span className="text-sm text-gray-500">• {timeAgo(post.timestamp)}</span>
            </div>
            
            {post.location && (
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{post.location}</span>
              </div>
            )}
            
            <h3 className="text-lg font-serif font-medium mb-2">{post.title}</h3>
            <p className="text-gray-700 mb-4">{post.content}</p>
            
            {post.image && (
              <img
                src={post.image}
                alt="Post image"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-6">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-terracotta"
                  onClick={() => onLike?.(post.id)}
                >
                  <Heart className="w-4 h-4 mr-1" />
                  {post.likes}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-terracotta"
                  onClick={() => onComment?.(post.id)}
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {post.comments}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-terracotta"
                  onClick={() => onShare?.(post.id)}
                >
                  <Share className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
              <div className="flex space-x-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
