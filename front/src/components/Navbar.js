import React, { Component } from 'react';
import { Menu, Button, Icon } from 'semantic-ui-react';

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
        <Menu.Item header style={{ color: 'limegreen' }} href="/"><Icon name="code" color='green' />CodeMarks</Menu.Item>
        {/* <Menu.Item
          name="Accueil"
          active={activeItem === 'Accueil'}
          onClick={this.handleItemClick}
          color="pink"
          
        /> */}
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
        <Menu.Item position="right">
          <Button inverted icon color="green" labelPosition="right" href="/add-content">
            Ajouter un lien
            <Icon name="plus circle" />
          </Button>
        </Menu.Item>
      </Menu>
    );
  }
};