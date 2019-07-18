import React, { Component } from 'react';
import axios from 'axios';
import { Dropdown, Icon, Input, Menu, Button } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: []
    }
  }

  componentDidMount() {
    axios.get('/api/tags')
      .then(resp => this.setState({ tags: resp.data }));
  }


  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleClick = (e) => {
    const tag = e.target.value;
    const { history } = this.props;
    history.push(`/search-by-tags/${tag}`);
  }

  render() {
    const { activeItem, tags } = this.state;
    return (
      <Menu vertical fluid style={{ marginLeft: '30px' }} secondary>
        <Menu.Item>
          <Input placeholder='Search...' />
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Tags</Menu.Header>
          <Menu.Menu>
            <Menu.Item>
              {tags.map(tag =>
                <Button
                  size='mini'
                  basic color={tag.color}
                  style={{ margin: '3px' }}
                  key={`${tag.color}-${tag.idtag}`}
                  value={tag.tagName}
                  onClick={(e) => this.handleClick(e)}
                >{tag.tagName}
                </Button>
              )}
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item name='browse' active={activeItem === 'browse'} onClick={this.handleItemClick}>
          <Icon name='grid layout' />
          Browse
        </Menu.Item>
        <Menu.Item
          name='messages'
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
        >
          Messages
        </Menu.Item>

        <Dropdown item text='More'>
          <Dropdown.Menu>
            <Dropdown.Item icon='edit' text='Edit Profile' />
            <Dropdown.Item icon='globe' text='Choose Language' />
            <Dropdown.Item icon='settings' text='Account Settings' />
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    )
  }
}

export default withRouter(SideBar);