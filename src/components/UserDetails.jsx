function UserDetails({ user }) {
  return (
    <>
      <h1>{user.username}'s Profile</h1>
      <section>
        <img
          src={user.img}
          alt={`${user.username} profile image`}
          height={100}
        />
        <h2>{user.location}</h2>
        <h3>{user.email}</h3>
        <h3>{user.phoneNumber}</h3>
      </section>
    </>
  );
}

export default UserDetails;
