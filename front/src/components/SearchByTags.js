import React, { Component, Fragment } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import axios from 'axios';
import SideBar from './SideBar';
import SearchContainer from './SearchContainer';


class SearchByTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTagContent: []
    };
  }

  componentDidMount() {
    this.getTags()
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { tag }
      }
    } = this.props;
    const prevTag = prevProps.match.params.tag;
    if (prevTag !== tag) {
      this.getTags();
    }
  }

  getTags = () => {
    const { match: { params: { tag } } } = this.props;
    console.log(tag)
    axios.get(`/api/tags/${tag}`)
      .then(resp => this.setState({ searchTagContent: resp.data }));
  }

  render() {
    const { content, searchTagContent } = this.state;
    const { tag } = this.props.match.params;

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
                  <SearchContainer
                    content={searchTagContent}
                    clef={tag}
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
