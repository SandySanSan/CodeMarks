import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Container, Grid, Button as ButtonSem } from 'semantic-ui-react';
import Iframe from './iframe.js';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class EditorContainer extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  onChange = ({ value }) => {
    this.setState({ value })
  }

  submitNote = () => {
    const { id } = this.props.location.id;
    const { editorState } = this.state;
    const note = JSON.stringify(editorState.toJSON())

    axios.put(`/api/content/add-note/${id}`, { note })
  }

  // onChange = ({ value }) => {
  //   // Check to see if the document has changed before saving.
  //   if (value.document != this.state.value.document) {
  //     const content = JSON.stringify(value.toJSON())
  //     localStorage.setItem('content', content)
  //   }

  //   this.setState({ value })
  // }


  // componentDidMount() {
  //   const { id } = this.props.location.id;
  //   console.log(id)
  //   axios.get(`/api/content/${id}`)
  //     .then(resp => this.setState({ contentEdit: resp.data }));
  // }

  render() {
    const { link } = this.props.location.link;
    const { editorState } = this.state;
    return (
      <Fragment>
        <Container fluid style={{ padding: '25px' }}>
          <Grid>
            <Grid.Column width={7}>
              <div style={{ paddingBottom: '25px' }}><ButtonSem onClick={this.submitNote}>Enregistrer la note</ButtonSem></div>
              <div style={{ height: '620px' }}>
              <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
              </div>
            </Grid.Column>
            <Grid.Column width={9}>
              <Iframe
                url={link}
                width="100%"
                height="100%"
                scrolling
                display="initial"
                position="relative"
              />
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid>
        </Container>
      </Fragment >
    );
  }
}

export default EditorContainer;
