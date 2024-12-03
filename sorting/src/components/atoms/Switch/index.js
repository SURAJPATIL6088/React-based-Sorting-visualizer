// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import './style.css';

// class Switch extends Component {
//   state = {
//     checked: false
//   };

//   componentDidMount() {
//     if (this.props.checked) {
//       this.setState({ checked: this.props.checked });
//     }
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.checked !== this.props.checked) {
//       this.setState({ checked: this.props.checked });
//     }
//   }

//   toggleChecked = () => {
//     this.setState((prevState) => ({ checked: !prevState.checked }));
//   };

//   handleClick = (e) => {
//     e.preventDefault();
//     this.toggleChecked();
//     this.props.onSwitch();
//   };

//   render() {
//     let Switch = `Switch`;
//     if (this.state.checked) Switch += ` Switch_checked`;
//     if (this.props.className) Switch += ` ${this.props.className}`;
//     return (
//       <div className={Switch}>
//         <label className="Switch__Label" htmlFor="Switch__Thumb">
//           {this.props.label}
//         </label>

//         <div className="Switch__Button">
//           <div className="Switch__Track"></div>
//           <input
//             className="Switch__Thumb"
//             onClick={this.handleClick}
//             name="Switch__Thumb"
//             id="Switch__Thumb"
//             type="button"
//           ></input>
//         </div>
//       </div>
//     );
//   }
// }

// Switch.propTypes = {
//   onSwitch: PropTypes.func,
//   className: PropTypes.string
// };

// export default Switch;


import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Switch = ({ checked = false, onSwitch, className, label }) => {
  const [isChecked, setIsChecked] = useState(checked);

  // Sync state with props when the 'checked' prop changes
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleClick = (e) => {
    e.preventDefault();
    setIsChecked(prevState => !prevState);
    onSwitch();
  };

  let switchClass = 'Switch';
  if (isChecked) switchClass += ' Switch_checked';
  if (className) switchClass += ` ${className}`;

  return (
    <div className={switchClass}>
      <label className="Switch__Label" htmlFor="Switch__Thumb">
        {label}
      </label>

      <div className="Switch__Button">
        <div className="Switch__Track"></div>
        <input
          className="Switch__Thumb"
          onClick={handleClick}
          name="Switch__Thumb"
          id="Switch__Thumb"
          type="button"
        />
      </div>
    </div>
  );
};

Switch.propTypes = {
  onSwitch: PropTypes.func.isRequired,
  className: PropTypes.string,
  checked: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

export default Switch;
