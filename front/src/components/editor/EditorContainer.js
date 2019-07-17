import React, { Component, Fragment } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import Editor from './Editor';


class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { id } = this.props.location.id;

    return (
      <Fragment>
        <Container>
          <div>content id : {id}</div>
          <Grid>
            <Grid.Column width={10}>
              <Editor />
            </Grid.Column>
          </Grid>
        </Container>
      </Fragment>
    );
  }
}

export default EditorContainer;