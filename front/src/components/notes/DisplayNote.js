import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { convertFromRaw, convertFromHTML, EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import {stateToHTML} from 'draft-js-export-html'; 
import { Container } from 'semantic-ui-react';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';



class DisplayNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      editorState: EditorState.createEmpty()
    };
  }

  componentDidMount() {
    const { id} = this.state;
    axios.get(`/api/content/${id}`)
      .then(resp => this.setState({ editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(resp.data[0].note))) }));
  }

  render() {
    const { editorState } = this.state;
    return (
      <Container text>
    <Editor
        editorState={editorState}
        readOnly='true'
        toolbarHidden
				/> 
        </Container>
    );
  }
}

export default withRouter(DisplayNote);
