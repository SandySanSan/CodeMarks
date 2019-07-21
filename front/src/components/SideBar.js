import React, { Component } from 'react';
import axios from 'axios';
import { Icon, Input, Menu, Button } from 'semantic-ui-react';
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
                  compact
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
          Parcourir tous les liens
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(SideBar);