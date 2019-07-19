import React, { Component, Fragment } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import axios from 'axios';
import SideBar from './SideBar';
import TypesContainer from './TypesContainer';


class SearchByType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTypeContent: []
    };
  }


  componentDidMount() {
    this.getTypes()
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { type } } } = this.props;

    const prevtype = prevProps.match.params.type;
    if (prevtype !== type) {
      this.getTypes();
    }
  }

  getTypes = () => {
    const { match: { params: { type } } } = this.props;
    axios.get(`/api/content/type/${type}`)
      .then(resp => this.setState({ searchTypeContent: resp.data }));
  }

  render() {
    const { content, searchTypeContent } = this.state;
    const { type } = this.props.match.params;

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
                  <TypesContainer
                    searchTypeContent={searchTypeContent}
                    type={type}
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

export default SearchByType;
