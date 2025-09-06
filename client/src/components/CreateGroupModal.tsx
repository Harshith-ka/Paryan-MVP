import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Users } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertGroupChatSchema } from "@shared/schema";
import type { InsertGroupChat } from "@shared/schema";

interface CreateGroupModalProps {
  currentUserId: string;
  onGroupCreated?: (groupId: string) => void;
}

export function CreateGroupModal({ currentUserId, onGroupCreated }: CreateGroupModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue
  } = useForm<InsertGroupChat>({
    resolver: zodResolver(insertGroupChatSchema),
    defaultValues: {
      createdBy: currentUserId,
      isPrivate: false
    }
  });

  const createGroupMutation = useMutation({
    mutationFn: async (data: InsertGroupChat) => {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create group');
      return response.json();
    },
    onSuccess: (newGroup: any) => {
      queryClient.invalidateQueries({ queryKey: ['/api/users', currentUserId, 'groups'] });
      reset();
      setIsOpen(false);
      onGroupCreated?.(newGroup.id);
    }
  });

  const onSubmit = (data: InsertGroupChat) => {
    createGroupMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2" data-testid="button-create-group">
          <Plus className="h-4 w-4" />
          Create Group
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-terra" />
            Create New Group
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Group Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter group name"
              data-testid="input-group-name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="What's this group about?"
              rows={3}
              data-testid="input-group-description"
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="private" className="text-sm font-medium">
              Private Group
            </Label>
            <Switch
              id="private"
              checked={watch("isPrivate")}
              onCheckedChange={(checked) => setValue("isPrivate", checked)}
              data-testid="switch-private-group"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Private groups can only be joined by invitation
          </p>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createGroupMutation.isPending}
              className="flex-1"
              data-testid="button-submit-group"
            >
              {createGroupMutation.isPending ? "Creating..." : "Create Group"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}