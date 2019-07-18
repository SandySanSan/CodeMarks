import React, { Component, Fragment } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import axios from 'axios';
import SideBar from './SideBar';
import CardsContainer from './cards/CardsContainer';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: []
    }
  }

  componentDidMount() {
    axios.get('/api/content')
      .then(resp => this.setState({ content: resp.data }));
  }

  render() {
    const { content } = this.state;

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
                  <CardsContainer
                    content={content}
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

export default Home;