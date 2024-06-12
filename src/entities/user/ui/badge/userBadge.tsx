import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import './styles.scss'

export const UserBadge = () => {
    return (
        <div className="user-badge">
            <div className="user-badge__name">Артём</div>
            <Avatar>
                <AvatarImage src="https://github.com/bradlc.png" alt="Аватар"/>
                <AvatarFallback>
                    ?
                </AvatarFallback>
            </Avatar>
        </div>
    )
}