import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import { createOrUpdateUser } from '../../store/action-creators';

const RegisterComplete = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href // the url which was provided by firebase
      );

      if (result.user.emailVerified) {
        window.localStorage.removeItem('emailForRegistration');

        const user = auth.currentUser;
        // after the passwordless register, now we also set a password for the firebase user
        await user.updatePassword(password);
        const { token } = await user.getIdTokenResult();

        dispatch(createOrUpdateUser(token));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type='email' className='form-control' value={email} disabled />

      <input
        type='password'
        className='form-control'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
        autoFocus
      />
      <br />
      <button type='submit' className='btn btn-raised'>
        Complete Registration
      </button>
    </form>
  );

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
