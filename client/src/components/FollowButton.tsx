import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, UserMinus } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface FollowButtonProps {
  currentUserId: string;
  targetUserId: string;
  targetUserName: string;
}

export function FollowButton({ currentUserId, targetUserId, targetUserName }: FollowButtonProps) {
  const queryClient = useQueryClient();

  // Check if currently following
  const { data: followStatus, isLoading: isCheckingFollow } = useQuery({
    queryKey: ['/api/follows', currentUserId, targetUserId],
    queryFn: () => fetch(`/api/follows/${currentUserId}/${targetUserId}`).then(res => res.json()),
    enabled: currentUserId !== targetUserId,
  });

  // Follow mutation
  const followMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/follows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          followerId: currentUserId,
          followingId: targetUserId
        })
      });
      if (!response.ok) throw new Error('Failed to follow user');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/follows'] });
      queryClient.invalidateQueries({ queryKey: ['/api/users'] });
    }
  });

  // Unfollow mutation
  const unfollowMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/follows/${currentUserId}/${targetUserId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to unfollow user');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/follows'] });
      queryClient.invalidateQueries({ queryKey: ['/api/users'] });
    }
  });

  if (currentUserId === targetUserId) {
    return null; // Don't show follow button for own profile
  }

  if (isCheckingFollow) {
    return <Button disabled>Loading...</Button>;
  }

  const isFollowing = followStatus?.isFollowing;
  const isLoading = followMutation.isPending || unfollowMutation.isPending;

  const handleToggleFollow = () => {
    if (isFollowing) {
      unfollowMutation.mutate();
    } else {
      followMutation.mutate();
    }
  };

  return (
    <Button
      onClick={handleToggleFollow}
      disabled={isLoading}
      variant={isFollowing ? "outline" : "default"}
      className="gap-2"
      data-testid={isFollowing ? "button-unfollow" : "button-follow"}
    >
      {isFollowing ? (
        <>
          <UserMinus className="h-4 w-4" />
          Unfollow
        </>
      ) : (
        <>
          <UserPlus className="h-4 w-4" />
          Follow {targetUserName}
        </>
      )}
    </Button>
  );
}