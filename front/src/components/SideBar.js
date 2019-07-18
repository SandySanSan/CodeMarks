import React, { Component } from 'react';
import axios from 'axios';
import { Dropdown, Icon, Input, Menu, Button } from 'semantic-ui-react';
import LatestContent from './cards/LatestContent';

export default class SideBar extends Component {
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

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem, tags } = this.state;
    const { content } = this.props;
    return (
      <Menu vertical fluid style={{ marginLeft: '30px' }} secondary>
        <Menu.Item>
          <Input placeholder='Search...' />
        </Menu.Item>
        <Menu.Item>

          <LatestContent
            content={content}
          />
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Tags</Menu.Header>
          <Menu.Menu>
            <Menu.Item>
              {tags.map(tag =>
                <Button size='mini' basic color={tag.color} style={{ margin: '3px' }}>{tag.tagName}</Button>
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