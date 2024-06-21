import { observer } from "mobx-react-lite";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { UserModel } from "@/entities/user";
import './styles.scss';
import { Skeleton } from "@/shared/ui/skeleton";
import { motion } from "framer-motion";

interface UserBadgeProps {
    user: UserModel.UserDto;
}

export const UserBadge: React.FunctionComponent<UserBadgeProps> = observer(({ user }) => {
    return (
        <div className="user-badge">
                    {(user.username) ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="user-badge__name">{user.username}
                             </motion.div>
                        ) : (
                            <Skeleton className='w-32 h-6 bg-muted'/>
                    )}
            <Avatar>
                <AvatarImage className="max-w-[24px] max-h-[24px]" src="images/png/user.png" alt="Аватар"/>
                <AvatarFallback>
                    ?
                </AvatarFallback>
            </Avatar>
        </div>
    );
});
