import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const Register = ({ history }) => {
  const [email, setEmail] = useState('');

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    // TODO useHistory hook
    if (user && user.token) history.push('/');
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // firebase will redirect the user to the below url after the email is sent successfuly
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);

    toast.success(
      `Email is sent to ${email}. Click the link to complete the registration.`
    );

    window.localStorage.setItem('emailForRegistration', email);
    setEmail('');
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        className='form-control'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Your email'
        autoFocus
      />

      <button type='submit' className='btn btn-raised mt-3'>
        Register
      </button>
    </form>
  );

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
