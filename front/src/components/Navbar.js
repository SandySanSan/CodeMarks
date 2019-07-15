import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

export default class MenuExampleHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }


  render() {
    const { activeItem } = this.state;

    return (
      <Menu inverted>
        <Menu.Item header>CodeMarks</Menu.Item>
        <Menu.Item
          name="Articles"
          active={activeItem === 'Articles'}
          onClick={this.handleItemClick}
        />
        <Menu.Item name="Videos" active={activeItem === 'Videos'} onClick={this.handleItemClick} />
        <Menu.Item
          name="Notes"
          active={activeItem === 'Notes'}
          onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
};