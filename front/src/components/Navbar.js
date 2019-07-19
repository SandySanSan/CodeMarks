import React, { Component } from 'react';
import { Menu, Button, Icon } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  // handleItemClick(e, { name }) {
  // }

  handleClick = (event, data) => {
    const type = data.value;
    // console.log(e.target.name)
    const { history } = this.props;
    history.push(`/search-by-types/${type}`);

  }

  render() {
    const { activeItem } = this.state;

    return (
      <Menu inverted>
        <Menu.Item
          header
          style={{ color: 'limegreen' }}
          href="/">
          <Icon name="code" color='green' />
          CodeMarks
        </Menu.Item>
        <Menu.Item
          value="article"
          name="Articles"
          active={activeItem === 'Articles'}
          onClick={this.handleClick}

        />
        {/* <Button
          size='mini'
          basic
          value="article"
          onClick={(e) => this.handleClick(e)}
        >Articles
                </Button> */}
        <Menu.Item
          value="video"
          name="Vidéos"
          active={activeItem === 'Videos'}
          onClick={this.handleClick} />
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

export default withRouter(Navbar);