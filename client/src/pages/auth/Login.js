import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { auth, googleAuthProvider } from '../../firebase';
import { createOrUpdateUser } from '../../store/action-creators';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const intended = history.location.state;

    if (intended) {
      return;
    } else {
      if (user && user.token) {
        history.push('/');
      }
    }
  }, [user, history]);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      const { token } = await user.getIdTokenResult();

      dispatch(createOrUpdateUser(token));
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      const { user } = await auth.signInWithPopup(googleAuthProvider);
      const { token } = await user.getIdTokenResult();

      dispatch(createOrUpdateUser(token));
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          type='email'
          className='form-control'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Your email'
          autoFocus
        />
      </div>

      <div className='form-group'>
        <input
          type='password'
          className='form-control'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Your password'
        />
      </div>

      <br />
      <Button
        onClick={handleSubmit}
        type='primary'
        className='mb-3'
        block
        shape='round'
        icon={<MailOutlined />}
        size='large'
        disabled={!email || password.length < 6}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  if (user) {
    const intended = history.location.state;

    if (intended) {
      return <Redirect to={intended.from} />;
    } else {
      if (user.role === 'admin') {
        return <Redirect to='/admin/dashboard' />;
      }
      return <Redirect to='/user/history' />;
    }
  }

  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}

          {loginForm()}

          <Button
            onClick={googleLogin}
            type='danger'
            className='mb-3'
            block
            shape='round'
            icon={<GoogleOutlined />}
            size='large'
          >
            Login with Google
          </Button>

          <Link to='/forgot-password' className='float-right text-danger'>
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
