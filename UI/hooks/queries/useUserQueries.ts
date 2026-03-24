import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, User } from '@/utils/api';
import { useUser } from '@/contexts/user-context';

export function useProfile() {
  const { token, authError } = useUser();
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      return await api.user.getProfile();
    },
    enabled: !!token && !authError,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { updateUser } = useUser();
  
  return useMutation({
    mutationFn: async (updates: Partial<User>) => {
      return await api.user.updateProfile(updates);
    },
    onSuccess: (data) => {
      // Update global context
      updateUser(data);
      // Invalidate profile query to ensure freshness
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();
  const { updateUser } = useUser();
  
  return useMutation({
    mutationFn: async (role: 'commuter' | 'driver') => {
      return await api.user.updateRole(role);
    },
    onSuccess: (data) => {
      updateUser(data);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}
