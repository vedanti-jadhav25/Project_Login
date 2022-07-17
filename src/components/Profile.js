function Profile() {
    const username = localStorage.getItem('username');
    return (
        <div>
            <h2 id="welcome">Welcome {username}!</h2>
        </div>
    )
}

export default Profile;