import React from 'react';

class StorePicker extends React.Component {
  render() {
    return (
      <form classame="store-selector">
        <h2>Please Enter A Store</h2>
        <input type="text" autofocus="autofocus" required placeholder="Store Name" />
        <button type="submit">Visit Store</button>
      </form>
    );
  }
}

export default StorePicker;
