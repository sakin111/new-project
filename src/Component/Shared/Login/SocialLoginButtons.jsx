



const SocialLoginButtons = ({ handleGoogleSignIn }) => (
    <div className="social-login-buttons">
        <button onClick={handleGoogleSignIn} className="google-button">
            Sign In with Google
        </button>
        {/* Add other social buttons here */}
    </div>
);

export default SocialLoginButtons;
