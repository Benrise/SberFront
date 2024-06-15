import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { UserModel } from "@/entities/user";
import './styles.scss'

interface UserBadgeProps {
    user: UserModel.UserDto
}

export const UserBadge: React.FunctionComponent<UserBadgeProps> = ({ user }) => {

    return (
        <div className="user-badge">
            <div className="user-badge__name">{user.username}</div>
            <Avatar>
                <AvatarImage className="max-w-[32px] max-h-[32px]" src="images/png/user.png" alt="Аватар"/>
                <AvatarFallback>
                    ?
                </AvatarFallback>
            </Avatar>
        </div>
    )
}