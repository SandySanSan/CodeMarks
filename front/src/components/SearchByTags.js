import React, { Component, Fragment } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import axios from 'axios';
import SideBar from './SideBar';
import TagsContainer from './cards/CardsContainer';


class SearchByTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTagContent: []
    };
  }


  componentDidMount() {
    const { tag } = this.props.location.tag;
    console.log(tag)
    axios.get(`/api/tags/${tag}`)
      .then(resp => this.setState({ searchTagContent: resp.data }));
  }

  render() {
    const { content, searchTagContent } = this.state;

    return (
      <Fragment>
        <Grid relaxed>
          <Grid.Row>
            <Grid.Column width={4}>
              <SideBar
                content={content}
              />
            </Grid.Column>
            <Grid.Column width={12}>
              <Container>
                <Grid centered>
                  <TagsContainer
                    searchTagContent={searchTagContent}
                  />
                </Grid>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    );
  }
}

export default SearchByTags;
