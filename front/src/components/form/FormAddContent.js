import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Form, Container, Grid, Icon, Header, Segment, Dropdown } from 'semantic-ui-react'


class FormAddContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagsList: [],
      title: '',
      link: '',
      type: '',
      titleError: false,
      linkError: false,
      typeError: false,
    }
  }

  handleChange = (event) => {
    // event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  toggleChange = (event, { value }) => {
    this.setState({ type: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { link, title, type } = this.state;
    title === '' ? this.setState({ titleError: true }) : this.setState({ titleError: false })
    link === '' ? this.setState({ linkError: true }) : this.setState({ linkError: false })
    type === '' ? this.setState({ typeError: true }) : this.setState({ typeError: false })

    const formData = {
      title: this.state.title,
      link: this.state.link,
      type: this.state.type,
      tags: this.state.tags
    };
    console.log(formData)
    axios.post('/api/content/', formData)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

  }

  handleChangeDropDown = (e, { name, value }) => this.setState({ [name]: value })


  componentDidMount() {
    axios.get('/api/tags')
      .then(resp => this.setState({ tagsList: resp.data }));
  }


  render() {
    const { title, link, type, titleError, linkError, tagsList } = this.state;
    const tagsOptions = tagsList.map((tag, index) => ({
      key: `${tag.tagName}-${index}`,
      text: tag.tagName,
      value: tag.idtag,
      label: { color: tag.color, empty: true, circular: true }
    }))
    return (
      <Fragment>
        <Container style={{ marginTop: '50px' }}>
          <Grid centered>
            <Grid.Column width={11}>
              <Segment inverted>
                <Header as="h2" textAlign="center" style={{ padding: '20px' }}>
                  Ajouter un lien
              </Header>
                <Form onSubmit={this.handleSubmit} inverted>
                  <Form.Input
                    fluid
                    label='Titre'
                    placeholder='Titre'
                    name='title'
                    value={title}
                    onChange={this.handleChange}
                    error={titleError}
                  />
                  <Form.Input
                    fluid
                    label='Lien'
                    placeholder='Lien'
                    name='link'
                    value={link}
                    onChange={this.handleChange}
                    error={linkError}
                  />
                  <Form.Group inline>
                    <label>Type</label>
                    <Form.Radio
                      label="Article"
                      value="article"
                      checked={type === 'article'}
                      onChange={this.toggleChange}
                    />
                    <Form.Radio
                      label="Vidéo"
                      value="video"
                      checked={type === 'video'}
                      onChange={this.toggleChange}
                    />

                  </Form.Group>
                  <Form.Group>
                    <Dropdown
                      placeholder='Tags'
                      fluid
                      multiple
                      search
                      selection
                      closeOnChange
                      name="tags"
                      options={tagsOptions}
                      onChange={this.handleChangeDropDown}
                    />
                  </Form.Group>
                  <Form.Button style={{ margin: '10px' }}
                  >Enregistrer
                  <Icon name='right arrow' />
                  </Form.Button>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      </Fragment>

    );
  }
}

export default FormAddContent;