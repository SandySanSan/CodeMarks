import React, { Component, Fragment } from 'react';
// import axios from 'axios';
import { Container, Grid, Icon } from 'semantic-ui-react';
import ReactTinyLink from 'react-tiny-link';
import Editor from './Editor';


class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // contentEdit: []
    };
  }

  // componentDidMount() {
  //   const { id } = this.props.location.id;
  //   console.log(id)
  //   axios.get(`/api/content/${id}`)
  //     .then(resp => this.setState({ contentEdit: resp.data }));
  // }

  render() {
    const { link } = this.props.location.link;
    const { title } = this.props.location.title;
    return (
      <Fragment>
        <Container>
          <div style={{ height: '50px' }}>
            <h1><Icon name='pencil' /> {title}</h1>
          </div>
          <Grid>
            <Grid.Column width={10}>
              <Editor />
            </Grid.Column>
            <Grid.Column width={7}>
              <ReactTinyLink
                cardSize="small"
                showGraphic
                maxLine={2}
                minLine={1}
                url={link}
              />
            </Grid.Column>
          </Grid>
        </Container>
      </Fragment>
    );
  }
}

export default EditorContainer;
