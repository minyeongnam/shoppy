import { type User as UserType } from "@firebase/auth";

interface UserProps {
  user: UserType;
}

export default function User({ user }: UserProps) {
  return (
    <div className="user">
      {user.photoURL ? (
        <img
          src={user.photoURL}
          className="user__profile"
          alt={`${user.displayName} 사용자 프로필`}
        />
      ) : (
        `${user.displayName?.substring(1, 1)}`
      )}
      <span className="user__name">{user.displayName}</span>
    </div>
  );
}
