import React, { Fragment } from 'react';
import Editor from './Editor';
import { Container, Grid } from 'semantic-ui-react';


const EditorContainer = () => (
  <Fragment>
    <Container>
      <Grid>
        <Grid.Column width={10}>
          <Editor />
        </Grid.Column>
      </Grid>
    </Container>
  </Fragment>
);

export default EditorContainer;