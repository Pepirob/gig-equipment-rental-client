import NavItem from "../NavItem";
import "./NavigationAvatar.css";

function NavigationAvatar({ user }) {
  return (
    <NavItem path="/dashboard">
      <div className="nav-avatar">
        {user && (
          <img
            className="nav-avatar-pic"
            src={user.img}
            alt={`A pic of ${user.name}`}
          />
        )}
      </div>
    </NavItem>
  );
}

export default NavigationAvatar;
