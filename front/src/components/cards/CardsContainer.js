import React, { Component, Fragment } from 'react';
import { Container, Grid } from 'semantic-ui-react';

import axios from 'axios';
import CardContent from './CardContent';


class CardsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: []
    };
  }

  componentDidMount() {
    axios.get('/api/content')
      .then(resp => this.setState({ content: resp.data.results }));
  }

  render() {
    const { content } = this.state;
    return (
      <Fragment>
        <Container>
          <Grid>
            <Grid.Row>
              {content.map(c => (
                <Grid.Column width={7}>
                  <CardContent
                    key={`${c.title}-${c.idcontent}`}
                    link={c.link}
                    tags
                  />
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        </Container>
      </Fragment>
    );
  }
}

export default CardsContainer;
