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
      </section>
    </>
  );
}

export default UserDetails;
