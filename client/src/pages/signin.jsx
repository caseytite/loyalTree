import SignInForm from "../components/SignInForm";

const Signin = () => {
  const user = document.cookie;

  return (
    <>
      {!user && (
        <div>
          <h1>Please Sign In!</h1>
          <SignInForm />
        </div>
      )}
      {user && <h1>logged out!</h1>}
    </>
  );
};

export default Signin;
