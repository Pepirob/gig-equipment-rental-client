import * as icons from "react-bootstrap-icons";

function Icon({ iconName, ...props }) {
  const BootstrapIcon = icons[iconName];
  return <BootstrapIcon {...props} />;
}

export default Icon;
