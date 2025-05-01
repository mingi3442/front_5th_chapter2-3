import React from "react"
import { User } from "../../types"

interface UserViewProps extends React.HTMLAttributes<HTMLDivElement> {
  userProfile: User
}

export const UserView: React.FC<UserViewProps> = ({ userProfile, ...props }) => {
  return (
    <div {...props} className="space-y-4">
      <img src={userProfile?.image} alt={userProfile?.username} className="w-24 h-24 rounded-full mx-auto" />
      <h3 className="text-xl font-semibold text-center">{userProfile?.username}</h3>
      <div className="space-y-2">
        <p>
          <strong>이름:</strong> {userProfile?.firstName} {userProfile?.lastName}
        </p>
        <p>
          <strong>나이:</strong> {userProfile?.age}
        </p>
        <p>
          <strong>이메일:</strong> {userProfile?.email}
        </p>
        <p>
          <strong>전화번호:</strong> {userProfile?.phone}
        </p>
        <p>
          <strong>주소:</strong> {userProfile?.address?.address}, {userProfile?.address?.city},{" "}
          {userProfile?.address?.state}
        </p>
        <p>
          <strong>직장:</strong> {userProfile?.company?.name} - {userProfile?.company?.title}
        </p>
      </div>
    </div>
  )
}
