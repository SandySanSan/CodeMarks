import React, { Component, Fragment } from 'react';
import { withRouter } from "react-router-dom";
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
    new Noty({
      text: "CONFIRMATION La note a été correctement enregistrée!",
      theme: "metroui",
      type: "success",
      layout: 'topCenter',
      timeout: '2000',
    }).show();

    const { history } = this.props;

    setTimeout(function () {
      history.push('/');
    }, 1000);

  }

  componentDidMount() {
    // const { id } = this.props.history.location.id;
    const { id } = this.state;

    axios.get(`/api/content/${id}`)
      .then(resp => this.setState({
        idcontent: resp.data[0].idcontent,
        title: resp.data[0].title,
        link: resp.data[0].link,
        note: resp.data[0].note
      }));
  }

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

export default withRouter(EditorContainer);
