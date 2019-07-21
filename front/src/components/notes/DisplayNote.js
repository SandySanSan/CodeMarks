import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Editor } from 'slate-react'
import { Container } from 'semantic-ui-react';
import { Value } from 'slate';


class DisplayNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      note: '',
    };
  }

  componentDidMount() {
    const { id } = this.state;
    axios.get(`/api/content/${id}`)
      .then(resp => this.setState({ note: resp.data[0].note }));
  }


  render() {
    const { note } = this.state;
    const noteJson = Value.fromJSON({ note });
    return (
      <Container text>
        {noteJson}
        {/* <Editor defaultValue={value} readOnly /> */}
      </Container>
    );
  }
}

export default withRouter(DisplayNote);
