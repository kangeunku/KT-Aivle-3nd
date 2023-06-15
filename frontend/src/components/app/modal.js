const { useState ,useRef} = React;

const Popup = ({ handleClose }) => {
  const modalRef = useRef(null);

  const closeWithAnimation = () => {
    if (modalRef.current) {
      modalRef.current.classList.add("closing");
      setTimeout(() => {
        modalRef.current.classList.remove("closing");
        handleClose();
      }, 300);
    }
  };
  return (
    <div ref={modalRef} className="graphpop">
      <div className="content">
        <img src="./ico.png" alt="" />
        <h2>I'm the best pop-up</h2>
        <button onClick={closeWithAnimation}>Close</button>
      </div>
    </div>
  );
};

function App() {
  const [visible, setVisible] = useState(false);

  const showPopup = () => {
    setVisible(true);
  };

  const closePopup = () => {
    setVisible(false);
  };

  return (
    <div className="App">
      <button onClick={showPopup}>Show popup</button>
      {visible && <Popup handleClose={closePopup} />}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));