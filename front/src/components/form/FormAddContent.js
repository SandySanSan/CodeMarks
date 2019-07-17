import React, { Component, Fragment } from 'react';
import { Form, Container, Grid, Icon } from 'semantic-ui-react'


class FormAddContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      link: '',
      type: ''
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  render() {
    const { title, link, type } = this.state;

    return (
      <Fragment>
        <Container>
          <Grid centered>
            <Grid.Column width={10}>
              <h1>Ajouter un lien</h1>
              <Form>
                <Form.Input
                  fluid
                  label='Titre'
                  placeholder='Titre'
                  name='title'
                  value={title}
                  onChange={this.handleChange} />
                <Form.Input
                  fluid
                  label='Lien'
                  placeholder='Lien'
                  name='link'
                  value={link}
                  onChange={this.handleChange} />
                <Form.Group inline>
                  <label>Type</label>
                  <Form.Radio
                    label='Article'
                    value='article'
                    checked={type === 'article'}
                    onChange={this.handleChange}
                  />
                  <Form.Radio
                    label='Vidéo'
                    value='video'
                    checked={type === 'video'}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Button>Enregistrer  <Icon name='right arrow' /></Form.Button>
              </Form>
            </Grid.Column>
          </Grid>
        </Container>
      </Fragment>

    );
  }
}

export default FormAddContent;