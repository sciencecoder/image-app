import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const User = ({ username, fullName }) =>
  !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link
      to={`/p/${username}`}
      className="grid grid-cols-4 gap-4 mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <p>{username}</p>
      </div>
      <div className="flex items-center justify-between col-span-1">

      </div>
    </Link>
  );

export default User;

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
};
