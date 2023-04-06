import { useRouter } from "next/router";
import Link from "next/link";
import PropTypes from "prop-types";

export { NavLink };

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

NavLink.defaultProps = {
  exact: false,
};

function NavLink({ href, exact, children, ...props }) {
  const { pathname, asPath } = useRouter();
  const isActive = exact ? pathname === href : asPath.startsWith(href);

  if (isActive) {
    props.className += " active";
  }

  return (<a href={href} target="_self" {...props}>
    {children}
  </a>
  );
}
