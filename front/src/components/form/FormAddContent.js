import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Form, Container, Grid, Icon, Header, Segment } from 'semantic-ui-react'


class FormAddContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  handleSubmit = (e) => {
    e.preventDefault();
    const { link, title, type } = this.state;
    title === '' ? this.setState({ titleError: true }) : this.setState({ titleError: false })
    link === '' ? this.setState({ linkError: true }) : this.setState({ linkError: false })
    type === '' ? this.setState({ typeError: true }) : this.setState({ typeError: false })

    const formData = {
      title: this.state.title,
      link: this.state.link,
      type: this.state.type
    };
    console.log(formData)
    axios.post('/api/content/', formData)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

  }
  render() {
    const { title, link, type, titleError, linkError, typeError } = this.state;

    return (
      <Fragment>
        <Container>
          <Grid centered>
            <Grid.Column width={11}>
              <Header as="h2" textAlign="center" style={{ paddingTop: '50px' }}>
                Ajouter un lien
              </Header>
              <Segment>
                <Form onSubmit={this.handleSubmit}>
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

                  <Form.Group grouped>
                    <label>Type</label>
                    <label>
                      <input
                        type="radio"
                        name="type"
                        label="Article"
                        onChange={this.handleChange}
                        value="article"
                        checked={type === "article"}
                        error={typeError}

                      />
                      Article
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="type"
                        onChange={this.handleChange}
                        value="video"
                        checked={type === "video"}
                      />
                      Video
                    </label>
                  </Form.Group>
                  <Form.Button
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