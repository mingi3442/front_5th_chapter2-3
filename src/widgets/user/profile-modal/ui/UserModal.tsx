import { USER_QUERY_KEY } from "@/entities/user/api/user.query-key"
import { useUserStore } from "@/entities/user/store"
import { UserView } from "@/entities/user/ui"
import { userService } from "@/features/user/services"
import { Dialog, DialogContent, DialogHeader, DialogTitle, Loading } from "@/shared/ui"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { useUserProfileModalStore } from "../hooks/useUserProfileModal"

export const UserProfileModal: React.FC = () => {
  const { isModalOpen, handleToggleModal } = useUserProfileModalStore()
  const { id } = useUserStore()

  const { data: userProfile, isLoading } = useQuery({
    queryKey: USER_QUERY_KEY.profile(id),
    queryFn: () => userService.getUserProfile(id),
  })

  if (isLoading || !userProfile) return <Loading />

  return (
    <Dialog open={isModalOpen} onOpenChange={handleToggleModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        <UserView userProfile={userProfile} />
      </DialogContent>
    </Dialog>
  )
}
