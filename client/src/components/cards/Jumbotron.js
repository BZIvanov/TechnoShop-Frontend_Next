import Typewriter from 'typewriter-effect';

const Jumbotron = ({ texts }) => (
  <Typewriter options={{ strings: texts, autoStart: true, loop: true }} />
);

export default Jumbotron;
