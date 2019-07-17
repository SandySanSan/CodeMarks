import React, { Component, Fragment } from 'react';
import { Container, Grid } from 'semantic-ui-react';

import axios from 'axios';
import CardContent from './CardContent';
import SideBar from '../SideBar';

class CardsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: []
    };
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
              <SideBar />

            </Grid.Column>
            <Grid.Column width={12}>
              <Container>
                <Grid centered>
                  {content.map(c => (
                    <Grid.Column width={7}>
                      <CardContent
                        key={`${c.title}-${c.idcontent}`}
                        link={c.link}
                        tags={c.tagsNames}
                        color={c.color}
                        id={c.idcontent}
                        title={c.title}
                      />
                    </Grid.Column>
                  ))}
                </Grid>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>


      </Fragment>
    );
  }
}

export default CardsContainer;
